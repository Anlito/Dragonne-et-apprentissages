import assert from 'node:assert/strict';
import {MAX_RANK,RANK_THRESHOLDS,rankFor,award} from './engine.mjs';
import {DRAGONS,cleanProfile} from './profiles.mjs';
import {dragonAppearance,equipmentMarkup} from './dragon-evolutions.mjs';
import fs from 'node:fs';
assert.equal(MAX_RANK,100);assert.equal(RANK_THRESHOLDS.at(-1),29700);
for(let rank=1;rank<=100;rank++){
 const score=(rank-1)*300;assert.equal(rankFor(score),rank);if(rank>1)assert.equal(rankFor(score-1),rank-1);
 const look=dragonAppearance(rank);assert.ok(look.cell>=0&&look.cell<look.columns*look.rows);
 if(rank<=15){assert.equal(look.cell,rank-1);assert.equal(look.grade,0);}else assert.ok(look.grade>=1&&look.grade<=5);
}
assert.equal(rankFor(1000000),100);assert.equal(rankFor(4200),15);assert.equal(rankFor(4500),16);assert.equal(rankFor(29400),99);
const signatures=Array.from({length:100},(_,i)=>{const v=dragonAppearance(i+1);return [v.atlas,v.cell,v.grade].join(':');});assert.equal(new Set(signatures).size,100);
assert.equal(new Set([1,2,3,4,5].map(equipmentMarkup)).size,5);
for(const dragon of Object.values(DRAGONS)){assert.equal(dragon.ranks.length,100);assert.equal(new Set(dragon.ranks).size,100);assert.ok(dragon.adventures.endsWith('-aventures.png'));}
for(const score of [312,4200,4500,12345,29700]){const old=cleanProfile({name:'Test',score,difficulty:'hard',activities:{sounds:false}});assert.equal(old.score,score);assert.equal(old.difficulty,'hard');assert.equal(old.activities.sounds,false);assert.equal(rankFor(old.score),Math.min(100,Math.floor(score/300)+1));}
let run={score:0,streak:0};for(let n=0;n<2546;n++)run=award(run.score,run.streak,0);assert.equal(run.score,29700);
assert.throws(()=>dragonAppearance(101),RangeError);
const source=fs.readFileSync(new URL('./app.js',import.meta.url),'utf8');assert.ok(!source.includes('el.dataset.rank=rank'),'Les portraits ne doivent pas utiliser le sélecteur des compteurs de rang');
const manifest=JSON.parse(fs.readFileSync(new URL('./manifest.webmanifest',import.meta.url),'utf8'));
for(const size of [192,512]){const icon=manifest.icons.find(i=>i.sizes===size+'x'+size);assert.ok(icon.src.includes('dragon-app'));const png=fs.readFileSync(new URL('./'+icon.src,import.meta.url));assert.equal(png.readUInt32BE(16),size);assert.equal(png.readUInt32BE(20),size);}
console.log('100 évolutions : seuils de 300, 100 états visuels distincts par dragon, 5 équipements, anciennes sauvegardes et dernier palier vérifiés.');
