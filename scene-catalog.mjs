import {shadowMarkup,shapeMarkup} from './preschool.mjs';

// The same deterministic drawings are used in each picture and its answer cards.
// Differences alter these objects, never an approximate AI-generated duplicate.
const C={cream:'#f3dfb5',brown:'#a47c59',green:'#9caf7b',blue:'#89afb9',purple:'#b7a2c9',pink:'#d39485',gold:'#dfb965',ink:'#746253'};
const path=(d,fill=C.brown,extra='')=>`<path d="${d}" fill="${fill}" ${extra}/>`;
const rect=(x,y,w,h,fill,rx=3)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
const circle=(x,y,r,fill)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const line=(d,color=C.brown,w=3)=>path(d,'none',`stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`);
const svg=content=>`<svg viewBox="0 0 100 100" aria-hidden="true">${content}</svg>`;
const windows=()=>rect(27,48,15,17,C.blue)+rect(58,48,15,17,C.blue)+rect(43,72,16,23,C.brown);

export function objectIcon(id,color=C.gold){
 const old={apple:'apple',flower:'flower',boat:'boat',fish:'fish',butterfly:'butterfly',rocket:'rocket',car:'car',cup:'cup',tree:'tree',mushroom:null};
 if(old[id])return shadowMarkup(old[id]);
 const p={
  carrot:path('M25 27 68 70 35 94Z','#db9b66')+path('M34 35Q3 9 25 6L43 24Q38-5 59 5L51 32Q82 7 88 27L56 45Z',C.green)+line('m33 51 13 4m-9 13 9 3','#b77d50'),
  basket:path('M12 42H88L77 88H24Z',color)+line('M24 42Q50-8 77 42',C.brown,8)+line('M30 53v24m20-24v24m20-24v24M21 64H81',C.cream),
  watering:rect(18,38,49,43,color,8)+path('M66 49 89 28 97 35 70 72Z',color)+line('M18 47Q-3 12 29 23',C.brown,7)+line('m86 21 8 10',C.brown,6),
  pumpkin:circle(31,59,26,color)+circle(68,59,26,color)+path('M50 30C17 29 21 91 50 91C79 91 83 29 50 30',C.gold)+path('M46 30 48 9 59 9 55 31Z',C.green),
  shovel:line('M50 28V69',C.brown,8)+path('M28 62H72V77L50 96 28 77Z',color)+path('M35 7H65V24Q50 39 35 24Z',C.brown)+rect(42,13,16,10,C.cream),
  shell:path('M50 88Q-8 51 13 26Q31 3 50 26Q69 3 87 26Q108 51 50 88Z',color)+line('M50 82 24 31M50 82V29M50 82 76 31',C.cream,4),
  bucket:path('M20 35H80L72 90H28Z',color)+line('M24 35Q50-7 77 35',C.brown,5)+rect(17,30,66,10,C.cream),
  star:path('M50 7 62 34 93 38 71 59 77 91 50 76 23 91 29 59 7 38 38 34Z',color)+circle(39,48,3,C.ink)+circle(61,48,3,C.ink),
  crab:circle(50,58,25,color)+line('M27 56 8 41M73 56 92 41M29 68 12 78M70 68 88 78',color,8)+path('M9 44Q-4 18 14 17L15 31 29 19Q38 40 9 44M91 44Q104 18 86 17L85 31 71 19Q62 40 91 44',color)+line('M39 39V29M61 39V29',color,6)+circle(39,27,5,C.ink)+circle(61,27,5,C.ink),
  anchor:line('M50 27V87M16 58Q18 92 50 90Q82 92 84 58M25 42H75',color,8)+circle(50,17,12,color)+circle(50,17,5,C.cream)+path('M7 58 30 57 13 75ZM93 58 70 57 87 75Z',color),
  palm:path('M44 42Q60 73 46 96H61Q70 65 56 40Z',C.brown)+path('M50 42Q-3 54 6 23Q29 17 50 36Q25-6 48 3Q69 6 55 36Q84-4 96 22Q86 44 59 43Q98 39 91 65Q67 66 51 45Z',C.green)+circle(52,44,8,C.brown),
  leaf:path('M15 84Q-7 7 91 7Q96 93 15 84Z',color)+line('M18 82 76 23M35 64V40M50 50H73',C.cream),
  acorn:path('M24 43H76Q78 81 50 94Q22 81 24 43Z',C.gold)+path('M16 46Q19 17 50 17Q81 17 84 46Z',C.brown)+line('M50 19 57 5',C.brown,7),
  mushroom:path('M40 40H60L67 94H33Z',C.cream)+path('M4 49Q50-25 96 49Z',color)+circle(31,31,7,C.cream)+circle(65,30,8,C.cream),
  pine:path('M44 67H57V96H44Z',C.brown)+path('M50 4 76 38H64L88 66H73L98 83H2L27 66H12L36 38H24Z',C.green),
  lantern:path('M33 24Q50-6 67 24', 'none',`stroke="${C.brown}" stroke-width="6"`)+rect(23,25,54,62,color,7)+rect(32,34,36,44,C.cream)+path('M50 45Q30 64 50 73Q70 64 50 45',C.gold)+rect(16,87,68,8,C.brown),
  boot:path('M23 12H61V63L84 72Q97 94 76 94H20V66Z',color)+rect(17,88,73,9,C.brown)+rect(21,11,42,10,C.cream),
  snowflake:line('M50 5V95M11 28 89 72M11 72 89 28M35 12 50 25 65 12M35 88 50 75 65 88M12 43 27 38 24 22M76 78 73 62 88 57M12 57 27 62 24 78M76 22 73 38 88 43',color,5),
  sled:path('M20 37H77V53H20Z',color)+line('M25 53V76M68 53V76M10 78H80Q96 78 93 64',C.brown,7)+line('M25 29H74',C.brown,5),
  backpack:rect(17,23,66,69,color,17)+line('M32 23Q50-4 68 23',C.brown,7)+rect(29,56,42,27,C.cream,6)+line('M27 35H73',C.brown),
  train:rect(14,28,46,47,color)+rect(55,48,35,27,color)+rect(20,35,32,22,C.blue)+rect(67,29,13,22,C.brown)+circle(27,79,13,C.brown)+circle(75,79,13,C.brown)+circle(27,79,6,C.cream)+circle(75,79,6,C.cream),
  bread:path('M7 64Q7 25 34 28Q46 5 65 28Q94 25 94 64V82H7Z',color)+line('m28 42-7 17m31-24-7 19m31-11-7 17',C.cream,5),
  book:path('M8 20Q28 9 49 24Q70 9 92 20V82Q70 71 50 88Q28 71 8 82Z',color)+line('M50 25V85M19 34 38 38M19 48 38 52M62 38 82 34M62 52 82 48',C.cream,3),
  cone:path('M50 7 81 86H19Z',color)+path('M32 48H68L73 61H27Z',C.cream)+rect(9,85,82,10,C.brown),
  balloon:path('M50 5C0 4 6 62 49 77C92 62 100 4 50 5',color)+path('M50 75 41 87H59Z',color)+line('M50 87Q32 90 50 99',C.brown,2),
  flag:line('M22 7V95',C.brown,6)+path('M25 10H89L73 32 89 53H25Z',color)+path('M45 18 54 30 68 32 56 42 58 50 45 43 33 50 35 36 29 29 42 28Z',C.cream),
  shield:path('M12 14 50 4 88 14V53Q88 80 50 97Q12 80 12 53Z',color)+path('M45 20H55V73H45ZM29 37H71V47H29Z',C.cream),
  crown:path('M12 25 35 47 50 13 66 47 89 25 80 84H21Z',color)+circle(13,23,7,C.gold)+circle(50,12,7,C.gold)+circle(88,23,7,C.gold)+rect(22,70,57,10,C.cream),
  key:circle(32,29,23,color)+circle(32,29,11,C.cream)+path('M40 45 82 88 95 76 85 66 77 74 68 65 76 57 65 46 57 54 49 38Z',color),
  gem:path('M23 14H76L96 41 50 94 4 41Z',color)+line('M4 41H96M23 14 34 41 50 94 65 41 76 14M34 41 50 14 65 41',C.cream,3),
  planet:circle(50,50,30,color)+path('M13 58Q-10 81 28 72L77 47Q112 23 89 30L78 36', 'none',`stroke="${C.cream}" stroke-width="9"`)+circle(43,36,7,C.cream),
  robot:rect(19,24,62,44,color,10)+rect(30,68,40,22,C.blue)+line('M50 24V10',C.brown,4)+circle(50,9,5,C.gold)+circle(36,43,7,C.cream)+circle(64,43,7,C.cream)+line('M36 58H64M30 90V98M70 90V98M18 74 7 88M82 74 93 88',C.brown,5),
  astronaut:circle(50,30,26,C.cream)+rect(32,21,36,20,C.blue,9)+rect(29,53,42,35,C.cream,8)+rect(36,61,29,17,color)+line('M31 61 12 77M69 61 88 77M39 85 32 99M61 85 68 99',C.cream,12),
  ufo:path('M28 48Q30 2 50 6Q70 2 72 48Z',C.blue)+path('M2 51Q50 16 98 51Q94 77 50 78Q6 77 2 51Z',color)+circle(24,57,6,C.cream)+circle(50,62,6,C.cream)+circle(76,57,6,C.cream),
  satellite:rect(35,32,30,42,color)+path('M1 20 25 27V75L1 69ZM75 27 99 20V69L75 75Z',C.blue)+line('M25 49H35M65 49H75M50 31V17M43 12 50 18 60 8',C.brown,4),
  penguin:path('M50 4Q18 4 19 62L10 81 29 76Q50 98 72 76L90 81 80 60Q82 4 50 4',C.ink)+path('M50 33Q27 33 29 72Q50 91 71 72Q73 33 50 33',C.cream)+circle(36,26,7,C.cream)+circle(64,26,7,C.cream)+circle(36,26,3,C.ink)+circle(64,26,3,C.ink)+path('M40 34H60L50 46ZM27 88 42 83 44 96H24ZM58 83 73 88 76 96H56Z',C.gold),
  iceberg:path('M4 81 25 35 40 46 59 8 77 42 95 81Z',color)+path('M25 35 22 70 40 46 49 69 59 8 65 62 77 42 81 78Z',C.cream)+line('M4 87H96',C.blue,5),
  hat:path('M22 52Q18 7 50 7Q82 7 78 52Z',color)+rect(14,48,72,22,C.cream,10)+circle(50,8,10,C.cream),
  mitten:path('M24 48V26Q24 12 35 19Q42 5 52 17Q67 6 75 22V70Q75 92 43 88L14 61Q2 44 18 39Z',color)+rect(32,78,43,15,C.cream),
  seal:path('M12 79Q4 44 28 30Q32 8 55 14Q84 13 78 41Q75 58 49 59L88 75 99 64 96 88 46 90Z',color)+circle(59,29,4,C.ink)+circle(76,38,4,C.ink)+line('m71 44-13 4m16-2-14 9',C.cream,2),
  coral:line('M50 94V21M50 55 24 35V13M24 35 8 27V12M50 73 78 53V22M78 53 94 42V29',color,10),
  turtle:circle(47,53,30,C.green)+circle(85,51,13,color)+path('M25 29 16 13 36 26M25 76 16 93 39 80M58 27 73 12 70 35M60 79 75 94 73 70Z',color)+line('M23 51H70M47 24V82M28 33 63 74M28 73 63 33',C.cream,2)+circle(89,48,3,C.ink),
  octopus:path('M20 50Q13 2 50 3Q87 2 80 50Q99 54 94 75Q86 95 74 76Q73 99 59 95L50 78Q41 103 27 92L25 76Q9 96 3 77Q-2 59 20 50',color)+circle(36,37,5,C.ink)+circle(64,37,5,C.ink),
  jellyfish:path('M10 49Q9-8 50 5Q91-8 90 49Z',color)+line('M21 52Q7 70 23 92M43 52Q25 76 45 97M63 52Q44 78 65 96M81 52Q64 75 85 90',color,7),
  chest:rect(12,39,76,49,C.brown,5)+path('M12 41Q8 8 50 8Q92 8 88 41Z',color)+rect(26,14,8,74,C.gold)+rect(67,14,8,74,C.gold)+rect(43,37,15,22,C.gold)+circle(50,45,3,C.brown),
  bubble:circle(50,51,35,color)+circle(50,51,29,'#d6e8e8')+path('M28 45Q29 25 46 23','none',`stroke="${C.cream}" stroke-width="7" stroke-linecap="round"`)
 };
 return svg(p[id]||p.star);
}

