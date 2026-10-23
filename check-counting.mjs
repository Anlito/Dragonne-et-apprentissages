import assert from 'node:assert/strict';
import {countingQuestion,COUNT_OBJECTS,DICE_PIPS} from './counting.mjs';
let seed=13579;const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
const kinds=new Set(),seenObjects=new Set();
for(const choices of [3,6,9]){let previous=null;const targets=new Set();for(let i=0;i<300;i++){const q=countingQuestion(choices,previous,random);assert(q.target>=1&&q.target<=9);targets.add(q.target);assert.notEqual(q.target,previous);assert.equal(q.choices.length,choices);assert.equal(new Set(q.choices).size,choices);assert(q.choices.includes(q.target));assert(q.choices.every(n=>n>=1&&n<=9));assert.deepEqual(q.choices,[...q.choices].sort((a,b)=>a-b));assert(q.prompt.includes('?'));assert(!q.prompt.includes(String(q.target)));assert(q.object>=0&&q.object<COUNT_OBJECTS.length);if(q.kind==='dice'){assert(q.target<=6);assert.equal(DICE_PIPS[q.target].length,q.target);}kinds.add(q.kind);seenObjects.add(q.object);previous=q.target;}assert.equal(targets.size,9,'Chaque difficulté doit proposer les quantités 1 à 9');}
assert.equal(kinds.size,2);assert.equal(seenObjects.size,4);
for(let n=1;n<=6;n++){assert.equal(DICE_PIPS[n].length,n);assert.equal(new Set(DICE_PIPS[n]).size,n);assert(DICE_PIPS[n].every(p=>p>=1&&p<=9));}
assert.throws(()=>countingQuestion(5),RangeError);console.log('Comptage : 900 tirages, quantités, choix, objets et six faces de dé vérifiés.');
