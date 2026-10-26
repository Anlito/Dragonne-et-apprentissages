import {dragonAppearance,evolutionChange,EQUIPMENT_NAMES,DRAGON_THEMES,GROWTH_NAMES} from './dragon-growth.mjs';
const $=selector=>document.querySelector(selector);
let dragon='dragonne',rank=1;
const rankName=level=>evolutionChange(level,dragon==='dragonne');
function draw(element,level){const look=dragonAppearance(level);element.style.backgroundImage="url('assets/evolutions/"+dragon+'/stage-'+(look.cell+1)+".png')";element.dataset.hatching=String(level<=10);element.setAttribute('aria-label',rankName(level));element.replaceChildren();}
function render(){
 draw($('#gallery-dragon-art'),rank);const look=dragonAppearance(rank);
 $('#gallery-rank').textContent='PALIER '+rank+' / 100';$('#gallery-output').textContent=rank;$('#gallery-level').value=rank;
 $('#gallery-name').textContent=rankName(rank);$('#gallery-points').textContent=(rank-1)*300+' étoiles cumulées';
 $('#gallery-change').textContent=rank<=10?'Une nouvelle étape de l’éclosion.':look.step===0?'Le corps grandit et sa tenue évolue. Les équipements gagnés restent dans sa collection.':'Nouvelle pièce améliorée : '+EQUIPMENT_NAMES[look.step-1]+'. Sa collection s’enrichit.';
 $('#gallery-prev').disabled=rank===1;$('#gallery-next').disabled=rank===100;
 $('#gallery-equipment').replaceChildren(...look.equipment.flatMap((tier,i)=>{if(!tier)return [];const li=document.createElement('li');li.textContent=EQUIPMENT_NAMES[i]+' · '+DRAGON_THEMES[tier-1];if(look.step===i+1)li.className='new-equipment';return [li];}));
 document.querySelectorAll('[data-gallery-rank]').forEach(button=>button.setAttribute('aria-current',String(Number(button.dataset.galleryRank)===rank)));
}
function select(value){rank=Math.max(1,Math.min(100,Number(value)));render();}
function cards(){
 $('#gallery-cards').replaceChildren(...Array.from({length:100},(_,i)=>{const button=document.createElement('button');button.className='evolution-card';button.dataset.galleryRank=i+1;button.setAttribute('aria-label','Palier '+(i+1)+' : '+evolutionChange(i+1));const art=document.createElement('span');art.className='rebirth-dragon';draw(art,i+1);const name=document.createElement('span');name.textContent=(i+1)+' · '+evolutionChange(i+1);button.append(art,name);button.onclick=()=>{select(i+1);$('.gallery-hero').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});};return button;}));
}
$('#gallery-dragon').onchange=e=>{dragon=e.target.value;document.body.dataset.profile=dragon;cards();render();};
$('#gallery-level').oninput=e=>select(e.target.value);$('#gallery-prev').onclick=()=>select(rank-1);$('#gallery-next').onclick=()=>select(rank+1);
$('#gallery-ages').replaceChildren(...[1,11,21,31,41,51,61,71,81,91,100].map(level=>{const button=document.createElement('button');button.textContent=level===1?'L’œuf':level===100?'100 · Légende':level+' · '+GROWTH_NAMES[(level-11)/10];button.onclick=()=>{select(level);$('.gallery-hero').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});};return button;}));cards();render();