export function heroMarkup(id,color){
 const house=roof=>rect(18,42,64,54,C.cream)+path(roof,color)+windows();
 const boat=()=>path('M5 62H95L78 91H22Z',color)+rect(25,37,45,27,C.cream)+rect(34,43,14,12,C.blue)+rect(54,43,10,12,C.blue);
 const heroes={
  barn:rect(14,33,72,63,color)+path('M4 35 50 5 96 35Z',C.brown)+rect(33,56,34,40,C.cream)+line('M35 58 65 94M65 58 35 94',C.brown,4)+circle(50,33,9,C.cream),
  windmill:path('M34 35H66L79 96H21Z',color)+path('M28 34 50 5 72 34Z',C.brown)+rect(43,73,15,23,C.brown)+line('M50 42 16 8M50 42 84 8M50 42 16 76M50 42 84 76',C.cream,9)+circle(50,42,6,C.brown),
  vegetable:rect(4,26,92,67,color)+path('M5 28 50 5 95 28Z',C.blue)+line('M8 28H92M26 28V91M50 7V92M74 28V91M5 57H95',C.cream,4)+path('M7 92Q16 52 27 88Q42 44 52 89Q72 43 82 92Z',C.green),
  orchard:rect(8,74,84,23,color)+path('M46 31H55V82H46Z',C.brown)+circle(31,33,25,C.green)+circle(66,33,25,C.green)+circle(49,19,18,C.green)+[ [26,25],[43,43],[69,26],[62,51]].map(([x,y])=>circle(x,y,6,C.pink)).join(''),
  lighthouse:path('M37 22H64L77 94H23Z',C.cream)+path('M33 48H68L71 62H30Z',color)+rect(32,15,37,21,color)+path('M26 15 50 2 76 15Z',C.brown)+rect(42,18,17,13,C.gold)+rect(43,75,14,19,C.blue),
  beachhut:house('M7 42 50 5 93 42Z')+path('M19 43H81V69H19Z',color)+line('M29 43V69M43 43V69M57 43V69M71 43V69',C.cream,5)+rect(4,90,92,7,C.brown),
  sailboat:path('M4 69H96L77 94H22Z',color)+line('M50 6V75',C.brown,4)+path('M46 8V63H8Z',C.cream)+path('M55 22 89 63H55Z',color),
  sandcastle:rect(9,43,25,51,color)+rect(65,43,25,51,color)+rect(30,56,39,38,color)+path('M8 43V28H17V37H25V28H34V43M65 43V28H74V37H82V28H91V43',color)+path('M42 94V76Q50 61 59 76V94Z',C.brown)+line('M50 56V14',C.brown)+path('M52 14H79L70 25H52Z',C.pink),
  treehouse:path('M44 35H58V99H44Z',C.brown)+circle(29,36,28,C.green)+circle(73,36,26,C.green)+circle(51,19,25,C.green)+rect(26,42,50,35,color)+path('M19 44 50 18 83 44Z',C.brown)+rect(44,53,15,24,C.cream)+line('M29 77V99M43 77V99M29 85H43M29 94H43',C.brown,3),
  tent:path('M3 91 50 12 97 91Z',color)+path('M35 91 50 46 65 91Z',C.brown)+line('M50 10V3M9 84 2 98M91 84 98 98',C.cream,3),
  bridge:path('M3 45Q50 5 97 45V66Q50 29 3 66Z',color)+line('M4 44V17M27 29V7M50 23V2M73 29V7M96 44V17M3 21Q50-13 97 21',C.brown,4)+path('M8 61H20V95H8ZM80 61H92V95H80Z',C.brown),
  mushroomhouse:path('M25 46H76V95H25Z',C.cream)+path('M3 49Q50-28 97 49Z',color)+circle(30,30,8,C.cream)+circle(66,29,9,C.cream)+rect(43,66,18,29,C.brown)+circle(70,60,7,C.blue),
  chalet:house('M1 48 50 6 99 48 90 57 50 24 10 57Z')+line('M15 79H85M25 73V85M38 73V85M65 73V85M77 73V85',C.brown,3),
  cablecar:line('M2 7H98M50 7V30',C.brown,4)+rect(13,29,74,55,color,14)+rect(23,36,22,28,C.blue)+rect(54,36,22,28,C.blue)+rect(18,77,64,8,C.brown),
  train:rect(7,24,49,53,color)+rect(51,48,43,29,color)+rect(14,32,34,26,C.blue)+rect(66,25,15,27,C.brown)+circle(25,82,13,C.brown)+circle(74,82,13,C.brown)+line('M2 97H98',C.brown,3),
  waterfall:path('M2 91 12 23 42 5 87 18 99 92Z',color)+path('M37 10H68L65 57 76 94H25L40 57Z',C.blue)+line('M48 20V63M58 24V73M40 77V91',C.cream,4),
  bakery:house('M9 38 50 7 91 38Z')+rect(15,37,70,19,color)+path('M15 38H85V48Q78 61 71 48Q64 61 57 48Q50 61 43 48Q36 61 29 48Q22 61 15 48Z',color)+rect(24,63,28,20,C.blue)+path('M29 75Q36 60 46 74Z',C.gold),
  firestation:rect(9,23,82,72,color)+path('M4 24H96V15H4Z',C.brown)+rect(17,48,28,47,C.cream)+rect(54,48,28,47,C.cream)+rect(22,59,18,30,C.pink)+rect(59,59,18,30,C.pink)+circle(50,33,8,C.cream),
  school:house('M2 41 50 8 98 41Z')+rect(39,4,23,26,color)+circle(50,17,8,C.cream)+line('M50 12V17H55',C.brown,2)+path('M10 40H90V50H10Z',color),
  playground:line('M8 93 28 13H72L93 93M28 13 48 93M50 23V60',C.brown,6)+rect(35,59,30,9,color)+path('M70 19 96 90H82L58 31Z',color),
  castle:rect(7,25,22,70,color)+rect(71,25,22,70,color)+rect(25,47,50,48,color)+path('M7 25V10H15V19H22V10H30V25M70 25V10H78V19H85V10H93V25',color)+path('M38 95V72Q50 53 62 72V95Z',C.brown)+rect(14,36,8,17,C.blue)+rect(78,36,8,17,C.blue),
  tower:rect(27,27,46,69,color)+path('M19 28 50 2 81 28Z',C.brown)+rect(43,42,14,21,C.blue)+path('M38 96V80Q50 64 62 80V96Z',C.brown),
  drawbridge:rect(4,20,23,75,color)+rect(73,20,23,75,color)+path('M26 35H74V58H26Z',color)+path('M32 95V62Q50 37 68 62V95Z',C.brown)+path('M32 72H68L87 97H13Z',C.gold)+line('M27 45 15 92M73 45 85 92',C.cream,3),
  tournament:path('M6 92V43L50 9 94 43V92Z',color)+path('M50 9 30 43V92H9V43ZM50 9 70 43V92H91V43Z',C.cream)+path('M37 92V58Q50 45 63 58V92Z',C.brown)+line('M50 10V1',C.brown),
  rocket:path('M50 2Q79 25 68 76H32Q21 25 50 2Z',color)+path('M31 51 9 87H34ZM69 51 91 87H66Z',C.purple)+circle(50,39,14,C.cream)+circle(50,39,9,C.blue)+path('M39 78 35 98 50 88 65 98 61 78Z',C.gold),
  station:rect(32,35,36,40,color,10)+rect(2,26,22,53,C.blue)+rect(76,26,22,53,C.blue)+line('M24 49H32M68 49H76M50 35V18',C.cream,4)+circle(50,13,9,C.gold)+circle(50,53,12,C.cream)+circle(50,53,8,C.blue),
  rover:rect(15,48,70,28,color)+rect(33,25,40,28,C.cream)+circle(30,81,14,C.brown)+circle(73,81,14,C.brown)+line('M18 49 7 29M65 24V6M65 7 83 13',C.brown,4)+circle(47,39,7,C.blue),
  observatory:rect(12,49,76,47,color)+path('M10 50Q13 1 50 5Q87 1 90 50Z',color)+path('M42 9H57V51H42Z',C.blue)+rect(42,76,17,20,C.brown)+line('M65 29 91 10',C.cream,10),
  igloo:path('M4 94Q-2 11 50 10Q102 11 96 94Z',color)+line('M10 57H90M22 31H78M5 80H95M50 12V31M31 31V57M69 31V57M20 57V80M50 57V80M80 57V80',C.cream,3)+path('M35 94V74Q50 49 65 74V94Z',C.blue),
  icebreaker:boat()+rect(35,14,28,25,color)+rect(44,20,12,13,C.blue)+line('M4 95H96',C.blue,4),
  colony:path('M2 95 14 58 42 50 57 16 86 47 98 95Z',color)+path('M43 50 57 16 69 43 58 35 52 51Z',C.cream)+[20,48,77].map((x,i)=>`<g transform="translate(${x-10} ${56-i%2*11}) scale(.25)">${objectIcon('penguin').replace(/^<svg[^>]*>|<\/svg>$/g,'')}</g>`).join(''),
  icepalace:rect(14,42,72,53,color)+path('M7 42 28 8 43 42ZM57 42 73 5 94 42Z',color)+path('M31 45 50 16 69 45Z',C.cream)+rect(42,65,17,30,C.blue)+line('M21 54H32M68 54H79',C.cream,5),
  reef:path('M2 96Q12 59 30 77Q45 39 65 72Q83 49 99 95Z',C.brown)+line('M27 83V14M27 45 10 29M27 60 42 39M69 83V35M69 58 88 40',color,9)+circle(85,15,8,C.blue),
  wreck:path('M4 65H95L78 92H23Z',color)+rect(27,43,40,24,C.brown)+line('M47 44 61 6',C.brown,5)+path('M60 9 84 46H51Z',C.cream)+path('M27 65 41 81 48 65 63 90 71 65Z',C.brown),
  submarine:path('M22 29H75Q103 29 96 61Q91 83 60 83H23Q-2 80 2 54Q2 29 22 29',color)+circle(32,54,14,C.cream)+circle(32,54,9,C.blue)+circle(67,54,14,C.cream)+circle(67,54,9,C.blue)+line('M48 28V10H68',C.brown,7)+path('M2 42 0 20 18 35ZM2 70 0 92 18 79Z',C.purple),
  treasure:rect(8,38,84,55,C.brown)+path('M8 40Q5 2 50 3Q95 2 92 40Z',color)+rect(23,10,9,83,C.gold)+rect(68,10,9,83,C.gold)+rect(41,36,19,25,C.gold)+circle(50,44,4,C.brown)+circle(13,95,5,C.gold)+circle(87,97,5,C.gold)
 };
 return svg(heroes[id]);
}

