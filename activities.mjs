// Une entrée par activité : les nouveaux jeux seront visibles par défaut.
export const ACTIVITIES=[
  {id:'letters',button:'letters',label:'Les lettres',tile:0},
  {id:'memory',button:'memory-start',label:'Les paires',tile:1},
  {id:'numbers',button:'numbers-start',label:'Les chiffres',tile:2},
  {id:'counting',button:'counting-start',label:'Je compte',tile:3}
];
export function cleanActivities(saved){
  return Object.fromEntries(ACTIVITIES.map(({id})=>[id,saved?.[id]!==false]));
}
