import assert from 'node:assert/strict';
import {fingerPlan,fingerMarkup} from './hands.mjs';
for(let n=1;n<=9;n++){
  const plan=fingerPlan(n),svg=fingerMarkup(n);
  assert.equal(plan.reduce((a,b)=>a+b),n);
  assert.ok(plan.every(v=>v>=1&&v<=5));
  assert.deepEqual([...svg.matchAll(/data-fingers="(\d)"/g)].map(m=>Number(m[1])),plan);
  assert.ok(!svg.includes('<text'));
}
for(const n of [0,10,1.5,NaN])assert.throws(()=>fingerMarkup(n),RangeError);
console.log('Doigts : quantités 1–9 exactes, aucune étiquette chiffrée.');
