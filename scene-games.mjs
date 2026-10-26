import {shadowMarkup,shapeMarkup} from './preschool.mjs';
export const SCENE_IDS=['differences','observation'];
export const SCENE_LEVELS={easy:{differences:2,choices:2,details:6},medium:{differences:3,choices:3,details:8},hard:{differences:5,choices:4,details:10}};
export const SCENE_COLORS=[{id:'red',name:'rouge',fill:'#cc786e'},{id:'blue',name:'bleu',fill:'#7eaac4'},{id:'green',name:'vert',fill:'#96b778'},{id:'yellow',name:'jaune',fill:'#e5bf61'}];
export const SCENE_ANIMALS=['Le chat','Le chien','La vache','Le canard','Le mouton','Le cheval'];
export const SCENE_SLOTS=[
 {id:'sun',x:78,y:49,w:70,h:70},
 {id:'house',x:125,y:178,w:145,h:160},
 {id:'tree',x:376,y:154,w:135,h:200},
 {id:'animal',x:257,y:245,w:120,h:110},
 {id:'flowers',x:500,y:260,w:140,h:88},
 {id:'ball',x:52,y:283,w:60,h:60},
 {id:'cloud',x:494,y:51,w:130,h:70},
 {id:'kite',x:247,y:89,w:90,h:130},
 {id:'bird',x:455,y:143,w:75,h:60},
 {id:'mushroom',x:379,y:291,w:65,h:58}
];
const shuffle=(values,random)=>{const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const integer=(max,random)=>Math.floor(random()*max);
export function gardenScene(level='easy',random=Math.random){const settings=SCENE_LEVELS[level]||SCENE_LEVELS.easy;return {sun:integer(2,random),house:integer(4,random),tree:integer(2,random),animal:integer(6,random),flowers:1+integer(4,random),ball:integer(4,random),cloud:integer(2,random),kite:integer(4,random),bird:integer(2,random),mushroom:integer(2,random),details:settings.details,land:integer(3,random)};}
const DOMAIN={sun:2,house:4,tree:2,animal:6,flowers:4,ball:4,cloud:2,kite:4,bird:2,mushroom:2};
export function differenceQuestion(level='easy',previous=null,random=Math.random){
 const settings=SCENE_LEVELS[level]||SCENE_LEVELS.easy;let original,changed,targets,id;
 for(let attempt=0;attempt<12;attempt++){
  original=gardenScene(level,random);changed={...original};targets=shuffle(SCENE_SLOTS.slice(0,settings.details).map(s=>s.id),random).slice(0,settings.differences);
  for(const key of targets){const offset=1+integer(DOMAIN[key]-1,random);changed[key]=key==='flowers'?1+(original[key]-1+offset)%DOMAIN[key]:(original[key]+offset)%DOMAIN[key];}
  id=JSON.stringify([original,changed]);if(id!==previous)break;
 }
 return {kind:'differences',id,original,changed,targets,found:[],prompt:'Compare les deux images. Touche les éléments qui sont différents.',choices:[]};
}
export function findDifference(question,id){if(question.found.includes(id))return 'ignored';if(!question.targets.includes(id))return 'wrong';question.found.push(id);return question.found.length===question.targets.length?'complete':'found';}
export function observationQuestion(level='easy',previous=null,random=Math.random){
 const settings=SCENE_LEVELS[level]||SCENE_LEVELS.easy;let scene,type,id;
 for(let attempt=0;attempt<12;attempt++){scene=gardenScene(level,random);type=['animal','house','flowers','ball',...(level==='easy'?[]:['kite'])][integer(level==='easy'?4:5,random)];id=JSON.stringify([scene,type]);if(id!==previous)break;}
 const target=scene[type],domain=type==='animal'?[0,1,2,3,4,5]:type==='flowers'?[1,2,3,4]:[0,1,2,3];
 const choices=shuffle([target,...shuffle(domain.filter(v=>v!==target),random).slice(0,settings.choices-1)],random);
 const prompt={animal:'Quel animal as-tu vu dans le jardin ?',house:'De quelle couleur était le toit de la maison ?',flowers:'Combien de fleurs as-tu vues ?',ball:'De quelle couleur était le ballon ?',kite:'Quelle était la forme du cerf-volant ?'}[type];
 return {kind:'observation',id,scene,type,target,choices,prompt,phase:'ready'};
}
const svg=content=>'<svg viewBox="0 0 100 100" aria-hidden="true">'+content+'</svg>';
export function sceneObjectMarkup(id,value){
 if(id==='animal')return '<span class="garden-animal" style="background-position:'+(value%3*50)+'% '+(Math.floor(value/3)*100)+'%" aria-hidden="true"></span>';
 if(id==='house')return svg('<path d="M20 43H80V92H20Z" fill="#e3cd96"/><path d="M7 46 50 9 93 46Z" fill="'+SCENE_COLORS[value].fill+'"/><path d="M32 59H45V73H32ZM59 65H73V92H59Z" fill="#a5b7c3"/><path d="M30 57H47V75H30ZM57 63H75V92H57Z" fill="none" stroke="#8b755e" stroke-width="2"/>');
 if(id==='tree')return value===0?shadowMarkup('tree'):svg('<path d="M45 46H56V95H45Z" fill="#a37c56"/><circle cx="32" cy="36" r="23" fill="#8eaa72"/><circle cx="67" cy="35" r="25" fill="#a4bb84"/><circle cx="49" cy="19" r="24" fill="#b1c48c"/>');
 if(id==='sun')return svg(value===0?'<g fill="#e5bf61"><circle cx="50" cy="50" r="26"/><path d="M47 2h6v15h-6ZM47 83h6v15h-6ZM2 47h15v6H2ZM83 47h15v6H83ZM13 17l4-4 11 11-4 4ZM72 76l4-4 11 11-4 4ZM13 83l11-11 4 4-11 11ZM72 24l11-11 4 4-11 11Z"/></g>':'<path d="M66 8A42 42 0 1 0 90 71A34 34 0 0 1 66 8Z" fill="#c4b7d8"/>');
 if(id==='flowers')return '<span class="garden-flowers">'+Array.from({length:value},(_,i)=>'<span style="--flower-offset:'+i+'">'+shadowMarkup('flower')+'</span>').join('')+'</span>';
 if(id==='ball')return svg('<circle cx="50" cy="50" r="39" fill="'+SCENE_COLORS[value].fill+'"/><path d="M18 28Q51 52 82 28M18 72Q51 48 82 72M50 11V89" fill="none" stroke="#fff4d7" stroke-width="5"/>');
 if(id==='cloud')return svg(value===0?'<path d="M15 68a20 20 0 0 1 0-40a24 24 0 0 1 42-9a25 25 0 0 1 29 33a17 17 0 0 1-11 30H22Z" fill="#fff5df"/>':'<path d="M15 58a18 18 0 0 1 4-35a24 24 0 0 1 43-3a25 25 0 0 1 25 38Z" fill="#b3c2ce"/><path d="m26 70-6 17m31-17-6 17m31-17-6 17" stroke="#7b9db5" stroke-width="6"/>');
 if(id==='kite')return svg('<path d="M50 57Q33 72 53 94" fill="none" stroke="#9d866e" stroke-width="2"/>')+ '<span class="garden-kite-shape">'+shapeMarkup(['diamond','triangle','circle','square'][value],'#b6a1c9')+'</span>';
 if(id==='bird')return svg(value===0?'<path d="M10 50Q30 20 50 50Q70 20 90 50" fill="none" stroke="#a37c56" stroke-width="8"/>':'<path d="M5 35Q17 17 30 35Q43 17 55 35M45 73Q58 55 70 73Q83 55 95 73" fill="none" stroke="#a37c56" stroke-width="7"/>');
 if(id==='mushroom')return svg('<path d="M39 41H61L68 93H32Z" fill="#ecd7b3"/><path d="M5 48Q50-20 95 48Z" fill="'+(value?'#b49ac2':'#cc786e')+'"/><circle cx="30" cy="31" r="7" fill="#fff1d3"/><circle cx="62" cy="27" r="7" fill="#fff1d3"/>');
 return '';
}
export function observationChoiceMarkup(question,value){return question.type==='kite'?shapeMarkup(['diamond','triangle','circle','square'][value],'#b6a1c9'):question.type==='house'||question.type==='ball'?svg('<circle cx="50" cy="50" r="36" fill="'+SCENE_COLORS[value].fill+'"/>'):sceneObjectMarkup(question.type,value);}
export function observationChoiceLabel(question,value){return question.type==='animal'?SCENE_ANIMALS[value]:question.type==='flowers'?value+' fleurs':question.type==='kite'?['Un losange','Un triangle','Un rond','Un carré'][value]:SCENE_COLORS[value].name;}
export function createObservationTimer({now=()=>performance.now(),schedule=setTimeout,cancel=clearTimeout,onTick=()=>{},onEnd=()=>{}}={}){
 let handle=null,active=false,deadline=0;
 function stop(){active=false;if(handle!==null)cancel(handle);handle=null;}
 function tick(){if(!active)return;const remaining=Math.max(0,deadline-now());onTick(Math.ceil(remaining/1000),remaining/5000);if(!active)return;if(remaining===0){active=false;handle=null;onEnd();return;}handle=schedule(tick,Math.min(100,remaining));}
 return {start(){stop();active=true;deadline=now()+5000;tick();},stop};
}
