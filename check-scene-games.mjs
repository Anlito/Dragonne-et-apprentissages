import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {SCENE_IDS,SCENE_LEVELS,SCENE_SLOTS,differenceQuestion,findDifference,observationQuestion,observationChoiceMarkup,createObservationTimer} from './scene-games.mjs';
import {cleanProfile} from './profiles.mjs';
import {cleanChallenge,challengePlan} from './challenge.mjs';
let seed=192;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/2**32);
for(const level of ['easy','medium','hard']){
 const settings=SCENE_LEVELS[level],seen=new Set();let previous=null;
 for(let n=0;n<500;n++){
  const q=differenceQuestion(level,previous,random);assert.notEqual(q.id,previous);previous=q.id;seen.add(q.id);
  const actual=SCENE_SLOTS.filter(slot=>q.original[slot.id]!==q.changed[slot.id]).map(slot=>slot.id);assert.deepEqual([...actual].sort(),[...q.targets].sort());assert.equal(q.targets.length,settings.differences);assert.equal(new Set(q.targets).size,q.targets.length);assert.equal(q.original.details,settings.details);
  assert.equal(findDifference(q,'background'),'wrong');for(const key of q.targets){const result=findDifference(q,key);assert(['found','complete'].includes(result));assert.equal(findDifference(q,key),'ignored');}assert.equal(q.found.length,q.targets.length);
  const observation=observationQuestion(level,null,random);assert.equal(observation.scene.details,settings.details);assert.equal(observation.target,observation.scene[observation.type]);assert(observation.choices.includes(observation.target));assert.equal(observation.choices.length,settings.choices);assert.equal(new Set(observation.choices).size,settings.choices);assert.equal(observation.phase,'ready');for(const value of observation.choices)assert(observationChoiceMarkup(observation,value).length>20);
 }
 assert(seen.size>400);
}
let time=0,serial=0,ended=0;const pending=new Map(),ticks=[];
const timer=createObservationTimer({now:()=>time,schedule:(callback,delay)=>{const id=++serial;pending.set(id,{callback,at:time+delay});return id;},cancel:id=>pending.delete(id),onTick:seconds=>ticks.push(seconds),onEnd:()=>ended++});
function advance(ms){const target=time+ms;while(true){const due=[...pending].filter(([,task])=>task.at<=target).sort((a,b)=>a[1].at-b[1].at)[0];if(!due)break;time=due[1].at;pending.delete(due[0]);due[1].callback();}time=target;}
timer.start();assert.equal(ticks[0],5);advance(4999);assert.equal(ended,0);advance(1);assert.equal(ended,1);advance(10000);assert.equal(ended,1);timer.start();advance(2000);timer.stop();advance(10000);assert.equal(ended,1);timer.start();advance(5000);assert.equal(ended,2);
for(const id of SCENE_IDS){const child=cleanProfile({name:'Test',activityLevels:{[id]:'hard'},activities:{[id]:false}});assert.equal(child.activityLevels[id],'hard');assert.equal(child.activities[id],false);assert.equal(cleanProfile().activities[id],true);assert.equal(cleanChallenge()[id],false);assert(challengePlan({...cleanChallenge(),[id]:true},{[id]:true},random).every(kind=>kind===id));}
const source=readFileSync(new URL('./app.js',import.meta.url),'utf8');
const choose=source.match(/function chooseDifference\(slot\)\{[\s\S]*?\n\}/)[0];
const q=differenceQuestion('easy',null,random);let rewards=0,errors=0;const element={classList:{add(){}},setAttribute(){},textContent:''};const context={locked:false,current:q,activeActivity:'differences',findDifference,readingError:()=>errors++,chime(){},render(){},updateDifferenceProgress(){},finishReading:()=>{rewards++;context.locked=true;},nextScene(){},$:()=>element,$$:()=>[element]};vm.createContext(context);vm.runInContext(choose,context);
context.chooseDifference('background');assert.equal(errors,1);context.chooseDifference(q.targets[0]);assert.equal(rewards,0);context.chooseDifference(q.targets[0]);assert.equal(rewards,0);context.chooseDifference(q.targets[1]);assert.equal(rewards,1);context.chooseDifference(q.targets[1]);assert.equal(rewards,1);
assert(source.includes("if(locked||current?.phase!=='question'||button.disabled)return;"));
assert(source.includes('board.replaceChildren();const prompt='));
console.log('Scènes : 1 500 comparaisons exactes, 1 500 questions cohérentes, variété, 2/3/5 différences, 2/3/4 choix, délai réel 5 000 ms, arrêt/reprise, points uniquement en fin de scène, profils et défi : OK.');
