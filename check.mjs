import assert from 'node:assert/strict';
import {award,rankFor,question,DIFFICULTIES,difficultyFor} from './engine.mjs';
for(const size of [6,13,26])for(let i=0;i<200;i++){const q=question(size,'A');assert.equal(q.choices.length,size);assert.equal(new Set(q.choices).size,size);assert(q.choices.includes(q.target));assert.notEqual(q.target,'A');}
assert.deepEqual(Object.values(DIFFICULTIES).map(p=>p.letters),[6,13,26]);
assert.equal(difficultyFor({size:3}),'easy');assert.equal(difficultyFor({size:26}),'hard');
assert.equal(difficultyFor({difficulty:'medium',size:26}),'medium');
assert.equal(difficultyFor({difficulty:'toString'}),'easy');
assert.deepEqual(award(20,2),{score:35,streak:3,bonus:5});
assert.deepEqual(award(0,0),{score:10,streak:1,bonus:0});
assert.equal(rankFor(99),1);assert.equal(rankFor(100),2);assert.equal(rankFor(1400),15);assert.equal(rankFor(9999),15);
console.log('Questions, récompenses et 15 paliers : vérifications réussies.');
