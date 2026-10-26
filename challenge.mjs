export const CHALLENGE_IDS=['colors','differences','observation','shapes','animal-sounds','shadows','letters','numbers','counting','sounds','complete','graphemes','word-listen','link-words','build-word','traps','number-words','arithmetic','multiply','memory','fluency'];
const LONG=['differences','observation','memory','fluency','link-words','build-word'];
export function cleanChallenge(saved){return Object.fromEntries(CHALLENGE_IDS.map(id=>[id,typeof saved?.[id]==='boolean'?saved[id]:!LONG.includes(id)]));}
export function challengePlan(settings,visible,random=Math.random){
 const enabled=CHALLENGE_IDS.filter(id=>settings[id]&&visible[id]);if(!enabled.length)return [];
 const plan=[];while(plan.length<20){const bag=[...enabled];for(let i=bag.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}if(bag.length>1&&bag[0]===plan.at(-1))[bag[0],bag[1]]=[bag[1],bag[0]];plan.push(...bag.slice(0,20-plan.length));}return plan;
}
export function uniqueChallengeQuestion(factory,seen,kind){
 let q,key;for(let i=0;i<100;i++){q=factory();key=kind+':'+(q.id??JSON.stringify([q.target,q.choices,q.object,q.kind]));if(!seen.has(key)){seen.add(key);return q;}}
 // Petits domaines (9 chiffres) : de nouveaux choix restent un exercice différent.
 key=kind+':'+JSON.stringify(q);if(!seen.has(key)){seen.add(key);return q;}
 return q;
}
