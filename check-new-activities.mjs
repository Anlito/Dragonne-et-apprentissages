import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
import {colorQuestion,PAINTS,PAINT_MIXES,paintMarkup} from './colors.mjs';
import {variedQuestion} from './variation.mjs';
import {SOUND_ANIMALS} from './preschool.mjs';
import {ANIMALS} from './memory.mjs';
import {COUNT_OBJECTS} from './counting.mjs';
let seed=73;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/2**32);
for(const [level,count,recipes] of [['easy',2,3],['medium',3,7],['hard',4,15]]){
 const seen=new Set();let previous=null;
 for(let i=0;i<500;i++){const q=colorQuestion(level,previous,random);assert.notEqual(q.id,previous);previous=q.id;seen.add(q.id);assert.equal(q.choices.length,count);assert.equal(new Set(q.choices).size,count);assert(q.choices.includes(q.target));const mix=PAINT_MIXES.find(m=>m.slice(0,2).join('+')===q.id);assert.equal(q.target,mix[2]);assert.deepEqual([...q.ingredients].sort(),mix.slice(0,2).sort());assert(q.choices.every(c=>PAINTS[c]&&paintMarkup(c).includes(PAINTS[c][1])));}
 assert.equal(seen.size,recipes);
}
assert.equal(SOUND_ANIMALS.length,100);assert.equal(ANIMALS.length,100);assert.equal(COUNT_OBJECTS.length,18);
assert.equal(new Set(SOUND_ANIMALS.map(a=>a.id)).size,100);assert.equal(new Set(SOUND_ANIMALS.map(a=>a.audio)).size,100);
for(const a of SOUND_ANIMALS){assert(existsSync(a.audio));assert(existsSync(a.sprite));assert(a.tile<(a.cols||3)*(a.rows||2));}
const history=[];for(let i=0;i<200;i++){const last=[...history],q=variedQuestion(()=>({id:Math.floor(random()*10)}),history,9);assert(!last.includes(String(q.id)));assert(history.length<=9);}
// A small exhausted domain still returns the least recent exercise instead of hanging.
const small=['a','b','c'];const q=variedQuestion(()=>({id:'a'}),small,40);assert.equal(q.id,'a');assert.deepEqual(small,['b','c','a']);
const app=readFileSync(new URL('./app.js',import.meta.url),'utf8'),save=app.match(/function save\(\)\{[^\n]+/)[0];let writes=0;
const context={IS_PREVIEW:true,localStorage:{setItem(){writes++;throw Error('Preview wrote progress');}}};vm.createContext(context);vm.runInContext(save+';save();',context);assert.equal(writes,0);
assert(app.includes('if(IS_PREVIEW)return;try{localStorage.setItem(PROFILES_KEY,JSON.stringify(updated));}'));
assert(app.includes("if(!IS_PREVIEW&&!IS_PARENT_PAGE)showProfileChooser();"));
assert(readFileSync(new URL('./parents.html',import.meta.url),'utf8').includes('<body data-parent-page>'));
console.log('Couleurs : 1 500 mélanges corrects, niveaux 3/7/15 recettes ; 100 animaux, memory100, comptage18 ; anti-répétition et sauvegarde bloquée dans les aperçus : OK.');
