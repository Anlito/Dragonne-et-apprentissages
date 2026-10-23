// Une entrée par activité : les nouveaux jeux seront visibles par défaut.
export const ACTIVITIES=[
  {id:'letters',button:'letters',label:'Les lettres',tile:0},
  {id:'memory',button:'memory-start',label:'Les paires',tile:1},
  {id:'numbers',button:'numbers-start',label:'Les chiffres',tile:2},
  {id:'counting',button:'counting-start',label:'Je compte',tile:3},
  ...[
    ['sounds','Les sons'],['complete','J’écoute et je complète'],['graphemes','Les morceaux du mot'],
    ['word-listen','J’écoute un mot'],['link-words','Je relie'],['build-word','Le mot en morceaux']
  ].map(([id,label],readingTile)=>({id,button:id+'-start',label,readingTile})),
  {id:'arithmetic',button:'arithmetic-start',label:'Les calculs + et −',mathTile:0},
  {id:'multiply',button:'multiply-start',label:'Les multiplications',mathTile:1}
];
export function cleanActivities(saved){
  return Object.fromEntries(ACTIVITIES.map(({id})=>[id,saved?.[id]!==false]));
}

export function cleanActivityLevels(saved){return Object.fromEntries(ACTIVITIES.filter(a=>['easy','medium','hard'].includes(saved?.[a.id])).map(a=>[a.id,saved[a.id]]));}
