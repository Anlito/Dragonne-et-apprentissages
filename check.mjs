import assert from 'node:assert/strict';
import {award,rankFor,question,numberQuestion,DIFFICULTIES,difficultyFor,RANK_THRESHOLDS,parsePoints} from './engine.mjs';
for(const size of [6,13,26])for(let i=0;i<200;i++){const q=question(size,'A');assert.equal(q.choices.length,size);assert.equal(new Set(q.choices).size,size);assert(q.choices.includes(q.target));assert.notEqual(q.target,'A');}
assert.deepEqual(Object.values(DIFFICULTIES).map(p=>p.letters),[6,13,26]);
assert.equal(difficultyFor({size:3}),'easy');assert.equal(difficultyFor({size:26}),'hard');
assert.equal(difficultyFor({difficulty:'medium',size:26}),'medium');
assert.equal(difficultyFor({difficulty:'toString'}),'easy');
assert.deepEqual(award(20,2,0),{score:35,streak:3,points:10,bonus:5});
assert.deepEqual(award(0,0,0),{score:10,streak:1,points:10,bonus:0});
assert.deepEqual(award(20,2,1),{score:25,streak:0,points:5,bonus:0});
for(const errors of [2,3,25])assert.deepEqual(award(20,2,errors),{score:21,streak:0,points:1,bonus:0});
assert.equal(award(299,0,2).score,300);assert.equal(rankFor(award(299,0,2).score),2);
for(const [i,threshold] of RANK_THRESHOLDS.entries()){assert.equal(rankFor(threshold),i+1);if(i>0)assert.equal(rankFor(threshold-1),i);}
let run={score:0,streak:0};for(let i=0;i<360;i++)run=award(run.score,run.streak,0);assert.equal(run.score,4200);
assert.deepEqual(RANK_THRESHOLDS,Array.from({length:100},(_,i)=>i*300));
assert.equal(rankFor(115),1);assert.equal(rankFor(299),1);assert.equal(rankFor(300),2);assert.equal(rankFor(4200),15);assert.equal(rankFor(9999),34);
console.log('Questions, récompenses et 100 paliers : vérifications réussies.');
for(const size of [3,6,9])for(let i=0;i<200;i++){const q=numberQuestion(size,5);assert.equal(q.choices.length,size);assert.equal(new Set(q.choices).size,size);assert(q.choices.includes(q.target));assert.notEqual(q.target,5);assert(q.choices.every(n=>Number.isInteger(n)&&n>=1&&n<=9));assert.deepEqual(q.choices,[...q.choices].sort((a,b)=>a-b));}
assert.throws(()=>numberQuestion(4),RangeError);console.log('Chiffres : 600 tirages, 3/6/9 choix et positions numériques vérifiés.');
assert.equal(parsePoints('312'),312);assert.equal(rankFor(parsePoints('312')),2);assert.equal(parsePoints('0'),0);assert.equal(parsePoints(' 4200 '),4200);for(const value of ['', ' ', '-1','1.5','abc','Infinity','9007199254740992'])assert.equal(parsePoints(value),null);
