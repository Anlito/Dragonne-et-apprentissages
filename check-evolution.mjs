import assert from 'node:assert/strict';
import {createEvolutionGate} from './evolution.mjs';
function fixture(minDuration=3400){
  let now=0,nextId=0,closed=0;const timers=new Map();
  const gate=createEvolutionGate({minDuration,onComplete:()=>closed++,schedule:(fn,ms)=>{const id=++nextId;timers.set(id,{fn,at:now+ms});return id;},cancel:id=>timers.delete(id)});
  return {gate,get closed(){return closed;},advance(ms){const end=now+ms;for(;;){const entry=[...timers].sort((a,b)=>a[1].at-b[1].at)[0];if(!entry||entry[1].at>end)break;now=entry[1].at;timers.delete(entry[0]);entry[1].fn();}now=end;}};
}
const long=fixture();long.advance(6500);assert.equal(long.closed,0,'Une longue voix ne doit pas être coupée');long.gate.speechFinished();assert.equal(long.closed,1);long.gate.speechFinished();assert.equal(long.closed,1);
const short=fixture();short.gate.speechFinished();short.advance(3399);assert.equal(short.closed,0);short.advance(1);assert.equal(short.closed,1);
const muted=fixture(1400);muted.gate.speechFinished();muted.advance(1400);assert.equal(muted.closed,1);
const skipped=fixture();skipped.gate.stop();skipped.advance(10000);skipped.gate.speechFinished();assert.equal(skipped.closed,0,'Une ancienne phrase ne ferme pas une nouvelle fenêtre');
console.log('Évolution : voix longue/courte, mode muet, fermeture manuelle et callbacks tardifs vérifiés.');
