// 15 apparences historiques, puis 17 tenues avec cinq grades d'équipement.
export const DRAGON_THEMES=['des forêts','des océans','des sommets','des glaces','des dunes','des vents','de l’arc-en-ciel','des nuages','de la lune','des étoiles','de l’aurore','des jardins','des savoirs','des cristaux','du ciel','des aurores boréales','de la légende'];
export const EQUIPMENT_NAMES=['Médaillon','Bouclier','Sceptre','Insigne ailé','Couronne'];
export const extendedRankNames=initial=>[...initial,...DRAGON_THEMES.flatMap(theme=>EQUIPMENT_NAMES.map(item=>item+' '+theme))];
export function dragonAppearance(rank){
 if(!Number.isInteger(rank)||rank<1||rank>100)throw new RangeError('Palier entre 1 et 100');
 if(rank<=15)return {atlas:'classic',cell:rank-1,columns:5,rows:3,grade:0,theme:null};
 const cell=Math.floor((rank-16)/5),grade=(rank-16)%5+1;
 return {atlas:'adventures',cell,columns:5,rows:4,grade,theme:DRAGON_THEMES[cell]};
}
// Équipements vectoriels superposés aux tenues de papier : un changement visible à chaque palier.
export function equipmentMarkup(grade){
 if(!grade)return '';
 const colors=['#bd8b57','#a9bbc7','#a997cf','#6cbda9','#efc75b'],fill=colors[grade-1];
 const shapes=[
  '<path d="m25 7 10 16h-8L18 7M47 7 37 23h8l9-16" fill="#ac83bd"/><circle cx="36" cy="40" r="22"/><path d="m36 24 11 15-11 17-11-17z" fill="#fff0b9"/>',
  '<path d="M12 10 36 3 60 10v24c0 16-13 27-24 33C25 61 12 50 12 34z"/><path d="m36 17 5 10 12 2-9 8 2 12-10-6-10 6 2-12-9-8 12-2z" fill="#fff0b9"/>',
  '<path d="m32 34 8 1-7 32-8-1z"/><path d="m38 3 18 18-21 22-18-22z"/><path d="m38 7 6 14-9 17-6-17z" fill="#fff0b9"/><path d="M50 48h12M56 42v12"/>',
  '<path d="M32 27 5 10l3 17 12 17 16 13 16-13 12-17 3-17-27 17z"/><path d="m36 14 15 20-15 24-15-24z" fill="#fff0b9"/><path d="m36 25 6 10-6 12-6-12z" fill="#aa87c6"/>',
  '<path d="m8 20 15 13L36 8l13 25 15-13-7 38H15z"/><path d="M15 58h42v9H15z"/><path d="m36 30 8 11-8 11-8-11z" fill="#aa87c6"/><circle cx="8" cy="16" r="5"/><circle cx="64" cy="16" r="5"/>'
 ];
 return '<svg viewBox="0 0 72 76" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g fill="'+fill+'" stroke="#796347" stroke-width="1.7" stroke-linejoin="round">'+shapes[grade-1]+'</g></svg>';
}
