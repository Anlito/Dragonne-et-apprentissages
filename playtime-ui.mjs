import {todayPlaytime,remainingPlaytime,consumePlaytime,addPlaytimeBonus,parentMultiplication} from './playtime.mjs';
const $=s=>document.querySelector(s);
const duration=ms=>{const seconds=Math.ceil(ms/1000);return Math.floor(seconds/60)+' min '+String(seconds%60).padStart(2,'0')+' s';};
export function setupPlaytime(config){
 let running=null,last=performance.now(),savedAt=last,expired=false,bonusAnswer=null,bonusChild=null;
 const badge=document.createElement('span');badge.className='playtime-badge';badge.hidden=true;badge.setAttribute('aria-label','Temps de jeu restant');document.body.append(badge);
 const modal=document.createElement('dialog');modal.id='playtime-ended';modal.setAttribute('aria-labelledby','playtime-title');modal.innerHTML='<div class="playtime-moon" aria-hidden="true">☾</div><h2 id="playtime-title">Une pause pour ton dragon</h2><p>Le temps de jeu est terminé pour aujourd’hui.</p><button type="button" class="primary" id="playtime-home">⌂ Accueil</button><button type="button" class="reset-button" id="playtime-parent">Un parent ajoute du temps</button><form id="playtime-bonus-gate" hidden><p>Réservé aux parents : combien font <strong id="playtime-multiplication"></strong> ?</p><label>Réponse<input id="playtime-answer" type="number" inputmode="numeric" required autocomplete="off"></label><button class="primary">Valider</button><p id="playtime-gate-error" role="status"></p></form><form id="playtime-bonus-form" hidden><label>Minutes supplémentaires pour aujourd’hui<input id="playtime-bonus-minutes" type="number" min="1" max="240" value="10" required inputmode="numeric"></label><button class="primary">Ajouter ce temps</button><p id="playtime-bonus-error" role="status"></p></form>';document.body.append(modal);
 const playing=()=>!config.disabled&&!document.hidden&&!document.querySelector('dialog[open]')&&['game','memory','fluence'].some(id=>!$('#'+id).hidden);
 function state(){const child=config.profile();child.playtime=todayPlaytime(child.playtime);return child.playtime;}
 function paint(){const time=state(),hidden=!time.enabled||!playing();if(badge.hidden!==hidden)badge.hidden=hidden;badge.textContent='◷ '+duration(remainingPlaytime(time));}
 function block(){if(expired)return;expired=true;running=null;config.pause();config.persist();$('#playtime-bonus-gate').hidden=true;$('#playtime-bonus-form').hidden=true;$('#playtime-parent').hidden=false;bonusAnswer=null;bonusChild=null;if(!modal.open)modal.showModal();}
 function refresh(){
  if(config.disabled)return;
  const now=performance.now();
  if(running){running.playtime=consumePlaytime(running.playtime,now-last);if(now-savedAt>=1000){config.persist();savedAt=now;}}
  last=now;const time=state();running=playing()&&time.enabled?config.profile():null;
  if(running&&remainingPlaytime(time)===0)block();paint();
 }
 function flush(){refresh();config.persist();}
 $('#playtime-home').onclick=()=>{modal.close();expired=false;};
 modal.addEventListener('cancel',()=>{expired=false;});
 $('#playtime-parent').onclick=()=>{const challenge=parentMultiplication();bonusAnswer=challenge.answer;bonusChild=config.childId();$('#playtime-multiplication').textContent=challenge.question;$('#playtime-answer').value='';$('#playtime-gate-error').textContent='';$('#playtime-bonus-gate').hidden=false;$('#playtime-parent').hidden=true;$('#playtime-answer').focus();};
 $('#playtime-bonus-gate').onsubmit=e=>{e.preventDefault();if(bonusChild!==config.childId()||Number($('#playtime-answer').value)!==bonusAnswer){$('#playtime-gate-error').textContent='Réessaie.';return;}bonusAnswer=null;$('#playtime-bonus-gate').hidden=true;$('#playtime-bonus-form').hidden=false;$('#playtime-bonus-error').textContent='';$('#playtime-bonus-minutes').focus();};
 $('#playtime-bonus-form').onsubmit=e=>{e.preventDefault();if(bonusChild!==config.childId()||$('#playtime-bonus-form').hidden)return;try{config.profile().playtime=addPlaytimeBonus(state(),Number($('#playtime-bonus-minutes').value));config.persist();modal.close();expired=false;bonusChild=null;paint();}catch(error){$('#playtime-bonus-error').textContent=error.message;}};
 document.addEventListener('visibilitychange',flush);window.addEventListener('pagehide',()=>{flush();running=null;});
 window.addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
 window.addEventListener('storage',event=>{
  if(event.key!==config.storageKey||!event.newValue||config.preview)return;
  try{const remote=JSON.parse(event.newValue)?.profiles?.[config.childId()]?.playtime;if(!remote)return;const incoming=todayPlaytime(remote),local=state();config.profile().playtime={...incoming,usedMs:Math.max(incoming.usedMs,local.usedMs)};refresh();}catch{/* Une sauvegarde invalide ne remplace pas les réglages en mémoire. */}
 });
 new MutationObserver(refresh).observe(document.body,{subtree:true,attributes:true,attributeFilter:['hidden','open']});
 // Only change badge.hidden when needed: MutationObserver otherwise sees its own writes.
 setInterval(refresh,500);
 document.addEventListener('click',event=>{if(playing()){refresh();if(modal.open){event.preventDefault();event.stopImmediatePropagation();}}},true);
 return {
  canPlay(){if(config.disabled)return true;refresh();if(state().enabled&&remainingPlaytime(state())===0){block();return false;}return true;},
  parent(){
   let section=$('#playtime-settings');if(!section){section=document.createElement('section');section.id='playtime-settings';section.className='playtime-settings';section.innerHTML='<h3>Temps de jeu quotidien</h3><p>Réglage propre à cet enfant. Le temps compte pendant les jeux, tant que l’application est visible. L’accueil, les réglages et les aperçus parents ne comptent pas.</p><form id="playtime-settings-form"><label class="playtime-toggle"><input id="playtime-enabled" type="checkbox">Activer la limite quotidienne</label><label>Minutes par jour<input id="playtime-minutes" type="number" min="1" max="240" required inputmode="numeric"></label><p id="playtime-today"></p><button class="primary">Enregistrer la limite</button><p id="playtime-settings-result" role="status"></p></form><p>Le compteur repart à zéro chaque jour. Le bonus ne vaut que pour aujourd’hui et se débloque par une multiplication quand le temps est écoulé.</p>';document.querySelector('[data-parent-page="settings"]').prepend(section);$('#playtime-settings-form').onsubmit=e=>{e.preventDefault();const minutes=Number($('#playtime-minutes').value);if(!Number.isInteger(minutes)||minutes<1||minutes>240){$('#playtime-settings-result').textContent='Choisis entre 1 et 240 minutes.';return;}config.profile().playtime={...state(),enabled:$('#playtime-enabled').checked,minutes};config.persist();this.parent();$('#playtime-settings-result').textContent='Limite enregistrée pour '+config.profile().name+'.';};}
   const time=state();$('#playtime-enabled').checked=time.enabled;$('#playtime-minutes').value=time.minutes;$('#playtime-today').textContent='Aujourd’hui : '+duration(time.usedMs)+' jouées · '+duration(remainingPlaytime(time))+' restantes'+(time.bonusMinutes?' · bonus : '+time.bonusMinutes+' min':'')+'.';$('#playtime-settings-result').textContent='';
  }
 };
}
