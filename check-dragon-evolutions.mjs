import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {MAX_RANK,RANK_THRESHOLDS,rankFor,award} from './engine.mjs';
import {DRAGONS,cleanProfile} from './profiles.mjs';
import {dragonAppearance,equipmentMarkup,EQUIPMENT_NAMES} from './dragon-evolutions.mjs';
assert.equal(MAX_RANK,100);assert.equal(RANK_THRESHOLDS.at(-1),29700);assert.equal(EQUIPMENT_NAMES.length,9);
for(const id of Object.keys(DRAGONS)){
 const signatures=new Set();let previous=null;
 for(let rank=1;rank<=100;rank++){
  assert.equal(rankFor((rank-1)*300),rank);if(rank>1)assert.equal(rankFor((rank-1)*300-1),rank-1);
  const look=dragonAppearance(rank);assert.equal(look.cell,rank-1);assert.equal(equipmentMarkup(look),'');
  const filename=new URL('./assets/evolutions/'+id+'/stage-'+rank+'.png',import.meta.url);assert(existsSync(filename),'Image absente '+id+' '+rank);
  const data=readFileSync(filename);assert.equal(data.subarray(1,4).toString(),'PNG');assert(data.readUInt32BE(16)>100);assert(data.readUInt32BE(20)>100);
  signatures.add(createHash('sha256').update(data).digest('hex'));
  if(rank>10&&previous){assert(look.equipment.every((tier,i)=>tier>=previous.equipment[i]),'Équipement perdu');const changed=look.equipment.filter((tier,i)=>tier!==previous.equipment[i]).length;if(look.step===0)assert.equal(changed,0);else assert.equal(changed,1);}
  previous=look;
 }
 assert.equal(signatures.size,100,'Illustrations dupliquées : '+id);assert.equal(DRAGONS[id].ranks.length,100);assert.equal(new Set(DRAGONS[id].ranks).size,100);
}
assert.equal(dragonAppearance(1).bodyStage,0);assert.equal(dragonAppearance(10).bodyStage,9);assert.equal(dragonAppearance(11).bodyStage,10);assert.equal(dragonAppearance(100).bodyStage,18);assert(dragonAppearance(100).equipment.every(t=>t===9));
assert.equal(rankFor(1000000),100);assert.throws(()=>dragonAppearance(0),RangeError);assert.throws(()=>dragonAppearance(101),RangeError);
for(const score of [0,312,4200,4500,12345,29700]){const profile=cleanProfile({name:'Test',score,difficulty:'hard',activities:{sounds:false}});assert.equal(profile.score,score);assert.equal(profile.difficulty,'hard');assert.equal(profile.activities.sounds,false);}
let run={score:0,streak:0};for(let n=0;n<2546;n++)run=award(run.score,run.streak,0);assert.equal(run.score,29700);
const gallery=readFileSync(new URL('./evolution-gallery.mjs',import.meta.url),'utf8');assert(!gallery.includes('localStorage'));assert(!gallery.includes('save('));
const source=readFileSync(new URL('./app.js',import.meta.url),'utf8');assert(!source.includes('el.dataset.rank=rank'));assert(source.includes('stage-'));assert(!source.includes('equipmentMarkup(look.grade)'));
console.log('400 illustrations distinctes, éclosion, 100 paliers, équipement conservé et amélioré pièce par pièce, seuils inchangés, album sans écriture et sauvegardes préservées : OK.');
