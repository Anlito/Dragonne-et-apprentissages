import assert from 'node:assert/strict';
import {TRAP_WORDS,trapQuestion} from './traps.mjs';
import {placementReward} from './maths.mjs';
for(const w of TRAP_WORDS){assert.equal(w.before+w.target+w.after,w.word);assert.ok(w.pair.split('/').includes(w.target));}
for(const level of ['easy','medium','hard']){let previous=null;for(let i=0;i<300;i++){const q=trapQuestion(level,previous);assert.notEqual(q.id,previous);assert.equal(q.choices.length,2);assert.equal(new Set(q.choices).size,2);assert.ok(q.choices.includes(q.target));if(level==='easy')assert.equal(q.level,1);if(level==='medium')assert.ok(q.level<=2);previous=q.id;}}
for(const limit of [10,20,100])for(let target=0;target<=limit;target++)for(let value=0;value<=limit;value++){
 const r=placementReward(100,2,value,target,limit),delta=Math.abs(value-target),points=delta===0?10:delta/limit<=.05?5:delta/limit<=.1?1:0;
 assert.equal(r.points,points);assert.equal(r.score,100+points+(delta===0?5:0));assert.equal(r.streak,delta===0?3:0);
}
console.log('Pièges : reconstruction, paires et niveaux ; jauge : distances, seuils, bonus et points vérifiés.');
