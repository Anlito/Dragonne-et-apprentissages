export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const DIFFICULTIES = {
  easy: {label:'Facile', letters:6, numbers:3, memoryPairs:4, maxQuantity:9},
  medium: {label:'Moyen', letters:13, numbers:6, memoryPairs:8, maxQuantity:9},
  hard: {label:'Difficile', letters:26, numbers:9, memoryPairs:16, maxQuantity:9}
};
export function difficultyFor(saved) {
  if(Object.hasOwn(DIFFICULTIES,saved?.difficulty))return saved.difficulty;
  return saved?.size===26?'hard':saved?.size===13?'medium':'easy';
}
export const MAX_RANK = 100;
export const POINTS_PER_RANK = 300;
export const rankFor = score => Math.min(MAX_RANK, Math.floor(score / POINTS_PER_RANK) + 1);
export const RANK_THRESHOLDS = Array.from({length:MAX_RANK},(_,i)=>i*POINTS_PER_RANK);
export function parsePoints(value){
  if(typeof value!=='string'||value.trim()==='')return null;
  const points=Number(value);
  return Number.isSafeInteger(points)&&points>=0?points:null;
}
export function award(score, streak, mistakes = 0) {
  const points = mistakes===0?10:mistakes===1?5:1;
  const nextStreak = mistakes===0?streak+1:0;
  const bonus = nextStreak>0&&nextStreak%3===0?5:0;
  return {score:score+points+bonus,streak:nextStreak,points,bonus};
}
export function question(size, previous = '', random = Math.random) {
  const shuffled = [...ALPHABET];
  for (let i=shuffled.length-1;i>0;i--) { const j=Math.floor(random()*(i+1)); [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]; }
  const available = shuffled.filter(x=>x!==previous);
  const target = available[0];
  const choices = size===26 ? [...ALPHABET] : shuffled.filter(x=>x!==target).slice(0,size-1).concat(target);
  if(size!==26) for(let i=choices.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[choices[i],choices[j]]=[choices[j],choices[i]];}
  return {target,choices};
}
export function numberQuestion(size,previous=null,random=Math.random){
  if(![3,6,9].includes(size))throw new RangeError('Nombre de choix invalide');
  const digits=Array.from({length:9},(_,i)=>i+1);
  for(let i=digits.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[digits[i],digits[j]]=[digits[j],digits[i]];}
  const target=digits.find(n=>n!==previous);
  return {target,choices:[target,...digits.filter(n=>n!==target).slice(0,size-1)].sort((a,b)=>a-b)};
}
