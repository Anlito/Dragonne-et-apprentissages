import assert from 'node:assert/strict';
import {cleanActivities} from './activities.mjs';
import {loadProfiles} from './profiles.mjs';
const legacy={score:312,difficulty:'medium',sound:false,motion:false};
const migrated=loadProfiles(null,legacy);
assert.deepEqual(migrated.profiles.dragonne,{...legacy,activities:cleanActivities()});assert.deepEqual(migrated.profiles.dragon,{score:0,difficulty:'easy',sound:true,motion:true,activities:cleanActivities()});
migrated.activeId='dragon';migrated.profiles.dragon.score=975;migrated.profiles.dragon.difficulty='hard';
assert.equal(migrated.profiles.dragonne.score,312);assert.equal(migrated.profiles.dragonne.difficulty,'medium');
const restored=loadProfiles(JSON.parse(JSON.stringify(migrated)),{score:9999});assert.equal(restored.activeId,'dragon');assert.equal(restored.profiles.dragon.score,975);assert.equal(restored.profiles.dragon.difficulty,'hard');assert.equal(restored.profiles.dragonne.score,312);
restored.profiles.dragon.score=0;assert.equal(restored.profiles.dragonne.score,312);
assert.equal(loadProfiles({...migrated,activeId:'toString'}).activeId,'dragonne');
assert.equal(loadProfiles(null,{score:115,size:26}).profiles.dragonne.difficulty,'hard');
assert.deepEqual(loadProfiles({version:1,profiles:{dragon:{score:-20,difficulty:'bad'}}}).profiles.dragon,{score:0,difficulty:'easy',sound:true,motion:true,activities:cleanActivities()});
assert.notEqual(loadProfiles(null).profiles.dragonne,loadProfiles(null).profiles.dragon);
console.log('Profils : migration, points et difficultés indépendants, restauration et reset ciblé vérifiés.');

// Migrer les sauvegardes existantes conserve tous les jeux et leurs scores.
assert.ok(Object.values(migrated.profiles.dragonne.activities).every(Boolean));
migrated.profiles.dragon.activities.letters=false;
assert.equal(migrated.profiles.dragonne.activities.letters,true);
const hidden=loadProfiles(JSON.parse(JSON.stringify(migrated)));
assert.equal(hidden.profiles.dragon.activities.letters,false);
assert.equal(hidden.profiles.dragonne.activities.letters,true);
assert.equal(hidden.profiles.dragon.score,975);
assert.deepEqual(cleanActivities({letters:false,numbers:0,counting:'false',unknown:false}),{...cleanActivities(),letters:false});
assert.ok(Object.values(cleanActivities(null)).every(Boolean));
assert.ok(Object.values(cleanActivities(Object.fromEntries(Object.keys(cleanActivities()).map(id=>[id,false])))).every(v=>v===false));
console.log('Activités : migration, choix indépendants, restauration et aucun jeu visible vérifiés.');
