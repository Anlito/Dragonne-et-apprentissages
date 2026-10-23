export const DEFAULT_FLUENCY_TEXT="Les enfants s'amusent dans la cour de l'école. Le vent se lève pendant que la pluie commence à tomber. Les garçons qui jouent au ballon sont trempés. Soudain, le vent pousse le ballon dans une flaque d'eau. Nicolas, un enfant du CM1, tape dans le ballon si fort qu'il sort de la cour.\nLes autres enfants sont embêtés. Nicolas regrette son vilain geste.\nIl présente ses excuses à tous.";
export const FLUENCY_DURATION=60000;
export function normalizeFluencyText(value){return typeof value==='string'?value.replace(/\r\n?/g,'\n').trim().slice(0,10000):'';}
export const fluencyKey=text=>normalizeFluencyText(text).replace(/[’‘]/g,"'").replace(/\s+/g,' ');
export function fluencyTokens(text){let index=0;return normalizeFluencyText(text).split(/(\s+)/u).filter(Boolean).map(text=>({text,index:/[\p{L}\p{N}]/u.test(text)?++index:0}));}
export const fluencyWordCount=text=>fluencyTokens(text).filter(t=>t.index).length;
export function cleanFluency(value){
 const candidate=normalizeFluencyText(value?.text),text=fluencyWordCount(candidate)?candidate:DEFAULT_FLUENCY_TEXT,records=[];
 for(const row of Array.isArray(value?.records)?value.records:[]){
  const key=fluencyKey(row?.text),count=fluencyWordCount(key);if(!key||!count)continue;
  const bound=n=>Number.isInteger(n)?Math.max(0,Math.min(n,count)):0;
  const clean={text:key,best:bound(row.best),last:bound(row.last),attempts:Number.isSafeInteger(row.attempts)&&row.attempts>0?row.attempts:1};clean.best=Math.max(clean.best,clean.last);
  const existing=records.find(r=>r.text===key);if(existing){existing.best=Math.max(existing.best,clean.best);existing.last=clean.last;existing.attempts=Math.max(existing.attempts,clean.attempts);}else records.push(clean);
 }
 return {text,records};
}
export function fluencyRecord(fluency,text=fluency.text){return fluency.records.find(r=>r.text===fluencyKey(text))||{text:fluencyKey(text),best:0,last:0,attempts:0};}
export function recordFluencyAttempt(fluency,text,last){
 const count=fluencyWordCount(text);if(!Number.isInteger(last)||last<0||last>count)throw new RangeError('Dernier mot invalide');
 const previous=fluencyRecord(fluency,text),record={text:fluencyKey(text),best:Math.max(previous.best,last),last,attempts:previous.attempts+1};
 fluency.records=fluenceReplace(fluency.records,record);return {...record,newRecord:last>previous.best};
}
function fluenceReplace(records,record){return [...records.filter(r=>r.text!==record.text),record];}
// Horloge absolue : même un onglet ralenti ne rallonge pas la minute.
export function createFluencyClock({now=()=>Date.now(),schedule=setTimeout,cancel=clearTimeout,onTick=()=>{},onEnd=()=>{}}={}){
 let timer=null,deadline=null,running=false;
 function stop(){running=false;if(timer!==null)cancel(timer);timer=null;}
 function tick(){if(!running)return;const left=Math.max(0,deadline-now());onTick(Math.ceil(left/1000));if(left===0){stop();onEnd();}else timer=schedule(tick,Math.min(250,left));}
 return {start(){stop();running=true;deadline=now()+FLUENCY_DURATION;tick();},stop,refresh(){if(!running)return;if(timer!==null)cancel(timer);timer=null;tick();},get running(){return running;}};
}
