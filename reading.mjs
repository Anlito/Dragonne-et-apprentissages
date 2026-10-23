import {numberWordsQuestion} from './number-words.mjs';
// Contenu des activités de lecture. Les groupes reprennent la feuille fournie,
// avec des exemples et une prononciation contextualisée plutôt qu'une API lue par la voix.
export const SOUND_GROUPS=[
 {id:'ch',forms:['ch'],say:'che',example:'chat',level:1},
 {id:'f',forms:['ph'],say:'fe',example:'photo',level:2},
 {id:'k',forms:['qu','ch'],say:'ke',example:'quatre',examples:{ch:'chorale'},level:2},
 {id:'gn',forms:['gn'],say:'gne',example:'montagne',level:2},
 {id:'g',forms:['gu'],say:'gue',example:'guitare',level:2},
 {id:'j',forms:['ge'],say:'je',example:'pigeon',level:2},
 {id:'oi',forms:['oi'],say:'oi',example:'roi',level:1},
 {id:'oin',forms:['oin'],say:'oin',example:'coin',level:2},
 {id:'ui',forms:['ui'],say:'ui',example:'nuit',level:2},
 {id:'ail',forms:['ail','aille'],say:'aïe',example:'travail',examples:{aille:'paille'},level:2},
 {id:'eil',forms:['eil','eille'],say:null,example:'soleil',examples:{eille:'abeille'},level:2},
 {id:'euil',forms:['euil','euille'],say:null,example:'écureuil',examples:{euille:'feuille'},level:2},
 {id:'ille',forms:['ille'],say:null,example:'bille',level:2},
 {id:'ier',forms:['ier'],say:null,example:'cahier',level:2},
 {id:'ieu',forms:['ieu'],say:null,example:'lieu',level:2},
 {id:'ion',forms:['ion'],say:null,example:'lion',level:2},
 {id:'o',forms:['au','eau'],say:'o',example:'chaud',examples:{eau:'bateau'},level:1},
 {id:'eu',forms:['eu','œu'],say:'eu',example:'bleu',examples:{'œu':'nœud'},level:2},
 {id:'è',forms:['ai','ei','et'],say:'è',example:'maison',examples:{ei:'neige',et:'bonnet'},level:1},
 {id:'ou',forms:['ou'],say:'ou',example:'loup',level:1},
 {id:'an',forms:['an','am','en','em'],say:'an',example:'chambre',examples:{an:'manteau',am:'chambre',en:'vent',em:'temps'},level:1},
 {id:'on',forms:['on','om'],say:'on',example:'ponton',examples:{om:'ombre'},level:1},
 {id:'in',forms:['in','im','ain','aim','ein','un','um'],say:'in',example:'lapin',examples:{im:'timbre',ain:'train',aim:'faim',ein:'plein',un:'brun',um:'parfum'},level:1}
];
// word / début / partie manquante / fin / difficulté du vocabulaire
const LETTER_ROWS=[
 ['bateau','','b','ateau'],['ballon','','b','allon'],['banane','','b','anane'],['bouche','','b','ouche'],
 ['robe','ro','b','e'],['cube','cu','b','e'],['arbre','ar','b','re'],['robot','ro','b','ot'],
 ['domino','','d','omino'],['dame','','d','ame'],['dent','','d','ent'],['cadeau','ca','d','eau'],
 ['salade','sala','d','e'],['radis','ra','d','is'],['papa','','p','apa'],['poule','','p','oule'],
 ['pomme','','p','omme'],['lapin','la','p','in'],['tapis','ta','p','is'],['pirate','','p','irate'],
 ['quatre','','q','uatre'],['quille','','q','uille'],['équipe','é','q','uipe'],['coq','co','q','']
];
const GRAPH_ROWS=[
 ['bateau','bat','eau','',1],['chapeau','chap','eau','',1],['cadeau','cad','eau','',1],['chaud','ch','au','d',1],['jaune','j','au','ne',1],
 ['neige','n','ei','ge',1],['reine','r','ei','ne',1],['roi','r','oi','',1],['poire','p','oi','re',1],['oiseau','','oi','seau',1],
 ['poule','p','ou','le',1],['roue','r','ou','e',1],['mouton','m','ou','ton',1],['lapin','lap','in','',1],['sapin','sap','in','',1],
 ['ballon','ball','on','',1],['bouton','bout','on','',1],['manteau','m','an','teau',1],['enfant','','en','fant',1],['dent','d','en','t',1],
 ['coin','c','oin','',2],['point','p','oin','t',2],['nuit','n','ui','t',2],['pluie','pl','ui','e',2],
 ['chat','','ch','at',1],['photo','','ph','oto',2],['quatre','','qu','atre',1],['montagne','monta','gn','e',2],
 ['guitare','','gu','itare',2],['pigeon','pi','ge','on',2],['travail','trav','ail','',2],['paille','p','aille','',2],
 ['soleil','sol','eil','',2],['abeille','ab','eille','',2],['écureuil','écur','euil','',2],['feuille','f','euille','',2],
 ['bille','b','ille','',2],['cahier','cah','ier','',2],['lieu','l','ieu','',2],['lion','l','ion','',2],
 ['bleu','bl','eu','',1],['nœud','n','œu','d',2],['maison','m','ai','son',1],['bonnet','bonn','et','',2],
 ['chambre','ch','am','bre',2],['temps','t','em','ps',2],['ombre','','om','bre',2],['timbre','t','im','bre',2],
 ['train','tr','ain','',2],['faim','f','aim','',2],['plein','pl','ein','',2],['brun','br','un','',2],['parfum','parf','um','',2]
];
const convert=rows=>rows.map(([word,before,target,after,level=1])=>({word,before,target,after,level}));
export const LETTER_WORDS=convert(LETTER_ROWS),GRAPH_WORDS=convert(GRAPH_ROWS);
export const WORDS=[...new Map([...LETTER_WORDS,...GRAPH_WORDS].map(row=>[row.word,{word:row.word,level:row.level}])).values()];
const PART_ROWS=[
 ['chapeau',['cha','peau'],1],['bateau',['ba','teau'],1],['cadeau',['ca','deau'],1],['lapin',['la','pin'],1],
 ['sapin',['sa','pin'],1],['mouton',['mou','ton'],1],['ballon',['bal','lon'],1],['maison',['mai','son'],1],
 ['poule',['pou','le'],1],['robot',['ro','bot'],1],['tapis',['ta','pis'],1],['jardin',['jar','din'],1],
 ['maman',['ma','man'],1],['salade',['sa','la','de'],2],['banane',['ba','na','ne'],2],
 ['domino',['do','mi','no'],2],['pirate',['pi','ra','te'],2],['tomate',['to','ma','te'],2],
 ['chocolat',['cho','co','lat'],2],['parapluie',['pa','ra','pluie'],2],['animal',['a','ni','mal'],2],
 ['cinéma',['ci','né','ma'],2],['caméra',['ca','mé','ra'],2],['canapé',['ca','na','pé'],2],
 ['locomotive',['lo','co','mo','tive'],3],['télévision',['té','lé','vi','sion'],3],['rhinocéros',['rhi','no','cé','ros'],3],
 ['hélicoptère',['hé','li','co','ptère'],3],['ordinateur',['or','di','na','teur'],3]
];
export const PART_WORDS=PART_ROWS.map(([word,parts,level])=>({word,parts,level}));
export const READING_IDS=['sounds','complete','graphemes','word-listen','link-words','build-word','number-words'];
export const READING_META={
 'number-words':{label:'Chiffres et lettres',title:'Quel est ce nombre ?',instruction:'Lis le nombre écrit en lettres et retrouve-le parmi les chiffres.'},
 sounds:{label:'Les sons',title:'Écoute le son',instruction:'Écoute, puis touche le groupe de lettres.'},
 complete:{label:'J’écoute et je complète',title:'Écoute et complète',instruction:'Écoute le mot. Choisis la partie manquante.'},
 graphemes:{label:'Les morceaux du mot',title:'Complète le mot',instruction:'Complète le mot. Tu peux l’écouter avec le haut-parleur.'},
 'word-listen':{label:'J’écoute un mot',title:'Quel mot as-tu entendu ?',instruction:'Écoute le mot, puis touche son écriture.'},
 'link-words':{label:'Je relie',title:'Écoute et relie',instruction:'Écoute le son 1, 2 ou 3 et relie-le au bon mot.'},
 'build-word':{label:'Le mot en morceaux',title:'Construis le mot',instruction:'Écoute le mot. Touche les morceaux dans le bon ordre.'}
};
export const readingChoices=level=>({easy:3,medium:4,hard:6})[level]||3;
export function shuffle(values,random=Math.random){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const pick=(rows,previous,random)=>shuffle(rows.filter(x=>(x.id||x.word)!==previous),random)[0]||rows[0];
function wordSimilarity(a,b){let score=0;for(let i=1;i<=Math.min(a.length,b.length);i++){if(a.slice(-i)===b.slice(-i))score+=i;if(a.slice(0,i)===b.slice(0,i))score+=i;}return score;}
const options=(target,pool,count,random)=>shuffle([target,...shuffle([...new Set(pool)].filter(x=>x!==target),random).slice(0,count-1)],random);
export function readingQuestion(kind,difficulty='easy',previous=null,random=Math.random){
 if(!READING_IDS.includes(kind))throw new RangeError('Activité inconnue');
 if(kind==='number-words')return numberWordsQuestion(difficulty,previous,random);
 const count=readingChoices(difficulty),maxLevel=difficulty==='easy'?1:2;
 if(kind==='sounds'){
   const groups=SOUND_GROUPS.filter(g=>g.level<=maxLevel),group=pick(groups,previous,random);
   const target=shuffle(group.forms,random)[0],example=group.examples?.[target]||group.example;
   // Un même graphème peut avoir deux sons (ch). Ne pas proposer deux ch.
   const otherForms=shuffle(groups.filter(g=>g.id!==group.id&&!g.forms.some(form=>group.forms.includes(form))),random).map(g=>shuffle(g.forms,random)[0]);
   const choices=options(target,otherForms,count,random);
   return {id:group.id,kind,target,choices,example,prompt:group.say?`Écoute le son ${group.say}, comme dans ${example}.`:`Écoute le groupe de sons dans le mot ${example}.`,display:null};
 }
 if(kind==='complete'||kind==='graphemes'){
   const bank=kind==='complete'?(difficulty==='easy'?LETTER_WORDS:[...LETTER_WORDS,...GRAPH_WORDS.filter(w=>w.level<=maxLevel)]):GRAPH_WORDS.filter(w=>w.level<=maxLevel);
   const row=pick(bank,previous,random),letter=LETTER_WORDS.includes(row);
   const pool=letter?(difficulty==='hard'?['b','d','p','q','t','f','v','n']:['b','d','p','q']):GRAPH_WORDS.filter(w=>w.level<=maxLevel).map(w=>w.target);
   return {...row,id:row.word,kind,choices:options(row.target,pool,count,random),prompt:row.word,display:'gap'};
 }
 if(kind==='word-listen'){
   const bank=WORDS.filter(w=>w.level<=maxLevel),row=pick(bank,previous,random);
   return {id:row.word,kind,target:row.word,word:row.word,choices:options(row.word,bank.map(w=>w.word),count,random),prompt:row.word,display:null};
 }
 if(kind==='link-words'){
   const bank=WORDS.filter(w=>w.level<=maxLevel);let rows=shuffle(bank,random);if(difficulty==='hard'){const anchor=rows[0];rows.sort((a,b)=>wordSimilarity(b.word,anchor.word)-wordSimilarity(a.word,anchor.word));}const words=rows.slice(0,3).map(w=>w.word);
   return {id:words.join('|'),kind,words,choices:shuffle(words,random),prompt:READING_META[kind].instruction,matched:[],selected:null,wrong:[[],[],[]],display:'match'};
 }
 const maxParts=difficulty==='easy'?1:difficulty==='medium'?2:3;
 const row=pick(PART_WORDS.filter(w=>w.level===maxParts),previous,random);
 const distractors=row.word==='chapeau'?['fa','deau','coin','bou','mi','ton']:PART_WORDS.flatMap(w=>w.parts);
 const pieces=[...row.parts,...shuffle([...new Set(distractors)].filter(x=>!row.parts.includes(x)),random).slice(0,({easy:4,medium:6,hard:8})[difficulty]-row.parts.length)];
 return {...row,id:row.word,kind,choices:shuffle(pieces,random),prompt:row.word,selected:[],wrong:[],display:'build'};
}
// Retourne le résultat sans attribuer de points : la récompense appartient au tour entier.
export function selectPiece(round,index){
 if(round.kind!=='build-word'||round.selected.includes(index)||round.selected.length===round.parts.length||round.wrong.includes(index))return 'ignored';
 if(round.choices[index]!==round.parts[round.selected.length]){round.wrong.push(index);return 'wrong';}
 round.selected.push(index);round.wrong=[];
 return round.selected.length===round.parts.length?'complete':'part';
}
export function matchWord(round,index){
 const selected=round.selected;
 if(round.kind!=='link-words'||selected===null||round.matched.includes(selected)||round.wrong[selected].includes(index))return 'ignored';
 if(round.choices[index]!==round.words[selected]){round.wrong[selected].push(index);return 'wrong';}
 round.matched.push(selected);round.selected=null;
 return round.matched.length===3?'complete':'pair';
}
