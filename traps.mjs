// Chaque paire ne modifie que la partie manquante. Le mot entier est prononcé.
export const TRAP_WORDS=[
 ['bateau','','b','ateau','b/d',1],['domino','','d','omino','b/d',1],['robe','ro','b','e','b/d',1],['salade','sala','d','e','b/d',1],
 ['poule','','p','oule','p/q',1],['quille','','q','uille','p/q',1],['équipe','é','q','uipe','p/q',1],['lapin','la','p','in','p/q',1],
 ['cube','','c','ube','c/g',2],['gomme','','g','omme','c/g',2],['glace','gla','c','e','c/g',2],['girafe','','g','irafe','c/g',2],
 ['citron','','c','itron','c/ss',2],['poisson','poi','ss','on','c/ss',2],['coussin','cou','ss','in','s/ss',2],['maison','mai','s','on','s/ss',2],
 ['quatre','','qu','atre','qu/q',3],['coq','co','q','','qu/q',3],['carotte','','c','arotte','c/q',3],['coque','co','q','ue','c/q',3],
 ['caméra','','c','améra','c/k',3],['kimono','','k','imono','c/k',3],['casque','','c','asque','c/k',3],['koala','','k','oala','c/k',3]
].map(([word,before,target,after,pair,level])=>({word,before,target,after,pair,level}));
export function trapQuestion(difficulty='easy',previous=null,random=Math.random){
 const max={easy:1,medium:2,hard:3}[difficulty]||1,bank=TRAP_WORDS.filter(w=>w.level<=max&&w.word!==previous),row=bank[Math.floor(random()*bank.length)];
 const choices=row.pair.split('/');if(random()<.5)choices.reverse();
 return {...row,id:row.word,kind:'traps',choices,prompt:row.word,display:'gap'};
}
