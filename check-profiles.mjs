import assert from 'node:assert/strict';
import {cleanActivities} from './activities.mjs';
import {PROFILES_KEY,DRAGONS,DRAGON_IDS,loadProfiles,createChild,updateChild,cleanName} from './profiles.mjs';
assert.equal(PROFILES_KEY,'dragonne-profiles-v2');
const fresh=loadProfiles(null);assert.deepEqual(fresh.order,[]);assert.equal(fresh.activeId,null);assert.equal(Object.keys(fresh.profiles).length,0);
const legacy={score:312,difficulty:'medium',sound:false,motion:false,activities:{letters:false}};
const single=loadProfiles(null,legacy);assert.deepEqual(single.order,['dragonne']);assert.equal(single.profiles.dragonne.score,312);assert.equal(single.profiles.dragonne.activities.letters,false);assert.equal(single.profiles.dragonne.needsName,true);
const previous={version:1,activeId:'dragon',profiles:{dragonne:legacy,dragon:{score:975,difficulty:'hard',sound:true,motion:true,activities:{memory:false,'build-word':false}}}};
const migrated=loadProfiles(previous);assert.deepEqual(migrated.order,['dragonne','dragon']);assert.equal(migrated.activeId,'dragon');assert.equal(migrated.profiles.dragonne.score,312);assert.equal(migrated.profiles.dragon.score,975);assert.equal(migrated.profiles.dragon.activities.memory,false);assert.equal(migrated.profiles.dragonne.sound,false);assert.equal(migrated.profiles.dragon.dragonId,'dragon');
const oldSettings=JSON.stringify({score:migrated.profiles.dragon.score,difficulty:migrated.profiles.dragon.difficulty,activities:migrated.profiles.dragon.activities});
updateChild(migrated,'dragon',{name:'  Émile  ',dragonId:'braise'});assert.equal(migrated.profiles.dragon.name,'Émile');assert.equal(migrated.profiles.dragon.needsName,false);assert.equal(JSON.stringify({score:migrated.profiles.dragon.score,difficulty:migrated.profiles.dragon.difficulty,activities:migrated.profiles.dragon.activities}),oldSettings);
const alice=createChild(migrated,{name:'Alice',dragonId:'soleil'},'child-alice');assert.equal(migrated.profiles[alice].score,0);assert.equal(migrated.profiles[alice].difficulty,'easy');assert.ok(Object.values(migrated.profiles[alice].activities).every(Boolean));
const max=createChild(migrated,{name:'Max',dragonId:'soleil'},'child-max');assert.equal(migrated.profiles[max].dragonId,'soleil');migrated.profiles[alice].score=612;migrated.profiles[alice].difficulty='hard';migrated.profiles[alice].activities.sounds=false;assert.equal(migrated.profiles[max].score,0);assert.equal(migrated.profiles[max].activities.sounds,true);
migrated.activeId=alice;const restored=loadProfiles(JSON.parse(JSON.stringify(migrated)),{score:9999});assert.equal(restored.activeId,alice);assert.equal(restored.profiles[alice].score,612);assert.equal(restored.profiles[alice].activities.sounds,false);assert.deepEqual(restored.order,migrated.order);
updateChild(restored,alice,{name:'Alice-Marie',dragonId:'dragonne'});assert.equal(restored.profiles[alice].score,612);assert.equal(restored.profiles[alice].difficulty,'hard');assert.equal(restored.profiles[max].name,'Max');
for(const name of ['', '   ','a'.repeat(25),' max '])assert.throws(()=>createChild(restored,{name,dragonId:'dragon'}));
assert.throws(()=>createChild(restored,{name:'Zoé',dragonId:'toString'}));assert.throws(()=>createChild(restored,{name:'Zoé',dragonId:'dragon'},max));
assert.throws(()=>updateChild(restored,'missing',{name:'Zoé',dragonId:'soleil'}));
assert.equal(cleanName('  Anna   Rose  '),'Anna Rose');assert.equal(cleanName('Léa\u0000'),'Léa');assert.equal(cleanName('<img src=x>'),'<img src=x>');
assert.equal(loadProfiles({...migrated,activeId:'__proto__'}).activeId,'dragonne');
assert.equal(loadProfiles({version:2,profiles:{},order:[],activeId:null},legacy).order.length,0);
assert.deepEqual(loadProfiles({version:2,order:['missing','child-max','child-max'],profiles:{'child-max':restored.profiles[max]}}).order,['child-max']);
assert.equal(DRAGON_IDS.length,4);for(const d of Object.values(DRAGONS)){assert.equal(d.ranks.length,15);assert.ok(d.sprite.endsWith('.png'));}
assert.deepEqual(cleanActivities({letters:false,numbers:0,counting:'false',unknown:false}),{...cleanActivities(),letters:false});
assert.ok(Object.values(cleanActivities(Object.fromEntries(Object.keys(cleanActivities()).map(id=>[id,false])))).every(v=>v===false));
console.log('Profils enfants : création, prénoms, quatre dragons, choix identiques autorisés, migration sans perte, édition sans remise à zéro, isolation et restauration vérifiés.');

restored.profiles[alice].activityLevels.sounds='easy';restored.profiles[alice].activityLevels.arithmetic='hard';const levels=loadProfiles(JSON.parse(JSON.stringify(restored)));assert.equal(levels.profiles[alice].activityLevels.arithmetic,'hard');assert.equal(levels.profiles[alice].activityLevels.sounds,'easy');assert.equal(levels.profiles[max].activityLevels.arithmetic,undefined);assert.equal(levels.profiles[alice].difficulty,'hard');console.log('Difficultés par activité : sauvegarde et indépendance des enfants vérifiées.');