export const SCENE_WORLDS={
 countryside:{label:'À la campagne',sky:'#e4ede3',ground:'#c5d49b',nature:['pine','apple'],subjects:['carrot','basket','watering','pumpkin','shovel','apple'],count:'apple',countName:'pommes',prop:'watering',propName:'l’arrosoir',extra:['butterfly','flower']},
 beach:{label:'Au bord de la mer',sky:'#dcebf0',ground:'#eddbaf',nature:['palm','anchor'],subjects:['shell','bucket','star','crab','boat','anchor'],count:'shell',countName:'coquillages',prop:'bucket',propName:'le seau',extra:['crab','star']},
 forest:{label:'Dans la forêt',sky:'#dce6d8',ground:'#bdc99b',nature:['pine','mushroom'],subjects:['leaf','acorn','mushroom','butterfly','lantern','basket'],count:'mushroom',countName:'champignons',prop:'lantern',propName:'la lanterne',extra:['leaf','acorn']},
 mountain:{label:'À la montagne',sky:'#dfebf0',ground:'#c4d5c8',nature:['pine','iceberg'],subjects:['boot','snowflake','sled','backpack','train','lantern'],count:'pine',countName:'sapins',prop:'backpack',propName:'le sac à dos',extra:['snowflake','boot']},
 town:{label:'En ville',sky:'#e6e8ed',ground:'#d7cfba',nature:['flower','pine'],subjects:['car','bread','book','cone','balloon','backpack'],count:'balloon',countName:'ballons',prop:'balloon',propName:'le grand ballon',extra:['book','cone']},
 castle:{label:'Au château',sky:'#eee3eb',ground:'#c8d0ac',nature:['flag','shield'],subjects:['crown','shield','key','gem','flag','cup'],count:'gem',countName:'pierres précieuses',prop:'shield',propName:'le bouclier',extra:['crown','key']},
 space:{label:'Dans l’espace',sky:'#555978',ground:'#a9a2b9',nature:['planet','satellite'],subjects:['rocket','planet','robot','astronaut','ufo','satellite'],count:'star',countName:'étoiles',prop:'planet',propName:'la petite planète',extra:['ufo','satellite']},
 polar:{label:'Sur la banquise',sky:'#dbe9ed',ground:'#e7eee8',nature:['iceberg','snowflake'],subjects:['penguin','iceberg','hat','mitten','seal','fish'],count:'snowflake',countName:'flocons',prop:'hat',propName:'le bonnet',extra:['penguin','fish']},
 ocean:{label:'Sous l’océan',sky:'#83b4bf',ground:'#d8c9a7',nature:['coral','jellyfish'],subjects:['fish','turtle','octopus','jellyfish','chest','shell'],count:'star',countName:'étoiles de mer',prop:'shell',propName:'le grand coquillage',extra:['bubble','crab']}
};
const rows=[
 ['countryside',[['barn','La ferme','la grange'],['windmill','Le moulin','le moulin'],['vegetable','Le potager','la serre'],['orchard','Le verger','le bac du verger']]],
 ['beach',[['lighthouse','Le phare','le phare'],['beachhut','La cabane de plage','la cabane'],['sailboat','Le voilier','la coque du voilier'],['sandcastle','Le château de sable','le château de sable']]],
 ['forest',[['treehouse','La cabane dans les arbres','la cabane'],['tent','Le camping','la tente'],['bridge','Le pont de la forêt','le pont'],['mushroomhouse','La maison champignon','le toit du champignon']]],
 ['mountain',[['chalet','Le chalet','le toit du chalet'],['cablecar','Le téléphérique','la cabine du téléphérique'],['train','Le train de montagne','le train'],['waterfall','La cascade','le rocher de la cascade']]],
 ['town',[['bakery','La boulangerie','le store de la boulangerie'],['firestation','La caserne','la caserne'],['school','L’école','le toit de l’école'],['playground','Le parc de jeux','le toboggan']]],
 ['castle',[['castle','Le château fort','le château'],['tower','La tour','la tour'],['drawbridge','Le pont-levis','les tours du pont-levis'],['tournament','Le tournoi','la tente du tournoi']]],
 ['space',[['rocket','La fusée','la fusée'],['station','La station spatiale','la station spatiale'],['rover','Le véhicule lunaire','le véhicule lunaire'],['observatory','L’observatoire','le dôme de l’observatoire']]],
 ['polar',[['igloo','L’igloo','l’igloo'],['icebreaker','Le bateau des glaces','la coque du bateau'],['colony','Les manchots','le grand iceberg'],['icepalace','Le palais de glace','le palais de glace']]],
 ['ocean',[['reef','Le récif de corail','le grand corail'],['wreck','L’épave','la coque de l’épave'],['submarine','Le sous-marin','le sous-marin'],['treasure','Le trésor englouti','le couvercle du coffre']]]
];
export const SCENE_CATALOG=rows.flatMap(([world,items])=>items.map(([hero,name,heroName])=>({id:hero,world,name,hero,heroName})));
export const sceneTheme=value=>SCENE_CATALOG.find(t=>t.id===value)||SCENE_CATALOG[0];
export function chooseSceneTheme(history=[],random=Math.random){const remaining=SCENE_CATALOG.filter(t=>!history.includes(t.id));return (remaining.length?remaining:SCENE_CATALOG.filter(t=>t.id!==history.at(-1)))[Math.floor(random()*(remaining.length||SCENE_CATALOG.length-1))].id;}

