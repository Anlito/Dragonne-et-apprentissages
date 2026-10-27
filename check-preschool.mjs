import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {PRESCHOOL_IDS,SHAPES,SOUND_ANIMALS,SHADOW_OBJECTS,SHADOW_DISTRACTORS,preschoolQuestion,preschoolChoices,shapeMarkup,shapeChoices,shapeLabel,shadowMarkup,onShadowTarget} from './preschool.mjs';
import {ACTIVITIES,cleanActivities} from './activities.mjs';
import {cleanChallenge,challengePlan} from './challenge.mjs';
import {cleanProfile} from './profiles.mjs';
import vm from 'node:vm';
import {award,rankFor} from './engine.mjs';
assert.equal(SHAPES.length,7);assert.equal(SOUND_ANIMALS.length,100);assert.equal(SHADOW_OBJECTS.length,20);
let seed=123;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/2**32);
for(const kind of PRESCHOOL_IDS){
 const seen=new Set();let previous=null;
 for(const level of ['easy','medium','hard'])for(let i=0;i<300;i++){
  const q=preschoolQuestion(kind,level,previous,random);assert.notEqual(q.target,previous);assert(q.choices.includes(q.target));assert.equal(new Set(q.choices).size,q.choices.length);assert.equal(q.choices.length,kind==='shapes'?shapeChoices(level):preschoolChoices(level));seen.add(q.target);previous=q.id;
 }
 if(kind==='shapes')assert(seen.size>=48);else assert.equal(seen.size,kind==='shadows'?20:kind==='animal-sounds'?100:kind==='colors'?13:6);assert(cleanActivities({})[kind]);assert(ACTIVITIES.some(a=>a.id===kind));
 const profile=cleanProfile({activityLevels:{[kind]:'easy'},activities:{[kind]:false}});assert.equal(profile.activityLevels[kind],'easy');assert.equal(profile.activities[kind],false);
 const plan=challengePlan(cleanChallenge({}),cleanActivities({}),random);assert.equal(plan.length,20);assert(plan.includes(kind));
}
for(const shape of SHAPES)assert(shapeMarkup(shape.id).includes(shape.path));
for(const level of ['easy','medium','hard'])for(let i=0;i<500;i++){
 const q=preschoolQuestion('shapes',level,null,random),[shape,color,size]=q.target.split(':');
 const matches=q.choices.filter(id=>{const [s,c,z]=id.split(':');return s===shape&&(level==='easy'||c===color)&&(level!=='hard'||z===size);});
 assert.deepEqual(matches,[q.target],'Une seule réponse respecte la consigne');
 assert.equal(q.prompt,'Trouve '+shapeLabel(q.target,level)+'.');
 if(level!=='easy')assert(q.choices.some(id=>{const [s,c]=id.split(':');return s===shape&&c!==color;}),'Même forme, autre couleur');
 if(level==='hard')assert(q.choices.includes(shape+':'+color+':'+(size==='small'?'large':'small')),'Même forme et couleur, autre taille');
 assert(shapeMarkup(q.target).includes(size==='small'?'scale(0.53)':'scale(0.95)'));
}
assert.equal(shapeLabel('star:blue:small'),'la petite étoile bleue');
assert.equal(shapeLabel('oval:purple:large'),'le grand ovale violet');
for(const object of SHADOW_OBJECTS){
 assert.equal(new Set(SHADOW_DISTRACTORS[object.id]).size,3);assert(SHADOW_DISTRACTORS[object.id].every(id=>id!==object.id&&SHADOW_OBJECTS.some(item=>item.id===id)));
 const original=shadowMarkup(object.id),silhouette=shadowMarkup(object.id,true);
 for(const [,path] of object.parts){assert(original.includes('d="'+path+'"'));assert(silhouette.includes('d="'+path+'"'));}assert(!/fill="(?!#302936)/.test(silhouette));
}
for(const animal of SOUND_ANIMALS){assert(existsSync(animal.audio));const data=readFileSync(animal.audio);assert(data.length>1000);if(animal.audio.endsWith('.ogg'))assert.equal(data.subarray(0,4).toString(),'OggS');}
assert.equal(new Set(SOUND_ANIMALS.map(a=>a.audio)).size,100);
for(const animal of SOUND_ANIMALS){assert(existsSync(animal.sprite));assert(animal.tile>=0&&animal.tile<(animal.cols||3)*(animal.rows||2));}
let history=[];for(let round=0;round<2;round++){for(let i=0;i<100;i++){const q=preschoolQuestion('animal-sounds','hard',history,random);assert(!history.includes(q.target));history.push(q.target);}assert.equal(new Set(history).size,100);history=[];}
const rect={left:20,right:120,top:30,bottom:130};assert(onShadowTarget({x:60,y:50},rect));assert(!onShadowTarget({x:15,y:50},rect));assert(!onShadowTarget({x:60,y:140},rect));
const source=readFileSync(new URL('./app.js',import.meta.url),'utf8');
assert(!source.includes('class="shadow-destination"'),'Ne pas afficher la solution à côté de l’objet');
for(const level of ['easy','medium','hard'])for(let i=0;i<200;i++){const q=preschoolQuestion('shadows',level,null,random);assert(q.choices.filter(id=>id!==q.target).every(id=>SHADOW_DISTRACTORS[q.target].includes(id)));if(q.target==='boat'&&level==='hard')assert.deepEqual([...q.choices].sort(),['boat','boat-single','mountain','parasol']);}
const functions=['choosePreschool','readingError','finishReading'].map(name=>source.match(new RegExp('function '+name+'\\([^)]*\\)\\{[\\s\\S]*?\\n\\}'))?.[0]||source.match(new RegExp('function '+name+'\\([^)]*\\)\\{[^\\n]+'))?.[0]).join('\n');
for(const activeActivity of PRESCHOOL_IDS)for(const errors of [0,1,2]){
 const button=()=>({disabled:false,classList:{add(){}},setAttribute(){}}),right=button(),wrong=[button(),button()],feedback={textContent:'',classList:{add(){}},setAttribute(){}};
 let saves=0,nexts=0,transition=null;
 const context={activeActivity,current:{target:'right'},state:{score:100,motion:false},locked:false,mistakes:0,streak:2,completed:0,selectedShadow:null,award,rankFor,isMath:()=>false,stopAnimalCall(){},cancelShadowDrag(){},$:()=>feedback,$$:()=>[right,...wrong],render(){},dots(){},save(){saves++;},say(){},chime(){},nextReading(){},nextPreschool(){nexts++;},celebrateQuestion(result,evolves,continuation){transition=continuation;}};
 vm.createContext(context);vm.runInContext(functions,context);
 for(let i=0;i<errors;i++){context.wrong=wrong[i];vm.runInContext("choosePreschool('wrong',wrong)",context);assert(wrong[i].disabled);}
 context.right=right;vm.runInContext("choosePreschool('right',right);choosePreschool('right',right)",context);
 assert.equal(context.state.score,100+([15,5,1][errors]));assert.equal(saves,1);assert(right.disabled);assert.equal(context.completed,1);transition();assert.equal(nexts,1);
}
console.log('Petits jeux : 3 600 questions, choix valides, sans répétition immédiate, silhouettes identiques, audio local, profils et défi OK.');
