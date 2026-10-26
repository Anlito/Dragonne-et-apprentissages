export function exerciseKey(question){return String(question.id??JSON.stringify([question.target,question.kind,question.object]));}
// Prefer a genuinely new target, with an oldest-first fallback for small domains.
export function variedQuestion(factory,history,limit=40){
 let selected=null,key='',oldest=Infinity;
 for(let attempt=0;attempt<80;attempt++){
  const candidate=factory(),candidateKey=exerciseKey(candidate),index=history.indexOf(candidateKey);
  if(index<0){selected=candidate;key=candidateKey;break;}
  if(index<oldest){oldest=index;selected=candidate;key=candidateKey;}
 }
 const old=history.indexOf(key);if(old>=0)history.splice(old,1);history.push(key);while(history.length>limit)history.shift();return selected;
}
