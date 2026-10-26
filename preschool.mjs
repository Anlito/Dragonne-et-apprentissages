export const PRESCHOOL_IDS=['shapes','animal-sounds','shadows'];
export const PRESCHOOL_META={shapes:{label:'Les formes',title:'Écoute et trouve la forme',instruction:'Touche la forme que tu entends.'},'animal-sounds':{label:'Les cris des animaux',title:'Qui fait ce bruit ?',instruction:'Écoute le cri, puis touche le bon animal.'},shadows:{label:'Le puzzle des ombres',title:'Retrouve mon ombre',instruction:'Glisse la bonne ombre sur l’objet. Tu peux aussi toucher l’ombre, puis l’objet.'}};
export const preschoolChoices=level=>({easy:2,medium:3,hard:4})[level]||2;
export const SHAPES=[
 {id:'square',name:'le carré',path:'M20 20H80V80H20Z'},
 {id:'circle',name:'le rond',path:'M50 16a34 34 0 1 0 0 68a34 34 0 1 0 0-68'},
 {id:'star',name:'l’étoile',path:'M50 8 62 35 92 38 70 59 76 90 50 75 24 90 30 59 8 38 38 35Z'},
 {id:'triangle',name:'le triangle',path:'M50 12 90 84H10Z'},
 {id:'oval',name:'l’ovale',path:'M50 25a40 25 0 1 0 0 50a40 25 0 1 0 0-50'},
 {id:'diamond',name:'le losange',path:'M50 7 81 50 50 93 19 50Z'}
];
export const SOUND_ANIMALS=[['cat','Le chat'],['dog','Le chien'],['cow','La vache'],['duck','Le canard'],['sheep','Le mouton'],['horse','Le cheval']].map(([id,name],tile)=>({id,name,tile,audio:'assets/audio/'+id+(id==='duck'?'.mp3':'.ogg')}));
// Every coloured piece is reused unchanged in the silhouette, including its outline.
export const SHADOW_OBJECTS=[
 {id:'boat',name:'Le bateau',parts:[['#af8056','M12 70H88L76 88H26Z'],['#a6b984','M47 16V65H13Z'],['#b7a4cd','M54 24 83 65H54Z'],['#795e48','M47 12H53V72H47Z'],['#e3ba65','M53 12 75 19 53 27Z']]},
 {id:'tree',name:'Le sapin',parts:[['#a67c55','M43 65H57V91H43Z'],['#8da575','M50 8 75 40H65L85 65H71L91 81H9L29 65H15L35 40H25Z']]},
 {id:'house',name:'La maison',parts:[['#e4c37f','M23 42H77V88H23Z'],['#c9897d','M10 46 50 9 90 46Z'],['#a5b9bf','M32 55H44V68H32Z'],['#a58ab5','M55 59H70V88H55Z']]},
 {id:'umbrella',name:'Le parapluie',parts:[['#967b66','M47 41H53V79Q53 94 38 92Q25 89 30 77L36 79Q33 86 41 86Q47 86 47 79Z'],['#a995c3','M7 48Q11 12 50 12Q89 12 93 48Q80 37 65 48Q50 37 35 48Q20 37 7 48Z']]},
 {id:'fish',name:'Le poisson',parts:[['#a5bbbf','M67 48 93 24V77L67 55Z'],['#e4bb66','M8 50Q32 10 75 50Q32 90 8 50Z'],['#d79570','M37 30 50 17 60 36Z'],['#63524a','M24 47h4v5h-4Z']]},
 {id:'butterfly',name:'Le papillon',parts:[['#b8a3c8','M46 43Q6 0 10 42Q12 59 36 55Q5 83 30 89Q45 92 49 63Z'],['#d8af79','M54 43Q94 0 90 42Q88 59 64 55Q95 83 70 89Q55 92 51 63Z'],['#807358','M47 34H53V77H47ZM48 38 39 18 43 16 51 34 57 16 61 18 52 38Z']]},
 {id:'flower',name:'La fleur',parts:[['#8da575','M47 40H53V92H47ZM48 77Q15 76 18 58Q44 53 48 77M52 68Q83 70 83 49Q59 47 52 68'],['#c496af','M50 8C68 8 68 26 58 32C82 18 92 48 68 50C87 68 57 82 50 59C43 82 13 68 32 50C8 48 18 18 42 32C32 26 32 8 50 8Z'],['#e4bb66','M50 29a15 15 0 1 0 0 30a15 15 0 1 0 0-30']]},
 {id:'rocket',name:'La fusée',parts:[['#e4bb66','M42 69 37 94 50 85 63 94 58 69Z'],['#b89ac0','M35 49 19 76H39ZM65 49 81 76H61Z'],['#c5d0c1','M50 7Q72 29 65 74H35Q28 29 50 7Z'],['#bd8275','M50 7Q61 18 65 32H35Q39 18 50 7Z'],['#8ba9b2','M50 39a10 10 0 1 0 0 20a10 10 0 1 0 0-20']]},
 {id:'car',name:'La voiture',parts:[['#b2bb8e','M13 48H23L34 25H66L79 48H88V75H13Z'],['#b6cbd0','M39 31H61L71 48H31Z'],['#6b5d58','M30 64a12 12 0 1 0 0 24a12 12 0 1 0 0-24M73 64a12 12 0 1 0 0 24a12 12 0 1 0 0-24']]},
 {id:'apple',name:'La pomme',parts:[['#947458','M47 10H54V35H47Z'],['#8fa673','M54 25Q53 4 78 10Q76 31 54 25Z'],['#c98578','M50 36Q25 20 15 44Q5 68 33 91Q41 96 50 90Q59 96 67 91Q95 68 85 44Q75 20 50 36Z']]},
 {id:'cup',name:'La tasse',parts:[['#b6a1c8','M60 30H78Q97 30 95 48Q94 67 74 67H64V57H76Q85 57 85 47Q85 40 77 40H65Z'],['#b6a1c8','M14 23H72V62Q72 83 43 83Q14 83 14 62Z'],['#e0bd7b','M8 87H79V93H8Z']]},
 {id:'icecream',name:'La glace',parts:[['#d5ad74','M25 48H75L50 94Z'],['#b7a1c7','M17 48Q9 26 32 23Q39 1 57 15Q83 9 83 34Q97 52 75 56H25Q14 55 17 48Z']]}
];
// Variantes proches : les contours, et pas seulement les couleurs, changent.
const originalShadow=id=>SHADOW_OBJECTS.find(item=>item.id===id);
originalShadow('boat').name='Le bateau à deux voiles';
SHADOW_OBJECTS.push(
 {id:'boat-single',name:'Le bateau à une voile',parts:originalShadow('boat').parts.filter((_,i)=>i!==2)},
 {id:'parasol',name:'Le parasol',parts:[['#967b66','M47 38H53V91H47Z'],['#d9b873','M6 45Q50 0 94 45Z']]},
 {id:'mountain',name:'La montagne',parts:[['#a3b7ad','M7 88 50 12 93 88Z'],['#f0e9db','M36 37 50 12 64 37 54 32 48 40 43 32Z']]},
 {id:'house-chimney',name:'La maison avec cheminée',parts:[...originalShadow('house').parts,['#af8056','M66 17H78V48H66Z']]},
 {id:'van',name:'Le minibus',parts:[['#b2bb8e','M12 26H75L90 48V75H12Z'],['#b6cbd0','M60 32H71L81 48H60ZM21 33H49V48H21Z'],...originalShadow('car').parts.slice(2)]},
 {id:'fish-round',name:'Le poisson rond',parts:[['#a5bbbf','M68 48 94 25V77L68 55Z'],['#e4bb66','M41 19a31 31 0 1 0 0 62a31 31 0 1 0 0-62'],['#63524a','M24 47h4v5h-4Z']]},
 {id:'cup-nohandle',name:'Le gobelet',parts:originalShadow('cup').parts.slice(1)},
 {id:'rocket-no-fins',name:'La fusée sans ailerons',parts:originalShadow('rocket').parts.filter((_,i)=>i!==1)}
);
export const SHADOW_DISTRACTORS={
 boat:['boat-single','parasol','mountain'],'boat-single':['boat','parasol','mountain'],
 tree:['mountain','parasol','flower'],mountain:['tree','boat','parasol'],
 house:['house-chimney','rocket','mountain'],'house-chimney':['house','rocket','mountain'],
 umbrella:['parasol','flower','tree'],parasol:['umbrella','boat','mountain'],
 fish:['fish-round','butterfly','apple'],'fish-round':['fish','apple','butterfly'],
 butterfly:['flower','fish','tree'],flower:['butterfly','tree','parasol'],
 rocket:['rocket-no-fins','house','icecream'],'rocket-no-fins':['rocket','house','icecream'],
 car:['van','house','cup'],van:['car','house','cup'],
 apple:['flower','fish-round','icecream'],cup:['cup-nohandle','umbrella','car'],
 'cup-nohandle':['cup','icecream','house'],icecream:['rocket-no-fins','flower','parasol']
};
const shuffled=(values,random)=>{const out=[...values];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
export function preschoolQuestion(kind,level='easy',previous=null,random=Math.random){
 if(!PRESCHOOL_IDS.includes(kind))throw new Error('Unknown preschool activity');
 const pool=kind==='shapes'?SHAPES:kind==='animal-sounds'?SOUND_ANIMALS:SHADOW_OBJECTS;
 const target=shuffled(pool.filter(item=>item.id!==previous),random)[0];
 const alternatives=kind==='shadows'?SHADOW_DISTRACTORS[target.id].map(id=>pool.find(item=>item.id===id)):shuffled(pool.filter(item=>item!==target),random);
 const choices=shuffled([target,...alternatives.slice(0,preschoolChoices(level)-1)],random).map(item=>item.id);
 return {kind,id:target.id,target:target.id,choices,prompt:kind==='shapes'?'Trouve '+target.name+'.':PRESCHOOL_META[kind].instruction};
}
export function shapeMarkup(id,color='#a7b789'){
 const shape=SHAPES.find(item=>item.id===id);if(!shape)return '';
 return '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="'+shape.path+'" fill="'+color+'" stroke="#665447" stroke-opacity=".13" stroke-width="2" stroke-linejoin="round"/></svg>';
}
export function shadowMarkup(id,silhouette=false){
 const item=SHADOW_OBJECTS.find(item=>item.id===id);if(!item)return '';
 return '<svg viewBox="0 0 100 100" aria-hidden="true">'+item.parts.map(([color,path])=>'<path d="'+path+'" fill="'+(silhouette?'#302936':color)+'"/>').join('')+'</svg>';
}
export const onShadowTarget=(point,rect)=>point.x>=rect.left&&point.x<=rect.right&&point.y>=rect.top&&point.y<=rect.bottom;
