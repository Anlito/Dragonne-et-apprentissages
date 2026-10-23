export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const rankFor = score => Math.min(15, Math.floor(score / 100) + 1);
export function award(score, streak) { const nextStreak = streak + 1; const bonus = nextStreak % 3 === 0 ? 5 : 0; return {score: score + 10 + bonus, streak: nextStreak, bonus}; }
export function question(size, previous = '', random = Math.random) {
  const shuffled = [...ALPHABET];
  for (let i=shuffled.length-1;i>0;i--) { const j=Math.floor(random()*(i+1)); [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]; }
  const available = shuffled.filter(x=>x!==previous);
  const target = available[0];
  const choices = size===26 ? [...ALPHABET] : shuffled.filter(x=>x!==target).slice(0,size-1).concat(target);
  if(size!==26) for(let i=choices.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[choices[i],choices[j]]=[choices[j],choices[i]];}
  return {target,choices};
}