export function sceneBackdrop(themeId){
 const t=sceneTheme(themeId),w=SCENE_WORLDS[t.world];
 const backgrounds={
  countryside:path('M0 200Q100 105 220 185Q350 85 600 190V340H0Z','#b9cc91')+path('M0 290Q250 200 600 300V340H0Z','#d1dca9')+line('M20 245H590M20 270H590','#e9e1ba',6),
  beach:path('M0 170Q130 153 300 177Q450 157 600 170V340H0Z','#91bcc5')+path('M0 260Q130 198 270 265Q410 320 600 240V340H0Z','#eddbaf')+line('M0 195Q120 178 235 197M365 210Q450 193 600 205','#dfefdf',6),
  forest:path('M0 0H30V240H0ZM565 0H600V265H565Z','#9fae87')+path('M0 210Q110 166 235 205Q380 150 600 205V340H0Z','#a8bb87')+path('M235 340 290 200H310L390 340Z','#dbc7a0')+circle(15,60,75,'#a1b588')+circle(590,45,82,'#b2c397'),
  mountain:path('M0 225 115 25 245 216 355 9 560 226 600 160V340H0Z','#a6bcc0')+path('M74 95 115 25 170 111 128 91 109 112ZM305 87 355 9 412 81 367 58 344 88Z','#f5f0dd')+path('M0 262Q180 210 600 260V340H0Z','#d4dfc6'),
  town:rect(0,97,53,139,'#d8c9b6')+rect(510,70,90,180,'#d3bfba')+rect(549,48,51,52,'#c2b3b5')+path('M0 283H600V340H0Z','#b6b4aa')+line('M0 315H600','#eee0b6',5)+line('M0 270H600','#f1e7d0',9),
  castle:path('M0 190H600V274H0Z','#c3b9ae')+path('M0 190V166H35V181H66V166H98V181H130V166H162V181H194V166H226V181H258V166H290V181H322V166H354V181H386V166H418V181H450V166H482V181H514V166H546V181H578V166H600V190Z','#c3b9ae')+line('M0 223H600M0 250H600','#e0d4be',2)+path('M250 340 283 241H318L390 340Z','#e4d1ad'),
  space:[ [32,29],[158,56],[318,26],[452,90],[575,30],[545,142],[199,139],[416,34]].map(([x,y])=>circle(x,y,2,'#eee6c7')).join('')+circle(540,62,40,'#b5a0c1')+circle(527,51,9,'#9d8baa')+path('M0 256Q200 194 600 259V340H0Z','#b9afbf')+`<ellipse cx="320" cy="295" rx="45" ry="12" fill="#9b91a6"/><ellipse cx="570" cy="302" rx="23" ry="7" fill="#9b91a6"/>`,
  polar:path('M0 220 55 92 132 219 204 155 270 224 460 105 600 221V340H0Z','#bfdae0')+path('M0 245Q200 195 600 242V340H0Z','#f1f1e4')+path('M175 269 278 258 329 288 296 324 179 314ZM450 288 535 275 587 311 467 329Z','#a4c7d0')+line('M185 274 276 265 311 287M465 293 530 282 570 308','#dfebe2',3),
  ocean:path('M0 275Q150 234 300 282Q480 232 600 280V340H0Z','#ded0ab')+line('M7 265Q22 185 8 125M584 270Q568 198 591 141M557 266Q545 203 555 177','#7aab90',9)+[ [20,50,9],[175,30,6],[340,140,8],[564,80,12],[415,75,5]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#cee3db" stroke-width="3"/>`).join('')
 };
 // A small motif and a distinct landmark make each of the 36 compositions identifiable.
 return `<svg class="scene-backdrop" viewBox="0 0 600 340" preserveAspectRatio="none" aria-hidden="true"><rect width="600" height="340" fill="${w.sky}"/>${backgrounds[t.world]}</svg>`;
}

export function themedSlotMarkup(id,value,themeId,colors){
 const t=sceneTheme(themeId),w=SCENE_WORLDS[t.world];
 if(id==='house')return heroMarkup(t.hero,colors[value].fill);
 if(id==='tree')return objectIcon(w.nature[value],C.green);
 if(id==='animal')return objectIcon(w.subjects[value]);
 if(id==='flowers')return '<span class="garden-flowers scene-counted">'+Array.from({length:value},()=>'<span>'+objectIcon(w.count)+'</span>').join('')+'</span>';
 if(id==='ball')return objectIcon(w.prop,colors[value].fill);
 if(id==='kite')return svg(line('M50 42V96',C.brown,6)+rect(8,4,84,66,C.cream,9))+`<span class="scene-sign-shape">${shapeMarkup(['diamond','triangle','circle','square'][value],C.purple)}</span>`;
 if(id==='sun'&&t.world==='space')return objectIcon(value?'star':'planet',C.gold);
 if(id==='sun'&&t.world==='ocean')return objectIcon(value?'jellyfish':'bubble',C.purple);
 if(id==='cloud'&&['space','ocean','polar'].includes(t.world))return objectIcon(w.extra[value],C.blue);
 if(id==='bird')return objectIcon(w.extra[value],C.pink);
 if(id==='mushroom')return objectIcon(w.subjects[value?4:1],C.gold);
 return null;
}
