import assert from 'node:assert/strict';
import {SOUND_GROUPS,LETTER_WORDS,GRAPH_WORDS,PART_WORDS,READING_IDS,readingChoices,readingQuestion,selectPiece,matchWord} from './reading.mjs';
let seed=7521;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
for(const row of [...LETTER_WORDS,...GRAPH_WORDS])assert.equal(row.before+row.target+row.after,row.word);
for(const row of PART_WORDS)assert.equal(row.parts.join(''),row.word);
const seen=new Set();
for(const kind of READING_IDS)for(const difficulty of ['easy','medium','hard']){
 let previous=null;
 for(let i=0;i<240;i++){
  const q=readingQuestion(kind,difficulty,previous,random);assert.equal(q.kind,kind);assert.ok(q.choices.length>0);
  if(!['build-word','link-words','traps'].includes(kind)){
   assert.equal(q.choices.length,readingChoices(difficulty));assert.equal(new Set(q.choices).size,q.choices.length);assert.ok(q.choices.includes(q.target));assert.notEqual(q.id,previous);
  }
  if(kind==='sounds'){
   const row=PART_WORDS.find(w=>w.word===q.example);assert.equal(q.prompt,row.word);assert.equal(q.target,row.parts[0]);assert.equal(q.choices.filter(x=>row.parts.includes(x)).length,1);
  }
  if(kind==='traps'){assert.equal(q.before+q.target+q.after,q.word);assert.equal(q.choices.length,2);assert.ok(q.choices.includes(q.target));assert.equal(q.prompt,q.word);}
  if(kind==='build-word'){
   assert.equal(q.parts.length,{easy:2,medium:3,hard:4}[difficulty]);
   assert.equal(q.choices.length,{easy:4,medium:6,hard:8}[difficulty]);
   const bad=q.choices.findIndex(x=>x!==q.parts[0]);assert.equal(selectPiece(q,bad),'wrong');assert.equal(selectPiece(q,bad),'ignored');assert.equal(q.selected.length,0);
   for(let n=0;n<q.parts.length;n++){
    const index=q.choices.findIndex((x,j)=>x===q.parts[n]&&!q.selected.includes(j));
    assert.ok(index>=0);const result=selectPiece(q,index);assert.equal(result,n===q.parts.length-1?'complete':'part');assert.equal(selectPiece(q,index),'ignored');
   }
   assert.equal(q.selected.map(n=>q.choices[n]).join(''),q.word);
  }
  if(kind==='link-words'){
   assert.equal(new Set(q.words).size,3);assert.deepEqual([...q.words].sort(),[...q.choices].sort());
   assert.equal(matchWord(q,0),'ignored');q.selected=0;
   const bad=q.choices.findIndex(x=>x!==q.words[0]);assert.equal(matchWord(q,bad),'wrong');assert.equal(q.matched.length,0);
   for(let n=0;n<3;n++){q.selected=n;const good=q.choices.indexOf(q.words[n]);assert.equal(matchWord(q,good),n===2?'complete':'pair');assert.equal(matchWord(q,good),'ignored');}
  }
  previous=q.id;
 }
}

assert.throws(()=>readingQuestion('inconnu'),RangeError);
console.log('Lecture : 5 760 tours, huit jeux, trois difficultés, graphèmes, assemblages, erreurs et associations vérifiés.');
