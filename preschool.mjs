import {colorQuestion} from './colors.mjs';
export const PRESCHOOL_IDS=['shapes','animal-sounds','shadows','colors'];
export const PRESCHOOL_META={colors:{label:'Le mélange des couleurs',title:'Quelle couleur va apparaître ?',instruction:'Mélange les deux peintures et trouve la nouvelle couleur.'},shapes:{label:'Les formes',title:'Écoute et trouve la forme',instruction:'Touche la forme que tu entends.'},'animal-sounds':{label:'Les cris des animaux',title:'Qui fait ce bruit ?',instruction:'Écoute le cri, puis touche le bon animal.'},shadows:{label:'Le puzzle des ombres',title:'Retrouve mon ombre',instruction:'Glisse la bonne ombre sur l’objet. Tu peux aussi toucher l’ombre, puis l’objet.'}};
export const preschoolChoices=level=>({easy:2,medium:3,hard:4})[level]||2;
export const SHAPES=[
 {id:'square',name:'le carré',path:'M20 20H80V80H20Z'},
 {id:'circle',name:'le rond',path:'M50 16a34 34 0 1 0 0 68a34 34 0 1 0 0-68'},
 {id:'star',name:'l’étoile',path:'M50 8 62 35 92 38 70 59 76 90 50 75 24 90 30 59 8 38 38 35Z'},
 {id:'triangle',name:'le triangle',path:'M50 12 90 84H10Z'},
 {id:'oval',name:'l’ovale',path:'M50 25a40 25 0 1 0 0 50a40 25 0 1 0 0-50'},
 {id:'diamond',name:'le losange',path:'M50 7 81 50 50 93 19 50Z'}
];
export const SOUND_ANIMALS=[['cat','Le chat'],['dog','Le chien'],['cow','La vache'],['duck','Le canard'],['sheep','Le mouton'],['horse','Le cheval']].map(([id,name],tile)=>({id,name,tile,sprite:'assets/animaux-sons.png',audio:'assets/audio/'+id+(id==='duck'?'.mp3':'.ogg')}));
SOUND_ANIMALS.push(...[
 {
  "id": "pig",
  "name": "Le cochon",
  "audio": "assets/audio/pig.ogg",
  "sprite": "assets/animaux-sons-2.png",
  "tile": 0
 },
 {
  "id": "rooster",
  "name": "Le coq",
  "audio": "assets/audio/rooster.ogg",
  "sprite": "assets/animaux-sons-2.png",
  "tile": 1
 },
 {
  "id": "donkey",
  "name": "L’âne",
  "audio": "assets/audio/donkey.ogg",
  "sprite": "assets/animaux-sons-2.png",
  "tile": 2
 },
 {
  "id": "goat",
  "name": "La chèvre",
  "audio": "assets/audio/goat.ogg",
  "sprite": "assets/animaux-sons-2.png",
  "tile": 3
 },
 {
  "id": "goose",
  "name": "L’oie",
  "audio": "assets/audio/goose.ogg",
  "sprite": "assets/animaux-sons-2.png",
  "tile": 4
 },
 {
  "id": "turkey",
  "name": "Le dindon",
  "audio": "assets/audio/turkey.ogg",
  "sprite": "assets/animaux-sons-2.png",
  "tile": 5
 },
 {
  "id": "lion",
  "name": "Le lion",
  "audio": "assets/audio/lion.ogg",
  "sprite": "assets/animaux-sons-3.png",
  "tile": 0
 },
 {
  "id": "tiger",
  "name": "Le tigre",
  "audio": "assets/audio/tiger.wav",
  "sprite": "assets/animaux-sons-3.png",
  "tile": 1
 },
 {
  "id": "elephant",
  "name": "L’éléphant",
  "audio": "assets/audio/elephant.ogg",
  "sprite": "assets/animaux-sons-3.png",
  "tile": 2
 },
 {
  "id": "wolf",
  "name": "Le loup",
  "audio": "assets/audio/wolf.ogg",
  "sprite": "assets/animaux-sons-3.png",
  "tile": 3
 },
 {
  "id": "bear",
  "name": "L’ours",
  "audio": "assets/audio/bear.ogg",
  "sprite": "assets/animaux-sons-3.png",
  "tile": 4
 },
 {
  "id": "monkey",
  "name": "Le singe",
  "audio": "assets/audio/monkey.ogg",
  "sprite": "assets/animaux-sons-3.png",
  "tile": 5
 },
 {
  "id": "owl",
  "name": "Le hibou",
  "audio": "assets/audio/owl.mp3",
  "sprite": "assets/animaux-sons-4.png",
  "tile": 0
 },
 {
  "id": "parrot",
  "name": "Le perroquet",
  "audio": "assets/audio/parrot.mp3",
  "sprite": "assets/animaux-sons-4.png",
  "tile": 1
 },
 {
  "id": "crow",
  "name": "Le corbeau",
  "audio": "assets/audio/crow.ogg",
  "sprite": "assets/animaux-sons-4.png",
  "tile": 2
 },
 {
  "id": "peacock",
  "name": "Le paon",
  "audio": "assets/audio/peacock.ogg",
  "sprite": "assets/animaux-sons-4.png",
  "tile": 3
 },
 {
  "id": "frog",
  "name": "La grenouille",
  "audio": "assets/audio/frog.oga",
  "sprite": "assets/animaux-sons-4.png",
  "tile": 4
 },
 {
  "id": "bee",
  "name": "Le bourdon",
  "audio": "assets/audio/bee.ogg",
  "sprite": "assets/animaux-sons-4.png",
  "tile": 5
 },
 {
  "id": "cricket",
  "name": "Le grillon",
  "audio": "assets/audio/cricket.ogg",
  "sprite": "assets/animaux-sons-5.png",
  "tile": 0
 },
 {
  "id": "dolphin",
  "name": "Le dauphin",
  "audio": "assets/audio/dolphin.wav",
  "sprite": "assets/animaux-sons-5.png",
  "tile": 1
 },
 {
  "id": "whale",
  "name": "La baleine",
  "audio": "assets/audio/whale.oga",
  "sprite": "assets/animaux-sons-5.png",
  "tile": 2
 },
 {
  "id": "seal",
  "name": "L’otarie",
  "audio": "assets/audio/seal.ogg",
  "sprite": "assets/animaux-sons-5.png",
  "tile": 3
 },
 {
  "id": "snake",
  "name": "Le serpent à sonnette",
  "audio": "assets/audio/snake.ogg",
  "sprite": "assets/animaux-sons-5.png",
  "tile": 4
 },
 {
  "id": "fox",
  "name": "Le renard",
  "audio": "assets/audio/fox.mp3",
  "sprite": "assets/animaux-sons-5.png",
  "tile": 5
 }
]);
SOUND_ANIMALS.push(...[
 {
  "id": "alligator",
  "name": "L’alligator",
  "audio": "assets/audio/alligator.ogg",
  "sprite": "assets/animaux-100-1.png",
  "tile": 0,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "woodcock",
  "name": "La bécasse",
  "audio": "assets/audio/woodcock.ogg",
  "sprite": "assets/animaux-100-1.png",
  "tile": 1,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "impala",
  "name": "L’impala",
  "audio": "assets/audio/impala.ogg",
  "sprite": "assets/animaux-100-1.png",
  "tile": 2,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "australian-magpie",
  "name": "Le cassican",
  "audio": "assets/audio/australian-magpie.ogg",
  "sprite": "assets/animaux-100-1.png",
  "tile": 3,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "badger",
  "name": "Le blaireau",
  "audio": "assets/audio/badger.ogg",
  "sprite": "assets/animaux-100-1.png",
  "tile": 4,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "bat",
  "name": "La chauve-souris",
  "audio": "assets/audio/bat.ogg",
  "sprite": "assets/animaux-100-1.png",
  "tile": 5,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "bison",
  "name": "Le bison",
  "audio": "assets/audio/bison.ogg",
  "sprite": "assets/animaux-100-1.png",
  "tile": 6,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "camel",
  "name": "Le chameau",
  "audio": "assets/audio/camel.ogg",
  "sprite": "assets/animaux-100-1.png",
  "tile": 7,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "hen",
  "name": "La poule",
  "audio": "assets/audio/hen.ogg",
  "sprite": "assets/animaux-100-1.png",
  "tile": 8,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "cicada",
  "name": "La cigale",
  "audio": "assets/audio/cicada.ogg",
  "sprite": "assets/animaux-100-1.png",
  "tile": 9,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "coyote",
  "name": "Le coyote",
  "audio": "assets/audio/coyote.ogg",
  "sprite": "assets/animaux-100-2.png",
  "tile": 0,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "crane",
  "name": "La grue",
  "audio": "assets/audio/crane.ogg",
  "sprite": "assets/animaux-100-2.png",
  "tile": 1,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "curlew",
  "name": "Le courlis",
  "audio": "assets/audio/curlew.ogg",
  "sprite": "assets/animaux-100-2.png",
  "tile": 2,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "deer",
  "name": "Le cerf",
  "audio": "assets/audio/deer.ogg",
  "sprite": "assets/animaux-100-2.png",
  "tile": 3,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "eagle",
  "name": "Le pygargue",
  "audio": "assets/audio/eagle.ogg",
  "sprite": "assets/animaux-100-2.png",
  "tile": 4,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "elk",
  "name": "Le wapiti",
  "audio": "assets/audio/elk.ogg",
  "sprite": "assets/animaux-100-2.png",
  "tile": 5,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "giraffe",
  "name": "La girafe",
  "audio": "assets/audio/giraffe.ogg",
  "sprite": "assets/animaux-100-2.png",
  "tile": 6,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "grasshopper",
  "name": "La sauterelle",
  "audio": "assets/audio/grasshopper.ogg",
  "sprite": "assets/animaux-100-2.png",
  "tile": 7,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "guinea-pig",
  "name": "Le cochon d’Inde",
  "audio": "assets/audio/guinea-pig.ogg",
  "sprite": "assets/animaux-100-2.png",
  "tile": 8,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "hawk",
  "name": "La buse",
  "audio": "assets/audio/hawk.ogg",
  "sprite": "assets/animaux-100-2.png",
  "tile": 9,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "hyena",
  "name": "La hyène",
  "audio": "assets/audio/hyena.ogg",
  "sprite": "assets/animaux-100-3.png",
  "tile": 0,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "jackal",
  "name": "Le chacal",
  "audio": "assets/audio/jackal.ogg",
  "sprite": "assets/animaux-100-3.png",
  "tile": 1,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "kookaburra",
  "name": "Le kookaburra",
  "audio": "assets/audio/kookaburra.ogg",
  "sprite": "assets/animaux-100-3.png",
  "tile": 2,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "lemur",
  "name": "Le lémurien",
  "audio": "assets/audio/lemur.ogg",
  "sprite": "assets/animaux-100-3.png",
  "tile": 3,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "linnet",
  "name": "La linotte",
  "audio": "assets/audio/linnet.ogg",
  "sprite": "assets/animaux-100-3.png",
  "tile": 4,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "magpie",
  "name": "La pie",
  "audio": "assets/audio/magpie.ogg",
  "sprite": "assets/animaux-100-3.png",
  "tile": 5,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "mosquito",
  "name": "Le moustique",
  "audio": "assets/audio/mosquito.ogg",
  "sprite": "assets/animaux-100-3.png",
  "tile": 6,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "mouse",
  "name": "La souris",
  "audio": "assets/audio/mouse.ogg",
  "sprite": "assets/animaux-100-3.png",
  "tile": 7,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "penguin",
  "name": "Le manchot",
  "audio": "assets/audio/penguin.ogg",
  "sprite": "assets/animaux-100-3.png",
  "tile": 8,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "pigeon",
  "name": "Le pigeon",
  "audio": "assets/audio/pigeon.ogg",
  "sprite": "assets/animaux-100-3.png",
  "tile": 9,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "prairie-dog",
  "name": "Le chien de prairie",
  "audio": "assets/audio/prairie-dog.ogg",
  "sprite": "assets/animaux-100-4.png",
  "tile": 0,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "quail",
  "name": "La caille",
  "audio": "assets/audio/quail.ogg",
  "sprite": "assets/animaux-100-4.png",
  "tile": 1,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "rabbit",
  "name": "Le lapin",
  "audio": "assets/audio/rabbit.ogg",
  "sprite": "assets/animaux-100-4.png",
  "tile": 2,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "raccoon",
  "name": "Le raton laveur",
  "audio": "assets/audio/raccoon.ogg",
  "sprite": "assets/animaux-100-4.png",
  "tile": 3,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "raven",
  "name": "Le grand corbeau",
  "audio": "assets/audio/raven.ogg",
  "sprite": "assets/animaux-100-4.png",
  "tile": 4,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "rook",
  "name": "Le corbeau freux",
  "audio": "assets/audio/rook.ogg",
  "sprite": "assets/animaux-100-4.png",
  "tile": 5,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "goldfinch",
  "name": "Le chardonneret",
  "audio": "assets/audio/goldfinch.ogg",
  "sprite": "assets/animaux-100-4.png",
  "tile": 6,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "squirrel",
  "name": "L’écureuil",
  "audio": "assets/audio/squirrel.ogg",
  "sprite": "assets/animaux-100-4.png",
  "tile": 7,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "swan",
  "name": "Le cygne",
  "audio": "assets/audio/swan.ogg",
  "sprite": "assets/animaux-100-4.png",
  "tile": 8,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "gecko",
  "name": "Le gecko",
  "audio": "assets/audio/gecko.ogg",
  "sprite": "assets/animaux-100-4.png",
  "tile": 9,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "boar",
  "name": "Le sanglier",
  "audio": "assets/audio/boar.ogg",
  "sprite": "assets/animaux-100-5.png",
  "tile": 0,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "robin",
  "name": "Le rouge-gorge",
  "audio": "assets/audio/robin.ogg",
  "sprite": "assets/animaux-100-5.png",
  "tile": 1,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "blackbird",
  "name": "Le merle",
  "audio": "assets/audio/blackbird.ogg",
  "sprite": "assets/animaux-100-5.png",
  "tile": 2,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "blue-tit",
  "name": "La mésange bleue",
  "audio": "assets/audio/blue-tit.ogg",
  "sprite": "assets/animaux-100-5.png",
  "tile": 3,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "great-tit",
  "name": "La mésange charbonnière",
  "audio": "assets/audio/great-tit.ogg",
  "sprite": "assets/animaux-100-5.png",
  "tile": 4,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "nightingale",
  "name": "Le rossignol",
  "audio": "assets/audio/nightingale.ogg",
  "sprite": "assets/animaux-100-5.png",
  "tile": 5,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "cuckoo",
  "name": "Le coucou",
  "audio": "assets/audio/cuckoo.ogg",
  "sprite": "assets/animaux-100-5.png",
  "tile": 6,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "woodpecker",
  "name": "Le pic épeiche",
  "audio": "assets/audio/woodpecker.ogg",
  "sprite": "assets/animaux-100-5.png",
  "tile": 7,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "stork",
  "name": "La cigogne",
  "audio": "assets/audio/stork.ogg",
  "sprite": "assets/animaux-100-5.png",
  "tile": 8,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "flamingo",
  "name": "Le flamant rose",
  "audio": "assets/audio/flamingo.ogg",
  "sprite": "assets/animaux-100-5.png",
  "tile": 9,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "heron",
  "name": "Le héron",
  "audio": "assets/audio/heron.ogg",
  "sprite": "assets/animaux-100-6.png",
  "tile": 0,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "kingfisher",
  "name": "Le martin-pêcheur",
  "audio": "assets/audio/kingfisher.ogg",
  "sprite": "assets/animaux-100-6.png",
  "tile": 1,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "seagull",
  "name": "La mouette",
  "audio": "assets/audio/seagull.ogg",
  "sprite": "assets/animaux-100-6.png",
  "tile": 2,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "pelican",
  "name": "Le pélican",
  "audio": "assets/audio/pelican.ogg",
  "sprite": "assets/animaux-100-6.png",
  "tile": 3,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "jaguar",
  "name": "Le jaguar",
  "audio": "assets/audio/jaguar.ogg",
  "sprite": "assets/animaux-100-6.png",
  "tile": 4,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "puffin",
  "name": "Le macareux",
  "audio": "assets/audio/puffin.ogg",
  "sprite": "assets/animaux-100-6.png",
  "tile": 5,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "toucan",
  "name": "Le toucan",
  "audio": "assets/audio/toucan.ogg",
  "sprite": "assets/animaux-100-6.png",
  "tile": 6,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "swallow",
  "name": "L’hirondelle",
  "audio": "assets/audio/swallow.ogg",
  "sprite": "assets/animaux-100-6.png",
  "tile": 7,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "swift",
  "name": "Le martinet",
  "audio": "assets/audio/swift.ogg",
  "sprite": "assets/animaux-100-6.png",
  "tile": 8,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "sparrow",
  "name": "Le moineau",
  "audio": "assets/audio/sparrow.ogg",
  "sprite": "assets/animaux-100-6.png",
  "tile": 9,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "chaffinch",
  "name": "Le pinson",
  "audio": "assets/audio/chaffinch.ogg",
  "sprite": "assets/animaux-100-7.png",
  "tile": 0,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "canary",
  "name": "Le canari",
  "audio": "assets/audio/canary.ogg",
  "sprite": "assets/animaux-100-7.png",
  "tile": 1,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "budgie",
  "name": "La perruche",
  "audio": "assets/audio/budgie.ogg",
  "sprite": "assets/animaux-100-7.png",
  "tile": 2,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "hoopoe",
  "name": "La huppe",
  "audio": "assets/audio/hoopoe.ogg",
  "sprite": "assets/animaux-100-7.png",
  "tile": 3,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "lapwing",
  "name": "Le vanneau",
  "audio": "assets/audio/lapwing.ogg",
  "sprite": "assets/animaux-100-7.png",
  "tile": 4,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "snipe",
  "name": "La bécassine",
  "audio": "assets/audio/snipe.ogg",
  "sprite": "assets/animaux-100-7.png",
  "tile": 5,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "wren",
  "name": "Le troglodyte",
  "audio": "assets/audio/wren.ogg",
  "sprite": "assets/animaux-100-7.png",
  "tile": 6,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "nuthatch",
  "name": "La sittelle",
  "audio": "assets/audio/nuthatch.ogg",
  "sprite": "assets/animaux-100-7.png",
  "tile": 7,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "skylark",
  "name": "L’alouette",
  "audio": "assets/audio/skylark.ogg",
  "sprite": "assets/animaux-100-7.png",
  "tile": 8,
  "cols": 5,
  "rows": 2
 },
 {
  "id": "bee-eater",
  "name": "Le guêpier",
  "audio": "assets/audio/bee-eater.ogg",
  "sprite": "assets/animaux-100-7.png",
  "tile": 9,
  "cols": 5,
  "rows": 2
 }
]);
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
const SIMILAR_ANIMALS=[['crow','raven','rook','blackbird'],['wolf','dog','coyote','jackal'],['lion','tiger','jaguar','bear'],['sheep','goat'],['linnet','nightingale','wren','skylark','sparrow'],['woodcock','snipe','curlew'],['blue-tit','great-tit']];
const sameSoundFamily=(a,b)=>SIMILAR_ANIMALS.some(group=>group.includes(a)&&group.includes(b));
const shuffled=(values,random)=>{const out=[...values];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
export function preschoolQuestion(kind,level='easy',previous=null,random=Math.random){
 if(kind==='colors')return colorQuestion(level,previous,random);
 if(!PRESCHOOL_IDS.includes(kind))throw new Error('Unknown preschool activity');
 const pool=kind==='shapes'?SHAPES:kind==='animal-sounds'?SOUND_ANIMALS:SHADOW_OBJECTS;
 const excluded=new Set(Array.isArray(previous)?previous:[previous]);
 const available=pool.filter(item=>!excluded.has(item.id));
 const target=shuffled(available.length?available:pool,random)[0];
 const alternatives=kind==='shadows'?SHADOW_DISTRACTORS[target.id].map(id=>pool.find(item=>item.id===id)):shuffled(pool.filter(item=>item!==target&&(kind!=='animal-sounds'||!sameSoundFamily(item.id,target.id))),random);
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
