import {shuffle} from './reading.mjs';
export const MATH_IDS=['arithmetic','multiply'];
export function placementReward(score,streak,value,target,limit){
 const distance=Math.abs(value-target),ratio=distance/limit;
 const points=distance===0?10:ratio<=.05?5:ratio<=.1?1:0;
 const nextStreak=points===10?streak+1:0,bonus=nextStreak>0&&nextStreak%3===0?5:0;
 return {score:score+points+bonus,streak:nextStreak,points,bonus,distance};
}
export const MATH_LEVELS={
 easy:{label:'Facile',limit:10,terms:2,choices:3,factorMax:5},
 medium:{label:'Moyen',limit:20,terms:3,choices:4,factorMax:10},
 hard:{label:'Difficile',limit:100,terms:4,choices:6,factorMax:10}
};
const integer=(max,random)=>Math.floor(random()*(max+1));
export function evaluateExpression(terms,operators){return terms.reduce((value,n,i)=>i===0?n:operators[i-1]==='+'?value+n:value-n,0);}
export function mathChoices(target,limit,count,random=Math.random,multiples=null){
 const pool=multiples?Array.from({length:11},(_,i)=>i*multiples):Array.from({length:limit+1},(_,i)=>i);
 return shuffle([target,...shuffle(pool.filter(n=>n!==target),random).slice(0,count-1)],random);
}
export function arithmeticQuestion(difficulty='easy',mode='answer',previous=null,random=Math.random){
 const level=MATH_LEVELS[difficulty]||MATH_LEVELS.easy;
 if(!['answer','missing','line'].includes(mode))throw new RangeError('Mode de calcul inconnu');
 let q;
 for(let attempt=0;attempt<12;attempt++){
  const terms=[integer(Math.floor(level.limit/2),random)],operators=[];let total=terms[0];
  const termCount=difficulty==='hard'?3+integer(1,random):level.terms;
  for(let i=1;i<termCount;i++){
   let op=random()<.5?'+':'−';if(total===0)op='+';if(total===level.limit)op='−';
   const available=op==='+'?level.limit-total:total;
   const bound=Math.min(available,difficulty==='hard'?40:level.limit);
   const n=bound>0?1+integer(bound-1,random):0;operators.push(op);terms.push(n);total=op==='+'?total+n:total-n;
  }
  const missing=mode==='missing'?integer(terms.length-1,random):-1,target=missing>=0?terms[missing]:total;
  const cells=terms.map((n,i)=>i===missing?'?':String(n));let equation=cells[0];for(let i=1;i<cells.length;i++)equation+=' '+operators[i-1]+' '+cells[i];equation+=' = '+(missing>=0?total:'?');
  q={kind:'arithmetic',mode,terms,operators,total,missing,target,equation,id:mode+':'+equation,limit:level.limit,choices:mathChoices(target,level.limit,level.choices,random),prompt:equation.replaceAll('−','moins').replaceAll('+','plus').replace('=','égal').replace('?','à trouver')+(mode==='line'?'. Place le résultat sur la jauge.':'. Trouve le nombre manquant.')};
  if(q.id!==previous)break;
 }
 return q;
}
export function multiplicationQuestion(table,difficulty='easy',previous=null,random=Math.random){
 if(!Number.isInteger(table)||table<1||table>10)throw new RangeError('Table entre 1 et 10');
 const level=MATH_LEVELS[difficulty]||MATH_LEVELS.easy,values=Array.from({length:level.factorMax+1},(_,i)=>i).filter(n=>difficulty!=='easy'||n>0);
 const factor=shuffle(values.filter(n=>n!==previous),random)[0],target=table*factor;
 return {kind:'multiply',mode:'answer',table,factor,target,limit:table*level.factorMax,equation:`${table} × ${factor} = ?`,id:table+':'+factor,choices:mathChoices(target,table*level.factorMax,level.choices,random,difficulty==='hard'?table:null),prompt:`${table} fois ${factor}. Combien ça fait ?`};
}
