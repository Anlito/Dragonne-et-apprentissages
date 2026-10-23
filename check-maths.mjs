import assert from 'node:assert/strict';
import {arithmeticQuestion,multiplicationQuestion,evaluateExpression,MATH_LEVELS} from './maths.mjs';
let seed=15;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
for(const level of ['easy','medium','hard'])for(const mode of ['answer','missing','line']){
 let previous=null;
 for(let n=0;n<180;n++){
  const q=arithmeticQuestion(level,mode,previous,random),config=MATH_LEVELS[level];
  assert.equal(evaluateExpression(q.terms,q.operators),q.total);assert.ok(q.total>=0&&q.total<=config.limit);
  let total=q.terms[0];for(let i=1;i<q.terms.length;i++){total=q.operators[i-1]==='+'?total+q.terms[i]:total-q.terms[i];assert.ok(total>=0&&total<=config.limit);}
  assert.equal(q.target,q.missing>=0?q.terms[q.missing]:q.total);assert.equal(q.choices.length,config.choices);assert.equal(new Set(q.choices).size,q.choices.length);assert.ok(q.choices.includes(q.target));assert.ok(q.choices.every(x=>Number.isInteger(x)&&x>=0&&x<=q.limit));assert.equal(q.equation.split('?').length,2);
  assert.ok(q.terms.length===(level==='easy'?2:level==='medium'?3:q.terms.length));if(level==='hard')assert.ok(q.terms.length>=3&&q.terms.length<=4);previous=q.id;
 }
}
for(let table=1;table<=10;table++)for(const level of ['easy','medium','hard']){
 let previous=null;for(let n=0;n<80;n++){
  const q=multiplicationQuestion(table,level,previous,random);assert.equal(q.target,table*q.factor);assert.notEqual(q.factor,previous);assert.equal(q.choices.length,MATH_LEVELS[level].choices);assert.ok(q.choices.includes(q.target));assert.equal(new Set(q.choices).size,q.choices.length);assert.ok(q.choices.every(x=>x>=0));if(level==='hard')assert.ok(q.choices.every(x=>x%table===0));previous=q.factor;
 }
}
for(const table of [0,11,2.5])assert.throws(()=>multiplicationQuestion(table),RangeError);
console.log('Maths : 4 020 calculs, opérations intermédiaires non négatives, trous, jauges, 10 tables et trois difficultés vérifiés.');
