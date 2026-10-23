import {SYLLABLE_WORDS} from './content.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';
import {cleanChallenge,challengePlan,CHALLENGE_IDS} from './challenge.mjs';
import {cleanProfile,loadProfiles} from './profiles.mjs';
import {LETTER_WORDS,GRAPH_WORDS,PART_WORDS,WORDS,readingQuestion} from './reading.mjs';
import {TRAP_WORDS} from './traps.mjs';
import {numberDistractors} from './number-words.mjs';
for(const bank of [LETTER_WORDS,GRAPH_WORDS,PART_WORDS,WORDS,SYLLABLE_WORDS])assert.ok(new Set(bank.map(w=>w.word)).size>=100);
assert.ok(new Set(TRAP_WORDS.map(w=>w.word)).size>=100);
for(const row of [...LETTER_WORDS,...GRAPH_WORDS,...TRAP_WORDS]){assert.ok(row.target);assert.equal(row.before+row.target+row.after,row.word);}
for(const row of PART_WORDS){assert.equal(row.parts.join(''),row.word);assert.equal(row.parts.length,row.level+1);}
for(const level of ['easy','medium','hard'])for(let n=0;n<200;n++){const q=readingQuestion('sounds',level);assert.ok(q.prompt.startsWith('Trouve une des syllabes du mot suivant'));assert.equal(q.choices.filter(c=>SYLLABLE_WORDS.find(w=>w.word===q.example).parts.includes(c)).length,1);}
const near=numberDistractors(97,100,5,'hard',()=>.4);for(const n of [98,93,87])assert.ok(near.includes(n));
for(let n=0;n<=100;n++){const near=numberDistractors(n,100,5,'hard');assert.equal(new Set(near).size,5);assert.ok(!near.includes(n));assert.ok(near.every(v=>v>=0&&v<=100));}
const defaults=cleanChallenge();assert.equal(defaults.memory,false);assert.equal(defaults.fluency,false);
for(let i=0;i<100;i++){const p=challengePlan(defaults,Object.fromEntries(CHALLENGE_IDS.map(id=>[id,true])));assert.equal(p.length,20);assert.ok(p.every(id=>defaults[id]));assert.ok(p.every((id,n)=>n===0||id!==p[n-1]));}
assert.deepEqual(challengePlan(defaults,{}),[]);
assert.ok(challengePlan({...defaults,memory:true},{memory:true}).every(id=>id==='memory'));
const a=cleanProfile(),b=cleanProfile();a.challenge.memory=true;assert.equal(b.challenge.memory,false);
const restored=loadProfiles({version:2,activeId:'child-a',order:['child-a'],profiles:{'child-a':a}});assert.equal(restored.profiles['child-a'].challenge.memory,true);
// Le vrai enchaînement s'arrête au 20e exercice, avec conservation des points.
const source=fs.readFileSync(new URL('./app.js',import.meta.url),'utf8'),advance=source.match(/function advanceChallenge\(\)\{[\s\S]*?\n\}/)[0];
let launches=0,finished=0,total='';const context={mixedChallenge:{index:0,startScore:100},streak:2,state:{score:300},launchChallengeRound:()=>launches++,returnHome:()=>{context.mixedChallenge=null;},$:s=>s==='#challenge-total'?{set textContent(v){total=v;}}:{showModal:()=>finished++},chime:()=>{}};vm.createContext(context);vm.runInContext(advance,context);for(let n=0;n<20;n++)vm.runInContext('advanceChallenge()',context);assert.equal(launches,19);assert.equal(finished,1);assert.ok(total.includes('200'));vm.runInContext('advanceChallenge()',context);assert.equal(finished,1);
console.log('Contenus : banques >100, reconstructions et syllabes ; nombres proches ; défi 20, exclusions, profils et fin réelle vérifiés.');
console.log({lettres:LETTER_WORDS.length,graphèmes:GRAPH_WORDS.length,syllabes:SYLLABLE_WORDS.length,construction:PART_WORDS.length,écoute:WORDS.length,pièges:new Set(TRAP_WORDS.map(w=>w.word)).size});
// Une paire ne termine pas l'épreuve memory : seule la grille entière avance.
const celebrate=source.match(/function celebrateQuestion\([^)]*\)\{[\s\S]*?\n\}/)[0];
for(const [kind,found,pairs,expected] of [['memory',1,4,false],['memory',4,4,true],['fluency',0,0,true],['complete',0,0,true]]){
 const original=()=>{},advance=()=>{},fake={classList:{remove:()=>{},add:()=>{}},textContent:'',hidden:true};
 const ctx={mixedChallenge:{index:0},activeActivity:kind,memoryBoard:{found,pairs},advanceChallenge:advance,next:original,afterCelebration:null,$:()=>fake,activePage:()=>fake,setTimeout:()=>1,finishQuestionTransition:()=>{}};
 vm.createContext(ctx);vm.runInContext(celebrate+';celebrateQuestion({points:10,bonus:0},false,next)',ctx);assert.equal(ctx.afterCelebration,expected?advance:original);
}
