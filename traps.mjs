import {EXTRA_LETTER_WORDS} from './content.mjs';
// Chaque paire ne modifie que la partie manquante. Le mot entier est prononcé.
const INITIAL_TRAPS=[
 ['bateau','','b','ateau','b/d',1],['domino','','d','omino','b/d',1],['robe','ro','b','e','b/d',1],['salade','sala','d','e','b/d',1],
 ['poule','','p','oule','p/q',1],['quille','','q','uille','p/q',1],['équipe','é','q','uipe','p/q',1],['lapin','la','p','in','p/q',1],
 ['cube','','c','ube','c/g',2],['gomme','','g','omme','c/g',2],['glace','gla','c','e','c/g',2],['girafe','','g','irafe','c/g',2],
 ['citron','','c','itron','c/ss',2],['poisson','poi','ss','on','c/ss',2],['coussin','cou','ss','in','s/ss',2],['maison','mai','s','on','s/ss',2],
 ['quatre','','qu','atre','qu/q',3],['coq','co','q','','qu/q',3],['carotte','','c','arotte','c/q',3],['coque','co','q','ue','c/q',3],
 ['caméra','','c','améra','c/k',3],['kimono','','k','imono','c/k',3],['casque','','c','asque','c/k',3],['koala','','k','oala','c/k',3]
].map(([word,before,target,after,pair,level])=>({word,before,target,after,pair,level}));
const pairs={ 'c/g':'cube,cabane,carotte,camion,canard,cochon,coque,couleur,coussin,cuisine,glace,gomme,gare,gâteau,galet,gazon,girafe,gilet,guitare,gourde', 'c/ss':'citron,cerise,cercle,ciel,cinéma,cigale,cire,ciseaux,poisson,coussin,dessin,tasse,classe,passage,mousse,chaussure', 's/ss':'maison,rose,chaise,valise,chemise,fraise,cerise,fusée,poisson,coussin,dessin,tasse,classe,passage,mousse,chaussure', 'qu/q':'quatre,quatorze,quarante,quand,quel,quelle,question,queue,quitter,coq,cinq', 'c/q':'carotte,camion,canard,cabane,cube,couleur,coque,coq,cinq,quille,équipe,masque,banque,barque,cirque', 'c/k':'caméra,carotte,canard,camion,cabane,cube,casque,couleur,kimono,koala,kayak,kilo,kilomètre,kangourou,képi' };
const extraTraps=Object.entries(pairs).flatMap(([pair,list])=>list.split(',').map(word=>{const forms=pair.split('/');let target=forms.includes('ss')&&word.includes('ss')?'ss':forms.find(f=>word.includes(f));if(pair==='qu/q')target=word.includes('qu')?'qu':'q';const i=word.indexOf(target);return {word,before:word.slice(0,i),target,after:word.slice(i+target.length),pair,level:['b/d','p/q'].includes(pair)?1:['c/g','c/ss','s/ss'].includes(pair)?2:3};}));
export const TRAP_WORDS=[...new Map([...EXTRA_LETTER_WORDS.map(w=>({...w,pair:'bd'.includes(w.target)?'b/d':'p/q'})),...extraTraps,...INITIAL_TRAPS].map(w=>[w.word+'|'+w.pair,w])).values()];
export function trapQuestion(difficulty='easy',previous=null,random=Math.random){
 const max={easy:1,medium:2,hard:3}[difficulty]||1,bank=TRAP_WORDS.filter(w=>w.level<=max&&w.word!==previous),row=bank[Math.floor(random()*bank.length)];
 const choices=row.pair.split('/');if(random()<.5)choices.reverse();
 return {...row,id:row.word,kind:'traps',choices,prompt:row.word,display:'gap'};
}
