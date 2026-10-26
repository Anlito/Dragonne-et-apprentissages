const $=s=>document.querySelector(s);
const GUIDES={colors:'Deux peintures à mélanger. L’enfant choisit la couleur obtenue.',shapes:'Reconnaître la forme prononcée.', 'animal-sounds':'100 cris enregistrés. Le bouton son joue le cri réel.',shadows:'Trouver l’ombre exacte de l’objet.',differences:'100 compositions et plusieurs types d’erreurs à repérer.',observation:'Observer 10 secondes, puis répondre sans revoir la scène.',letters:'Écouter une lettre puis la retrouver.',numbers:'Écouter un chiffre puis le retrouver.',counting:'Compter les objets ou les points du dé.',memory:'Retrouver les paires d’animaux.',arithmetic:'Calculs et jauges, sans consigne vocale.',multiply:'Choisir une table puis trouver le résultat.',fluency:'Lire pendant une minute et indiquer le dernier mot lu.','number-words':'Faire le lien entre le nombre entendu, les chiffres et les lettres.'};
let mounted=false,selected=null,frame=null,options;
export function setupParentPage(config){
 options=config;if(!mounted){mounted=true;const panel=$('#parent-options');panel.classList.add('parent-workspace');
  const nav=document.createElement('nav');nav.className='parent-nav';nav.setAttribute('aria-label','Rubriques du coin parent');
  const pages={};for(const [id,title] of [['activities','Activités et aperçus'],['challenge','Défi de 20'],['progress','Progression'],['settings','Réglages']]){const button=document.createElement('button');button.type='button';button.textContent=title;button.dataset.parentTab=id;button.onclick=()=>{for(const [key,page] of Object.entries(pages))page.hidden=key!==id;nav.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));if(id!=='activities')stopPreview();else if(selected&&!frame)loadPreview(selected);};nav.append(button);const section=document.createElement('section');section.className='parent-tab';section.dataset.parentPage=id;section.hidden=id!=='activities';pages[id]=section;}
  const activitySection=$('.activity-settings-section'),challenge=$('.challenge-settings'),fluence=$('.fluence-parent-settings');
  const profileHeader=document.createElement('header');profileHeader.className='parent-child-header';
  while(panel.firstChild&&panel.firstChild!==activitySection)profileHeader.append(panel.firstChild);
  const others=[...panel.children];for(const child of others){
   if(child===activitySection){pages.activities.append(child);continue;}if(child===challenge){pages.challenge.append(child);continue;}if(child===fluence){continue;}
   if(child.matches('.transfer-zone,.reset-zone,.all-ranks')||child.id==='rank-summary'||child.id==='preview-evolution'||child.tagName==='H3'||child.textContent.startsWith('À zéro étoile')||child.textContent.startsWith('Un changement tous'))pages.progress.append(child);else pages.settings.append(child);
  }
  // Long explanations belong to an optional help panel, rather than separating controls.
  const help=document.createElement('details');help.className='parent-help';const summary=document.createElement('summary');summary.textContent='Comprendre les règles et les points';help.append(summary);
  pages.settings.querySelectorAll(':scope > p:not([id])').forEach(p=>help.append(p));pages.settings.append(help);
  activitySection.querySelector('h3').textContent='Les activités de cet enfant';activitySection.querySelector('p').textContent='Choisis les jeux et leur difficulté. Ouvre un aperçu pour essayer exactement le même jeu, sans enregistrer de points.';
  const pickerLabel=document.createElement('label');pickerLabel.className='parent-activity-picker';pickerLabel.textContent='Choisir une activité';const picker=document.createElement('select');picker.id='parent-activity-picker';picker.innerHTML='<option value="">Tous les jeux</option>';for(const activity of config.activities){const option=document.createElement('option');option.value=activity.id;option.textContent=activity.label;picker.append(option);}pickerLabel.append(picker);activitySection.insertBefore(pickerLabel,activitySection.querySelector('#activity-settings'));picker.onchange=()=>{filterCards();if(picker.value)loadPreview(picker.value);};
  const preview=document.createElement('section');preview.id='parent-preview';preview.className='parent-preview';preview.hidden=true;preview.innerHTML='<header><h3 id="parent-preview-title"></h3><button type="button" id="preview-close" aria-label="Fermer l’aperçu">×</button></header><p id="parent-preview-guide"></p><div class="preview-toolbar"><button type="button" id="preview-new">↻ Nouvel exemple</button><button type="button" id="preview-sound">🔊 Écouter</button><label>Format <select id="preview-format"><option value="phone">Téléphone</option><option value="tablet">Tablette</option></select></label></div><p class="preview-note">Aperçu d’essai · aucun point ni record enregistré</p><div id="preview-stage"></div>';
  activitySection.replaceChildren(activitySection.querySelector('h3'),activitySection.querySelector('p'),pickerLabel,activitySection.querySelector('#activity-settings'),activitySection.querySelector('#activity-settings-status'));
  pages.activities.append(preview);panel.append(profileHeader,nav,...Object.values(pages));nav.firstChild.setAttribute('aria-pressed','true');
  $('#preview-close').onclick=()=>{stopPreview();preview.hidden=true;};$('#preview-new').onclick=()=>loadPreview(selected);$('#preview-sound').onclick=()=>frame?.contentWindow.postMessage({type:'dragon-preview-listen'},location.origin);$('#preview-format').onchange=e=>{$('#preview-stage').dataset.format=e.target.value;fitPreview();};new ResizeObserver(fitPreview).observe($('#preview-stage'));
  window.addEventListener('beforeunload',stopPreview);
  for(const id of ['edit-child','parent-add-child','preview-evolution'])$('#'+id).addEventListener('click',stopPreview,{capture:true});
  if(fluence){fluence.id='parent-fluence-controls';const details=document.createElement('details');details.className='parent-help';const summary=document.createElement('summary');summary.textContent='Modifier le texte de fluence';details.append(summary,fluence);pages.activities.append(details);}
 }
 enhanceActivityCards();
 if(selected)loadPreview(selected);
}
export function enhanceActivityCards(){
 if(!mounted)return;const rows=[...$('#activity-settings').querySelectorAll('.activity-setting')];
 rows.forEach((row,index)=>{const activity=options.activities[index];if(!activity)return;row.dataset.activityId=activity.id;const old=row.querySelector('.activity-preview-button');if(old)return;
  const note=document.createElement('p');note.className='activity-card-note';note.textContent=GUIDES[activity.id]||'Écouter, observer et répondre avec les propositions du jeu.';
  const button=document.createElement('button');button.type='button';button.className='activity-preview-button';button.textContent='Voir et écouter un exemple';button.onclick=()=>loadPreview(activity.id);row.append(note,button);
 });
 }
