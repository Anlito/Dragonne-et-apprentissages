export function fingerPlan(value){
  if(!Number.isInteger(value)||value<1||value>9)throw new RangeError('Nombre de doigts entre 1 et 9');
  return value<=5?[value]:[5,value-5];
}
function hand(count,mirror,x){
  const outline='fill="#f5cc9e" stroke="#a77459" stroke-width="2.5" stroke-linejoin="round"';
  let fingers=count>=1?`<path data-raised="true" ${outline} d="M32 83C22 76 14 65 9 55C5 45 15 39 22 48L43 70Z"/>`:'';
  const positions=[[29,24],[44,12],[59,20],[74,35]];
  positions.forEach(([left,top],i)=>{if(count>=i+2)fingers+=`<rect data-raised="true" ${outline} x="${left}" y="${top}" width="12" height="${86-top}" rx="6"/>`;});
  return `<g transform="translate(${x} 0)${mirror?' translate(100 0) scale(-1 1)':''}">${fingers}<path ${outline} d="M28 69Q28 60 39 60H77Q87 60 87 72V89Q87 103 72 110V128H42V109Q28 100 28 85Z"/>${positions.map(([left],i)=>count<i+2?`<rect ${outline} x="${left}" y="65" width="12" height="22" rx="6"/>`:'').join('')}${count===0?'':count===1?'<path d="M39 94Q52 99 64 93" fill="none" stroke="#d59d77" stroke-width="2"/>':''}<path d="M44 117H70" stroke="#e1ad83" stroke-width="2"/></g>`;
}
export function fingerMarkup(value){
  const plan=fingerPlan(value),width=plan.length===1?116:216;
  return `<svg class="answer-hands" viewBox="0 0 ${width} 140" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${plan.map((n,i)=>hand(n,i===1,8+i*100)).join('')}</svg>`;
}
