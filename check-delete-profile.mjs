import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
import {createChild,deleteChild,loadProfiles,cleanProfile} from './profiles.mjs';
const accounts=loadProfiles(null),a=createChild(accounts,{name:'Alice',dragonId:'dragonne'},'child-a'),b=createChild(accounts,{name:'Bob',dragonId:'braise'},'child-b');accounts.activeId=a;accounts.profiles[b].score=999;accounts.profiles[b].fluency.records=[{text:'Un mot',best:2,last:1,attempts:2}];
assert.equal(deleteChild(accounts,a),b);assert.equal(accounts.profiles[a],undefined);assert.equal(accounts.profiles[b].score,999);assert.equal(accounts.profiles[b].fluency.records[0].best,2);assert.deepEqual(accounts.order,[b]);
assert.throws(()=>deleteChild(accounts,a));assert.equal(deleteChild(accounts,b),null);assert.equal(accounts.order.length,0);assert.equal(Object.keys(accounts.profiles).length,0);
const restored=loadProfiles(JSON.parse(JSON.stringify(accounts)),{score:5000});assert.equal(restored.order.length,0);assert.equal(restored.activeId,null);
// Exécuter la vraie confirmation : échec de stockage = aucun profil effacé.
const source=fs.readFileSync(new URL('./app.js',import.meta.url),'utf8'),handler=source.match(/\$\('#delete-child-confirm'\)\.onclick=\(\)=>\{([\s\S]*?)\n\};/)[1];
for(const storageFails of [false,true]){
 const original=loadProfiles(null),id=createChild(original,{name:'Test',dragonId:'dragonne'},'child-test');original.activeId=id;let persisted=null,home=0,chooser=0,error='';
 const context={IS_PREVIEW:false,childToDelete:id,activeId:id,accounts:original,state:original.profiles[id],profileChosen:true,memoryBoard:{},loadProfiles,deleteChild,cleanProfile,PROFILES_KEY:'profiles',localStorage:{setItem:(key,value)=>{if(storageFails)throw Error('Quota');persisted=JSON.parse(value);}},returnHome:()=>home++,resetDeleteChild:()=>{},render:()=>{},showProfileChooser:()=>chooser++,$:s=>s==='#delete-child-error'?{set textContent(v){error=v;}}:{open:false}};
 vm.createContext(context);vm.runInContext('(function(){'+handler+'})()',context);
 if(storageFails){assert.ok(original.profiles[id]);assert.equal(home,0);assert.ok(error.includes('conservé'));}else{assert.equal(original.order.length,0);assert.equal(context.activeId,null);assert.equal(persisted.version,2);assert.equal(Object.keys(persisted.profiles).length,0);assert.equal(chooser,1);}
}
console.log('Suppression : enfant ciblé, autres données intactes, dernier profil, non-résurrection et échec de stockage vérifiés.');
