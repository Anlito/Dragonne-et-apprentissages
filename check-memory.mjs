import assert from 'node:assert/strict';
import {createMemory,flipMemory,settleMemory,memoryLayout} from './memory.mjs';
import {award} from './engine.mjs';
for(const pairs of [4,8,16])for(let i=0;i<50;i++){const b=createMemory(pairs);assert.equal(b.cards.length,pairs*2);const counts=new Map();for(const c of b.cards)counts.set(c.animal,(counts.get(c.animal)||0)+1);assert.equal(counts.size,pairs);assert([...counts.values()].every(x=>x===2));}
const b=createMemory(4);const first=0,same=b.cards.findIndex((c,i)=>i!==first&&c.animal===b.cards[first].animal),other=b.cards.findIndex(c=>c.animal!==b.cards[first].animal);
assert.equal(flipMemory(b,first).type,'first');assert.equal(flipMemory(b,first).type,'ignored');assert.equal(flipMemory(b,other).type,'mismatch');assert.equal(flipMemory(b,same).type,'ignored');assert.equal(b.mistakes,1);settleMemory(b);assert(b.cards.every(c=>!c.revealed));
flipMemory(b,first);const match=flipMemory(b,same);assert.equal(match.type,'match');assert.equal(match.mistakes,1);assert.equal(award(0,0,match.mistakes).points,5);assert.equal(b.mistakes,0);settleMemory(b);assert.equal(flipMemory(b,first).type,'ignored');
while(b.found<b.pairs){const i=b.cards.findIndex(c=>!c.matched),j=b.cards.findIndex((c,k)=>k!==i&&!c.matched&&c.animal===b.cards[i].animal);flipMemory(b,i);const result=flipMemory(b,j);assert.equal(result.type,'match');assert.equal(result.mistakes,0);assert.equal(result.complete,b.found===b.pairs);settleMemory(b);}
assert(b.cards.every(c=>c.matched&&c.revealed));assert.equal(b.turns,5);
assert.throws(()=>createMemory(5),RangeError);console.log('Memory : grilles, doubles clics, blocage, erreurs, paires et fin de partie vérifiés.');
for(const count of [8,16,32])for(const [w,h] of [[280,300],[350,450],[780,210],[720,800]]){const l=memoryLayout(count,w,h,8);assert.equal(l.columns*l.rows,count);assert(l.size>0);assert(l.columns*l.size+(l.columns-1)*8<=w+.001);assert(l.rows*l.size+(l.rows-1)*8<=h+.001);}
assert.equal(memoryLayout(32,350,500).columns,4);assert.equal(memoryLayout(32,780,210).columns,8);
