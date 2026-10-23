import assert from 'node:assert/strict';
import {numberInFrench,numberWordsQuestion} from './number-words.mjs';
for(const [n,label] of [[0,'zéro'],[21,'vingt-et-un'],[61,'soixante-et-un'],[71,'soixante-et-onze'],[80,'quatre-vingts'],[81,'quatre-vingt-un'],[91,'quatre-vingt-onze'],[99,'quatre-vingt-dix-neuf'],[100,'cent']])assert.equal(numberInFrench(n),label);
assert.throws(()=>numberInFrench(-1),RangeError);
for(const [level,max,size] of [['easy',9,3],['medium',20,4],['hard',100,6]]){let previous=null;for(let i=0;i<500;i++){const q=numberWordsQuestion(level,previous);assert.notEqual(q.id,previous);assert.equal(q.choices.length,size);assert.equal(new Set(q.choices).size,size);assert.ok(q.choices.includes(q.target));assert.ok(q.choices.every(n=>n>=0&&n<=max));assert.equal(q.label,numberInFrench(q.target));previous=q.id;}}
console.log('Chiffres et lettres : 1500 questions, trois niveaux et orthographe vérifiés.');
