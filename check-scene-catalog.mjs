import assert from 'node:assert/strict';
import {SCENE_CATALOG,SCENE_WORLDS,chooseSceneTheme,sceneBackdrop,heroMarkup,objectIcon} from './scene-catalog.mjs';
import {SCENE_SLOTS,SCENE_COLORS,differenceQuestion,observationQuestion,sceneObjectMarkup,observationChoiceMarkup,observationChoiceLabel} from './scene-games.mjs';
assert.equal(SCENE_CATALOG.length,36);
assert.equal(new Set(SCENE_CATALOG.map(t=>t.id)).size,36);
assert.equal(Object.keys(SCENE_WORLDS).length,9);
let seed=48;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/2**32);
const history=[];for(let i=0;i<36;i++){const next=chooseSceneTheme(history,random);assert(!history.includes(next));history.push(next);}assert.notEqual(chooseSceneTheme(history,random),history.at(-1));
const compositions=new Set();
for(const theme of SCENE_CATALOG){
 const world=SCENE_WORLDS[theme.world];assert.equal(new Set(world.subjects).size,6);assert(sceneBackdrop(theme.id).includes('<svg'));
 assert.equal(new Set(SCENE_COLORS.map(c=>heroMarkup(theme.hero,c.fill))).size,4);
 for(const subject of world.subjects)assert(objectIcon(subject).includes('<svg'));
 const scene=differenceQuestion('hard',null,random,theme.id).original;
 compositions.add(sceneBackdrop(theme.id)+SCENE_SLOTS.map(slot=>sceneObjectMarkup(slot.id,scene[slot.id],scene)).join(''));
 for(const level of ['easy','medium','hard'])for(let i=0;i<40;i++){
  const q=differenceQuestion(level,null,random,theme.id);assert.equal(q.original.theme,theme.id);assert.equal(q.changed.theme,theme.id);
  const visible=SCENE_SLOTS.slice(0,q.original.details),changes=visible.filter(slot=>sceneObjectMarkup(slot.id,q.original[slot.id],q.original)!==sceneObjectMarkup(slot.id,q.changed[slot.id],q.changed)).map(slot=>slot.id);
  assert.deepEqual(changes.sort(),[...q.targets].sort(),theme.id+' must contain exactly the announced visible differences');
  const o=observationQuestion(level,null,random,theme.id);assert.equal(o.scene.theme,theme.id);assert(!o.prompt.includes('jardin'));assert(!o.prompt.includes('cerf-volant'));
  assert.equal(new Set(o.choices.map(v=>observationChoiceMarkup(o,v))).size,o.choices.length);
  for(const v of o.choices)assert(observationChoiceLabel(o,v));
 }
 // The six central-object answers must be distinguishable even when other props repeat.
 const q={scene,type:'animal'};
 assert.equal(new Set([0,1,2,3,4,5].map(v=>observationChoiceMarkup(q,v))).size,6);
}
assert.equal(compositions.size,36);
console.log('36 compositions / 9 univers : 4 320 paires avec différences réellement visibles, questions et choix cohérents, 36 décors avant répétition : OK.');