function filterCards(){const chosen=$('#parent-activity-picker')?.value;$('#activity-settings').dataset.filtered=String(!!chosen);$('#activity-settings').querySelectorAll('.activity-setting').forEach(row=>row.hidden=!!chosen&&row.dataset.activityId!==chosen);}
export function refreshParentPreview(){if(mounted){enhanceActivityCards();if(selected)loadPreview(selected);}}
function stopPreview(){if('speechSynthesis'in window)speechSynthesis.cancel();frame?.remove();frame=null;}
function fitPreview(){if(!frame)return;const stage=$('#preview-stage');if(stage.dataset.format==='tablet'){const scale=Math.min(1,stage.clientWidth/900),style=getComputedStyle(stage),border=parseFloat(style.borderTopWidth)+parseFloat(style.borderBottomWidth);frame.style.width='900px';frame.style.height='620px';frame.style.transformOrigin='top left';frame.style.transform='scale('+scale+')';stage.style.height=(620*scale+border)+'px';}else{frame.style.width='100%';frame.style.height='690px';frame.style.transform='none';stage.style.height='auto';}}
function loadPreview(id){
 if(!id)return;selected=id;stopPreview();const activity=options.activities.find(a=>a.id===id),profile=options.profile();if(!activity)return;$('#parent-activity-picker').value=id;filterCards();
 const panel=$('#parent-preview');panel.hidden=false;$('#parent-preview-title').textContent=activity.label+' · '+profile.name;$('#parent-preview-guide').textContent=GUIDES[id]||'Tu peux essayer les réponses et réécouter la consigne dans cet aperçu.';
 $('#preview-sound').disabled=['arithmetic','multiply','fluency'].includes(id);$('#preview-sound').title=$('#preview-sound').disabled?'Cette activité ne lit pas de consigne vocale.':'Écouter le vrai son ou la consigne de cet exemple';
 const url=new URL('./',location.href);url.searchParams.set('preview',id);url.searchParams.set('child',options.childId());url.searchParams.set('level',profile.activityLevels[id]||profile.difficulty);url.searchParams.set('example',Date.now());
 frame=document.createElement('iframe');frame.title='Aperçu interactif — '+activity.label;frame.style.visibility='hidden';const example=frame,silent=['arithmetic','multiply','fluency'].includes(id);$('#preview-sound').disabled=true;frame.onload=()=>{if(frame!==example)return;example.style.visibility='visible';$('#preview-sound').disabled=silent;};frame.src=String(url);frame.setAttribute('allow','autoplay');$('#preview-stage').append(frame);$('#preview-stage').dataset.format=$('#preview-format').value;fitPreview();
 panel.scrollIntoView({behavior:'smooth',block:'start'});
}
