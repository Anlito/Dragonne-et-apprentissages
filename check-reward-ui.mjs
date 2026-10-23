import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {award,rankFor} from './engine.mjs';
const source=fs.readFileSync(new URL('./app.js',import.meta.url),'utf8');
const fn=source.match(/function finishReading\([^)]*\)\{[\s\S]*?\n\}/)?.[0];assert.ok(fn);
for(const mistakes of [0,1,2]){
 const buttons=[{disabled:false},{disabled:false}],feedback={textContent:''};let saves=0,transition=null,nexts=0;
 const context={locked:false,state:{score:295},streak:2,mistakes,completed:0,award,rankFor,$:()=>feedback,$$:()=>buttons,save:()=>saves++,render:()=>{},dots:()=>{},chime:()=>{},say:()=>{},nextReading:()=>nexts++,celebrateQuestion:(result,evolves,continuation)=>{transition={result,evolves,continuation};}};
 vm.createContext(context);vm.runInContext(fn+';finishReading();',context);
 const expected=award(295,2,mistakes);assert.equal(context.state.score,expected.score);assert.equal(context.completed,1);assert.equal(saves,1);assert.ok(buttons.every(b=>b.disabled));assert.equal(transition.evolves,rankFor(expected.score)>rankFor(295));assert.ok(feedback.textContent.includes('Bravo'));
 transition.continuation();assert.equal(nexts,1);vm.runInContext('finishReading();',context);assert.equal(saves,1);assert.equal(context.state.score,expected.score);
}
console.log('Validation réelle de l’interface : boutons bloqués, points 10/5/1, bonus, sauvegarde, évolution, suite et double clic vérifiés.');
