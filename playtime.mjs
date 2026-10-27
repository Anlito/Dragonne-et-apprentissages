export const localDay=(now=new Date())=>`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
const integer=(value,fallback,min,max)=>Number.isInteger(value)&&value>=min&&value<=max?value:fallback;
export function cleanPlaytime(value){return {enabled:value?.enabled===true,minutes:integer(value?.minutes,30,1,240),day:typeof value?.day==='string'?value.day:'',usedMs:integer(value?.usedMs,0,0,86400000),bonusMinutes:integer(value?.bonusMinutes,0,0,1440)};}
export function todayPlaytime(value,now=new Date()){
 const time=cleanPlaytime(value),day=localDay(now);
 return time.day===day?time:{...time,day,usedMs:0,bonusMinutes:0};
}
export function remainingPlaytime(value){return Math.max(0,(value.minutes+value.bonusMinutes)*60000-value.usedMs);}
export function consumePlaytime(value,elapsed,now=new Date()){
 const time=todayPlaytime(value,now);
 if(time.enabled)time.usedMs=Math.min(86400000,time.usedMs+Math.max(0,Math.floor(elapsed)));
 return time;
}
export function addPlaytimeBonus(value,minutes,now=new Date()){
 if(!Number.isInteger(minutes)||minutes<1||minutes>240)throw Error('Choisis entre 1 et 240 minutes.');
 const time=todayPlaytime(value,now);time.bonusMinutes=Math.min(1440,time.bonusMinutes+minutes);return time;
}
export const parentMultiplication=(random=Math.random)=>{const a=6+Math.floor(random()*7),b=6+Math.floor(random()*7);return {question:`${a} × ${b}`,answer:a*b};};
