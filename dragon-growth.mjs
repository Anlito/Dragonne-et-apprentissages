// 10 images d’éclosion, puis 9 âges avec 9 pièces améliorées une à une.
export const EQUIPMENT_NAMES=['Bottes','Ceinture','Plastron','Gantelets','Épaulières','Cape','Bouclier','Coiffe','Étendard'];
export const DRAGON_THEMES=['Cuivre','Argent','Jade','Ambre','Saphir','Améthyste','Or','Aurore','Étoiles'];
export const GROWTH_NAMES=['Jeune aventurier','Explorateur','Apprenti chevalier','Chevalier','Grand chevalier','Gardien','Gardien ancien','Gardien royal','Dragon céleste'];
const HATCHING=['Œuf dans son nid','La coquille se fissure','Deux yeux curieux','Bonjour petit dragon','Les premières pattes','Sortie de la coquille','Premiers pas','Les petites cornes','Les premières ailes','Les ailes se déploient'];
export function dragonAppearance(rank){
 if(!Number.isInteger(rank)||rank<1||rank>100)throw new RangeError('Palier entre 1 et 100');
 if(rank<=10)return {atlas:'rebirth',cell:rank-1,bodyStage:rank-1,columns:10,rows:10,grade:0,age:-1,step:rank-1,equipment:Array(9).fill(0),theme:null};
 const age=Math.floor((rank-11)/10),step=(rank-11)%10;
 const equipment=EQUIPMENT_NAMES.map((_,index)=>index<step?age+1:age);
 return {atlas:'rebirth',cell:rank-1,bodyStage:10+age,columns:10,rows:10,grade:equipment.some(Boolean)?1:0,age,step,equipment,theme:DRAGON_THEMES[age]};
}
export function evolutionChange(rank,female=false){const look=dragonAppearance(rank);let name=rank===100?'Légende céleste · Tenue complète':rank<=10?HATCHING[rank-1]:look.step===0?GROWTH_NAMES[look.age]+' · nouvelle croissance':EQUIPMENT_NAMES[look.step-1]+' · '+DRAGON_THEMES[look.age];if(female)for(const [from,to] of [['petit dragon','petite dragonne'],['Jeune aventurier','Jeune aventurière'],['Explorateur','Exploratrice'],['Apprenti chevalier','Apprentie chevalière'],['Grand chevalier','Grande chevalière'],['Chevalier','Chevalière'],['Gardien ancien','Gardienne ancienne'],['Gardien royal','Gardienne royale'],['Gardien','Gardienne'],['Dragon céleste','Dragonne céleste']])name=name.replace(from,to);return name;}
export const extendedRankNames=(female=false)=>Array.from({length:100},(_,i)=>evolutionChange(i+1,female));
// Chaque palier possède désormais son illustration complète : aucun accessoire superposé.
export const equipmentMarkup=()=>'';
