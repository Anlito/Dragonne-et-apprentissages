import assert from 'node:assert/strict';
import {numberInFrench,numberWordsQuestion} from './number-words.mjs';
for(const [n,label] of [[0,'zéro'],[21,'vingt-et-un'],[61,'soixante-et-un'],[71,'soixante-et-onze'],[80,'quatre-vingts'],[81,'quatre-vingt-un'],[91,'quatre-vingt-onze'],[99,'quatre-vingt-dix-neuf'],[100,'cent']])assert.equal(numberInFrench(n),label);
assert.throws(()=>numberInFrench(-1),RangeError);
for(const [level,max,size] of [['easy',9,3],['medium',20,4],['hard',100,6]]){let previous=null,previousNumber=null;for(let i=0;i<500;i++){
 const q=numberWordsQuestion(level,previous),inverse=i%3===2,audio=i%3===0;
 assert.notEqual(q.number,previousNumber);assert.equal(q.direction,['audio-to-digits','letters-to-digits','digits-to-letters'][i%3]);assert.equal(q.choices.length,size);assert.equal(new Set(q.choices).size,size);assert.ok(q.choices.includes(q.target));assert.ok(q.number>=0&&q.number<=max);
 const valid=Array.from({length:max+1},(_,n)=>inverse?numberInFrench(n):n);assert.ok(q.choices.every(n=>valid.includes(n)));assert.equal(q.label,audio?'':inverse?String(q.number):numberInFrench(q.number));assert.equal(q.target,inverse?numberInFrench(q.number):q.number);
 if(audio){assert.equal(q.display,null);assert.ok(q.prompt.includes(numberInFrench(q.number)));assert.equal(q.instruction,'Écoute le nombre et retrouve-le parmi les chiffres.');}else assert.equal(q.prompt,q.instruction);
 previous=q.id;previousNumber=q.number;
}}
console.log('Chiffres et lettres : 1500 questions, trois niveaux et orthographe vérifiés.');
