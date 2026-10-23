export function fingerPlan(value){
  if(!Number.isInteger(value)||value<1||value>9)throw new RangeError('Nombre de doigts entre 1 et 9');
  return value<=5?[value]:[5,value-5];
}
// Atlas contrôlé visuellement : 1 pouce, 2 en V, 3, 4 puis 5 doigts levés.
function hand(count,mirror,x){
  const [left,width]=[[65,360],[465,355],[870,355],[1290,400],[1720,452]][count-1];
  return `<g transform="translate(${x} 0)${mirror?' translate(100 0) scale(-1 1)':''}"><svg data-fingers="${count}" x="0" y="0" width="100" height="140" viewBox="${left} 45 ${width} 610" overflow="hidden"><image href="assets/mains-papier.png" width="2172" height="724"/></svg></g>`;
}
export function fingerMarkup(value){
  const plan=fingerPlan(value),width=plan.length===1?116:216;
  return `<svg class="answer-hands" viewBox="0 0 ${width} 140" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${plan.map((n,i)=>hand(n,i===1,8+i*100)).join('')}</svg>`;
}
