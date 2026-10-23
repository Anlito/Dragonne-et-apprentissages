import {numberQuestion} from './engine.mjs';
export const COUNT_OBJECTS=[
  {name:'Une pomme',prompt:'Combien y a-t-il de pommes ?'},
  {name:'Une étoile',prompt:'Combien y a-t-il d’étoiles ?'},
  {name:'Une pierre précieuse',prompt:'Combien y a-t-il de pierres précieuses ?'},
  {name:'Une fleur',prompt:'Combien y a-t-il de fleurs ?'}
];
export const DICE_PIPS={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]};
export function countingQuestion(choiceCount,previous=null,random=Math.random){
  const {target,choices}=numberQuestion(choiceCount,previous,random);
  const kind=random()<.25&&target<=6?'dice':'objects';
  const object=Math.floor(random()*COUNT_OBJECTS.length);
  return {target,choices,kind,object,prompt:kind==='dice'?'Combien y a-t-il de points sur le dé ?':COUNT_OBJECTS[object].prompt};
}
