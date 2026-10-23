import assert from 'node:assert/strict';
import {award,rankFor,question} from './engine.mjs';
for(const size of [3,6,26])for(let i=0;i<200;i++){const q=question(size,'A');assert.equal(q.choices.length,size);assert.equal(new Set(q.choices).size,size);assert(q.choices.includes(q.target));assert.notEqual(q.target,'A');}
assert.deepEqual(award(20,2),{score:35,streak:3,bonus:5});
assert.deepEqual(award(0,0),{score:10,streak:1,bonus:0});
assert.equal(rankFor(99),1);assert.equal(rankFor(100),2);assert.equal(rankFor(1400),15);assert.equal(rankFor(9999),15);
console.log('Questions, récompenses et 15 paliers : vérifications réussies.');
