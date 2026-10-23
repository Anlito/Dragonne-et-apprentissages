import {DEFAULT_FLUENCY_TEXT,fluencyTokens,fluencyWordCount,fluencyRecord,recordFluencyAttempt,normalizeFluencyText,createFluencyClock} from './fluency.mjs';
import {MATH_IDS,MATH_LEVELS,placementReward,arithmeticQuestion,multiplicationQuestion} from './maths.mjs';
import {READING_IDS,READING_META,readingChoices,readingQuestion,selectPiece,matchWord} from './reading.mjs';
import {ACTIVITIES} from './activities.mjs';
import {fingerMarkup} from './hands.mjs';
import {PROFILES_KEY,PREVIOUS_PROFILES_KEY,DRAGONS,DRAGON_IDS,loadProfiles,cleanProfile,createChild,updateChild} from './profiles.mjs';
import {createEvolutionGate} from './evolution.mjs';
import {COUNT_OBJECTS,DICE_PIPS,countingQuestion} from './counting.mjs';
import {ANIMALS,createMemory,flipMemory,settleMemory,memoryLayout} from './memory.mjs';
import {award,rankFor,question,numberQuestion,DIFFICULTIES,difficultyFor,RANK_THRESHOLDS,POINTS_PER_RANK,parsePoints} from './engine.mjs';
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function readSaved(key){try{return JSON.parse(localStorage.getItem(key));}catch{return null;}}
const accounts=loadProfiles(readSaved(PROFILES_KEY)??readSaved(PREVIOUS_PROFILES_KEY),readSaved('dragonne-v1'));
let activeId=accounts.activeId,state=accounts.profiles[activeId]||cleanProfile(null),profileChosen=false,editingProfileId=null;
const dragonMeta=()=>DRAGONS[state.dragonId];
const childLabel=()=>state.name;
const rankNames=()=>dragonMeta().ranks;
const activityDifficulty=()=>state.activityLevels?.[activeActivity]||state.difficulty;
const profile=()=>DIFFICULTIES[activityDifficulty()];
let activeActivity='letters', memoryBoard=null, memoryTimer, memoryStartScore=0, afterCelebration;
let selectedTable=null,mathRound=0;
const isMath=()=>MATH_IDS.includes(activeActivity);
const isReading=()=>READING_IDS.includes(activeActivity);
let fluencyClock=null,fluencyAttempt=null;
const activePage=()=>activeActivity==='fluency'?$('#fluence'):activeActivity==='memory'?$('#memory'):$('#game');
let evolutionGate=null;
let streak=0, completed=0, current=null, mistakes=0, locked=false, turnTimer, evolutionTimer, toastTimer, challengeAnswer, deferredInstall;
function save(){if(!activeId||!Object.hasOwn(accounts.profiles,activeId))return;try{accounts.activeId=activeId;accounts.profiles[activeId]=state;localStorage.setItem(PROFILES_KEY,JSON.stringify(accounts));renderProfileChoices();}catch{$('#storage-note').textContent='Le navigateur ne permet pas de conserver la progression. Elle reste disponible pendant cette partie.';}}
function setDragon(el,rank,id=state.dragonId){el.style.backgroundImage=`url('${DRAGONS[id].sprite}')`;const i=rank-1;el.style.backgroundPosition=`${(i%5)*25}% ${Math.floor(i/5)*50}%`;}
function render(){const rank=rankFor(state.score);$('#listen').hidden=isMath();$('#voice-note').hidden=isMath();$$('[data-score]').forEach(el=>el.textContent=state.score);$$('[data-rank]').forEach(el=>el.textContent=rank);$$('[data-progress]').forEach(el=>el.style.width=`${rank===15?100:(state.score%POINTS_PER_RANK)/POINTS_PER_RANK*100}%`);$$('.dragon').forEach(el=>setDragon(el,rank));$('.rank-label').innerHTML=`${rankNames()[rank-1]} · <span data-rank>${rank}</span>/15`;$('#streak').textContent=`Série · ${streak}`;$('#difficulty').textContent=`${profile().label} · ${isMath()?(activeActivity==='multiply'?(selectedTable?'Table de '+selectedTable:'Tables'):current?.mode==='line'?'Jauge':MATH_LEVELS[activityDifficulty()].choices+' choix'):isReading()?(activeActivity==='traps'?'2 choix':activeActivity==='link-words'?'3 mots':activeActivity==='build-word'?({easy:4,medium:6,hard:8})[activityDifficulty()]+' choix':readingChoices(activityDifficulty())+' choix'):activeActivity==='counting'?profile().numbers+' choix':activeActivity==='numbers'?profile().numbers+' choix':profile().letters+' lettres'}`;document.body.classList.toggle('reduce-motion',!state.motion);document.body.dataset.profile=state.dragonId;$$('.dragon').forEach(el=>el.setAttribute('aria-label',dragonMeta().companion));setDragon($('.profile-avatar'),rank);$('#profile-toggle').setAttribute('aria-label','Changer d’enfant, '+childLabel());$('#greet').setAttribute('aria-label','Voir '+(state.dragonId==='dragonne'?'la dragonne':'le dragon')+' en grand');$('#evolution-title').textContent=dragonMeta().companion+' grandit !';renderProfileChoices();renderActivities();}
function say(text,done){
  let finished=false;const finish=()=>{if(finished)return;finished=true;done?.();};
  if(!state.sound||!('speechSynthesis'in window)){finish();return;}
  try{speechSynthesis.cancel();const utter=new SpeechSynthesisUtterance(text);utter.lang='fr-FR';utter.rate=.82;const voice=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('fr'));if(voice)utter.voice=voice;utter.onend=finish;utter.onerror=finish;speechSynthesis.speak(utter);}catch{finish();}
}
let audio;function chime(big=false){if(!state.sound)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();(big?[523.25,659.25,783.99,1046.5]:[659.25,783.99]).forEach((f,i)=>{const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime+i*.13;o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.07,t+.015);g.gain.exponentialRampToValueAtTime(.001,t+.3);o.connect(g);g.connect(audio.destination);o.start(t);o.stop(t+.31);});}catch{}}
function toast(text){clearTimeout(toastTimer);$('#toast').textContent=text;$('#toast').hidden=false;toastTimer=setTimeout(()=>$('#toast').hidden=true,2600);}
function listen(){if(!current||isMath())return;$('#voice-note').classList.toggle('voice-warning',!state.sound||!('speechSynthesis'in window));if(!state.sound){$('#voice-note').textContent='La voix est désactivée dans le coin parent.';return;}if(!('speechSynthesis'in window)){$('#voice-note').textContent='La voix n’est pas disponible dans ce navigateur.';return;}say(isReading()||isMath()?current.prompt:activeActivity==='counting'?current.prompt:`Trouve ${activeActivity==='numbers'?'le chiffre':'la lettre'} ${current.target}.`);$('#voice-note').textContent='Tu peux réécouter autant que tu veux.';}
function dots(){$('#session-dots').replaceChildren(...Array.from({length:10},(_,i)=>{const el=document.createElement('i');if(i<completed%10||(completed>0&&completed%10===0))el.className='done';return el;}));}
function next(){
  if($('#game').hidden)return;if(isMath()){nextMath();return;}if(isReading()){nextReading();return;}clearQuestionTransition();$('#game').classList.remove('question-enter');void $('#game').offsetWidth;$('#game').classList.add('question-enter');locked=false;mistakes=0;
  $('#choices').hidden=false;
  const numeric=activeActivity==='numbers'||activeActivity==='counting';current=activeActivity==='counting'?countingQuestion(profile().numbers,current?.target):numeric?numberQuestion(profile().numbers,current?.target):question(profile().letters,current?.target);if(activeActivity==='counting')renderCounting();
  $('#choices').classList.toggle('alphabet',!numeric&&profile().letters>=13);$('#choices').classList.toggle('numberpad',numeric);
  const fingerAnswers=numeric&&activityDifficulty()!=='hard';
  $('#choices').classList.toggle('fingerpad',fingerAnswers);$('#choices').style.setProperty('--answer-rows',fingerAnswers?Math.ceil(profile().numbers/3):3);
  const values=fingerAnswers?current.choices:numeric?Array.from({length:activeActivity==='counting'?profile().maxQuantity:9},(_,i)=>i+1):current.choices;
  $('#choices').replaceChildren(...values.map(value=>{
    if(numeric&&!current.choices.includes(value)){const gap=document.createElement('span');gap.className='number-space';gap.setAttribute('aria-hidden','true');return gap;}
    const el=document.createElement('button');el.className=numeric?'letter number-key':'letter';if(fingerAnswers){el.classList.add('finger-choice');el.innerHTML=fingerMarkup(value)+(activityDifficulty()==='medium'?'<span class="answer-digit">'+value+'</span>':'');el.setAttribute('aria-label',value+(value===1?' doigt':' doigts')+(activityDifficulty()==='medium'?' et chiffre '+value:''));}else{el.textContent=value;el.setAttribute('aria-label',(numeric?'Chiffre ':'Lettre ')+value);}el.onclick=()=>choose(value,el);return el;
  }));
  $('#feedback').textContent='Prends ton temps, tu peux réécouter.';dots();listen();
}
function choose(letter,el){if(locked||el.disabled)return;if(letter!==current.target){mistakes++;streak=0;el.classList.add('removed');el.disabled=true;el.setAttribute('aria-hidden','true');$('#feedback').textContent='Un choix en moins. Essaie encore !';say(activeActivity==='counting'?'Compte encore, puis choisis la bonne réponse.':`Essaie encore. Trouve ${activeActivity==='numbers'?'le chiffre':'la lettre'} ${current.target}.`);render();return;}locked=true;el.classList.add('correct');const oldRank=rankFor(state.score),result=award(state.score,streak,mistakes);state.score=result.score;streak=result.streak;completed++;save();render();dots();$('#feedback').textContent=`Bravo ! +${result.points} ${result.points===1?'étoile':'étoiles'}${result.bonus?' et +5 de bonus':''} !`;chime();say(result.bonus?'Bravo ! Tu gagnes un bonus !':'Bravo, tu as trouvé !');celebrateQuestion(result,rankFor(state.score)>oldRank);}
function clearQuestionTransition(){$('#fluence').classList.remove('celebrating');
  $('#question-transition').hidden=true;
  $('#question-transition').classList.remove('leaving');
  $('#game').classList.remove('celebrating');$('#memory').classList.remove('celebrating');
}
function celebrateQuestion(result,evolves,continuation=next){
  afterCelebration=continuation;
  $('#game').classList.remove('question-enter');
  $('#reward-points').textContent='+'+(result.points+result.bonus);
  $('#reward-caption').textContent=result.bonus?'Étoiles et bonus !':result.points===0?'On continue à s’entraîner !':result.points===1?'Une étoile gagnée !':'Étoiles gagnées !';
  $('#question-transition').hidden=false;
  activePage().classList.add('celebrating');
  turnTimer=setTimeout(()=>finishQuestionTransition(evolves),2200);
}
function finishQuestionTransition(evolves){
  if(activePage().hidden){clearQuestionTransition();return;}
  if($('#parent').open||$('#companion-view').open){turnTimer=setTimeout(()=>finishQuestionTransition(evolves),300);return;}
  $('#question-transition').classList.add('leaving');
  turnTimer=setTimeout(()=>{clearQuestionTransition();if(evolves)showEvolution(false);else afterCelebration();},state.motion?300:0);
}
function showEvolution(preview){
  clearTimeout(turnTimer);clearTimeout(evolutionTimer);evolutionGate?.stop();
  const dialog=$('#evolution');dialog.dataset.preview=String(preview);$('#evolution-rank').textContent=`${rankNames()[rankFor(state.score)-1]} · Palier ${rankFor(state.score)}`;dialog.showModal();
  const dragon=dialog.querySelector('.dragon');dragon.style.animation='none';void dragon.offsetWidth;dragon.style.animation='';chime(true);
  const gate=createEvolutionGate({minDuration:state.motion?3400:1400,onComplete:()=>{if(evolutionGate===gate&&dialog.open)closeEvolution();}});evolutionGate=gate;
  say(dragonMeta().companion+' grandit ! Quelle belle aventure !',()=>{if(evolutionGate!==gate||!dialog.open)return;evolutionTimer=setTimeout(()=>gate.speechFinished(),350);});
}
function closeEvolution(){
  clearTimeout(evolutionTimer);evolutionGate?.stop();evolutionGate=null;const dialog=$('#evolution');if(!dialog.open)return;
  const preview=dialog.dataset.preview==='true';if('speechSynthesis'in window)speechSynthesis.cancel();dialog.close();if(!preview&&!activePage().hidden)afterCelebration();
}
$('#skip-evolution').onclick=closeEvolution;$('#evolution').addEventListener('cancel',e=>{e.preventDefault();closeEvolution();});
function startListeningActivity(kind){
  if(kind==='fluency'){startFluency();return;}
  if(MATH_IDS.includes(kind)){startMath(kind);return;}if(READING_IDS.includes(kind)){startReading(kind);return;}
  if(!state.activities[kind])return;
  clearTimeout(turnTimer);clearTimeout(memoryTimer);clearQuestionTransition();document.body.classList.remove('memory-active','reading-active','math-active','fluency-active');$('#reading-board').hidden=true;$('#choices').className='choices';$('#choices').hidden=false;document.body.classList.toggle('numbers-active',kind==='numbers'||kind==='counting');document.body.classList.toggle('counting-active',kind==='counting');activeActivity=kind;
  $('#memory').hidden=true;$('#welcome').hidden=true;$('#game').hidden=false;window.scrollTo(0,0);streak=0;completed=0;current=null;
  $('#count-board').hidden=kind!=='counting';$('.question h1').textContent=kind==='counting'?'Combien y en a ?':'Écoute et retrouve';$('#activity-label').textContent=kind==='counting'?'JE COMPTE':kind==='numbers'?'LES CHIFFRES':'LES LETTRES';$('#listen').setAttribute('aria-label',kind==='counting'?'Réécouter la question':kind==='numbers'?'Réécouter le chiffre':'Réécouter la lettre');$('#choices').setAttribute('aria-label',kind==='letters'?'Choisis la lettre':'Choisis le chiffre');
  render();next();fitNumberScreen();
}
$('#letters').onclick=()=>startListeningActivity('letters');$('#numbers-start').onclick=()=>startListeningActivity('numbers');$('#counting-start').onclick=()=>startListeningActivity('counting');
function returnHome(){stopFluency();$('#fluence').hidden=true;clearTimeout(evolutionTimer);evolutionGate?.stop();evolutionGate=null;if($('#evolution').open)$('#evolution').close();document.body.classList.remove('memory-active','numbers-active','counting-active','reading-active','math-active','fluency-active');clearTimeout(turnTimer);clearTimeout(memoryTimer);$('#memory').hidden=true;clearQuestionTransition();if('speechSynthesis'in window)speechSynthesis.cancel();$('#game').hidden=true;$('#welcome').hidden=false;window.scrollTo(0,0);current=null;locked=false;streak=0;completed=0;afterCelebration=null;render();}
$('#home').onclick=returnHome;
$('#listen').onclick=listen;$('#greet').onclick=openCompanion;
$$('[data-soon]').forEach(el=>el.onclick=()=>{toast('Cette activité arrive bientôt !');say(`${el.dataset.soon} arrive bientôt. Tu peux jouer aux lettres !`);});
$('#settings').onclick=()=>{$('#reset-confirmation').hidden=true;$('#reset-progress').hidden=false;$('#reset-result').textContent='';const a=4+Math.floor(Math.random()*5),b=3+Math.floor(Math.random()*6);challengeAnswer=a+b;$('#challenge').textContent=`${a} + ${b}`;$('#parent-gate').hidden=false;$('#parent-options').hidden=true;$('#gate-answer').value='';$('#gate-error').textContent='';$('#parent').showModal();};
$('#gate-form').onsubmit=e=>{e.preventDefault();if(Number($('#gate-answer').value)!==challengeAnswer){$('#gate-error').textContent='Réessaie.';return;}$('#parent-gate').hidden=true;$('#parent-options').hidden=false;renderParentSettings();};
function renderParentSettings(){renderFluencyParent();renderChildSelect();renderActivitySettings();$('#reset-confirmation').hidden=true;$('#reset-progress').hidden=false;$('#reset-result').textContent='';$('#parent-profile').value=activeId;$('#parent-profile-note').textContent='Réglages et progression de '+childLabel()+' uniquement.';$('#level').value=state.difficulty;$('#manual-points').value=state.score;$('#points-result').textContent='';previewPoints();renderDifficulty();renderRanks();$('#sound').checked=state.sound;$('#motion').checked=state.motion;}
function renderRanks(){const rank=rankFor(state.score);$('#rank-summary').textContent=rank===15?`${state.score} étoiles · dernier palier atteint !`:`${state.score} étoiles · palier ${rank}/15 · encore ${RANK_THRESHOLDS[rank]-state.score} étoiles avant le suivant.`;$('#rank-rows').replaceChildren(...RANK_THRESHOLDS.map((points,i)=>{const row=document.createElement('tr');const level=document.createElement('th'),name=document.createElement('td'),threshold=document.createElement('td');level.textContent=String(i+1);name.textContent=rankNames()[i]+(rank===i+1?' · actuel':'');threshold.textContent=String(points);row.append(level,name,threshold);return row;}));}
function renderDifficulty(){const p=DIFFICULTIES[state.difficulty];$('#difficulty-summary').textContent=`${p.letters} lettres proposées · ${p.numbers} réponses en nombres (${state.difficulty==='easy'?'doigts':state.difficulty==='medium'?'doigts et chiffres':'chiffres'}) · ${p.memoryPairs} paires (${p.memoryPairs*2} cartes) · lecture : ${readingChoices(state.difficulty)} choix · quantités de 1 à 9 avec ${p.numbers} propositions.`;}
$('#level').onchange=e=>{state.difficulty=e.target.value;save();render();renderDifficulty();renderActivitySettings();if(!activePage().hidden){clearTimeout(turnTimer);clearQuestionTransition();if(activeActivity==='memory')startMemory();else next();}};
$('#sound').onchange=e=>{state.sound=e.target.checked;if(!state.sound&&'speechSynthesis'in window)speechSynthesis.cancel();save();};
$('#motion').onchange=e=>{state.motion=e.target.checked;save();render();};
$('#preview-evolution').onclick=()=>{if($('#question-transition').hidden)showEvolution(true);else toast('Ferme le coin parent pour terminer la récompense.');};
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;$('#install').hidden=false;});$('#install').onclick=async()=>{if(deferredInstall){await deferredInstall.prompt();deferredInstall=null;$('#install').hidden=true;}};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&'speechSynthesis'in window)speechSynthesis.cancel();});
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>toast('Le mode hors connexion n’a pas pu être activé.'));
render();

function startMemory(){
  if(!state.activities.memory)return;
  clearTimeout(memoryTimer);clearTimeout(turnTimer);clearQuestionTransition();
  activeActivity='memory';document.body.classList.remove('numbers-active','counting-active','reading-active','math-active','fluency-active');document.body.classList.add('memory-active');$('#welcome').hidden=true;$('#game').hidden=true;$('#memory').hidden=false;$('#memory-finish').hidden=true;
  streak=0;memoryStartScore=state.score;memoryBoard=createMemory(profile().memoryPairs);window.scrollTo(0,0);
  const board=$('#memory-board');board.dataset.pairs=memoryBoard.pairs;
  board.replaceChildren(...memoryBoard.cards.map((card,index)=>{
    const button=document.createElement('button');button.className='memory-card';button.type='button';
    const back=document.createElement('span');back.className='memory-back';back.textContent='✦';back.setAttribute('aria-hidden','true');
    const front=document.createElement('span');front.className='memory-front';front.setAttribute('aria-hidden','true');
    const animal=document.createElement('span');animal.className='animal-face';animal.style.backgroundPosition=((card.animal%4)*100/3)+'% '+(Math.floor(card.animal/4)*100/3)+'%';front.append(animal);button.append(back,front);button.onclick=()=>chooseMemory(index);return button;
  }));
  $('#memory-feedback').textContent='Retourne deux cartes pour trouver une paire.';renderMemory();render();fitMemoryScreen();memoryHelp();
}
function renderMemory(){
  $('#memory-found').textContent=memoryBoard.found+' / '+memoryBoard.pairs+' paires';$('#memory-difficulty').textContent=profile().label;
  [...$('#memory-board').children].forEach((button,index)=>{const card=memoryBoard.cards[index];button.classList.toggle('revealed',card.revealed);button.classList.toggle('matched',card.matched);button.disabled=card.matched||memoryBoard.busy;button.setAttribute('aria-label',card.revealed?ANIMALS[card.animal]+(card.matched?' · paire trouvée':''):'Carte '+(index+1)+' face cachée');button.setAttribute('aria-pressed',String(card.revealed));});
}
function memoryHelp(){say('Retourne deux cartes. Retrouve les deux mêmes animaux !');}
function chooseMemory(index){
  if($('#memory').hidden)return;const result=flipMemory(memoryBoard,index);if(result.type==='ignored')return;renderMemory();
  if(result.type==='first'){say(ANIMALS[result.animal]);$('#memory-feedback').textContent='Cherche le même animal.';return;}
  if(result.type==='mismatch'){streak=0;render();$('#memory-feedback').textContent='Pas pareil… souviens-toi de ces animaux !';memoryTimer=setTimeout(finishMemoryMismatch,1500);return;}
  const oldRank=rankFor(state.score),reward=award(state.score,streak,result.mistakes);state.score=reward.score;streak=reward.streak;save();render();
  $('#memory-feedback').textContent='Une paire trouvée ! +'+reward.points+(reward.bonus?' et +5 de bonus':'')+(reward.points===1&&!reward.bonus?' étoile.':' étoiles.');chime();
  celebrateQuestion(reward,rankFor(state.score)>oldRank,()=>{settleMemory(memoryBoard);renderMemory();if(result.complete){$('#memory-finish').hidden=false;$('#memory-total').textContent=(state.score-memoryStartScore)+' étoiles gagnées pendant cette partie.';$('#memory-feedback').textContent='Bravo ! Tu peux rejouer quand tu veux.';}else $('#memory-feedback').textContent='À toi de trouver une nouvelle paire !';});
}
function finishMemoryMismatch(){if($('#memory').hidden)return;if($('#parent').open){memoryTimer=setTimeout(finishMemoryMismatch,300);return;}settleMemory(memoryBoard);renderMemory();$('#memory-feedback').textContent='Retourne deux autres cartes. Tu peux y arriver !';}
$('#memory-start').onclick=startMemory;$('#memory-replay').onclick=startMemory;$('#memory-help').onclick=memoryHelp;

let memoryFitFrame;
function fitMemoryScreen(){
  cancelAnimationFrame(memoryFitFrame);
  memoryFitFrame=requestAnimationFrame(()=>{
    if($('#memory').hidden||!memoryBoard)return;
    document.documentElement.style.setProperty('--memory-viewport',(window.visualViewport?.height||window.innerHeight)+'px');
    const board=$('#memory-board'),gap=window.innerWidth<500?8:10;
    const layout=memoryLayout(memoryBoard.cards.length,board.clientWidth,board.clientHeight,gap);
    board.style.setProperty('--memory-columns',layout.columns);board.style.setProperty('--memory-rows',layout.rows);board.style.setProperty('--memory-gap',gap+'px');
  });
}
window.addEventListener('resize',fitMemoryScreen);
window.visualViewport?.addEventListener('resize',fitMemoryScreen);
if('ResizeObserver'in window)new ResizeObserver(fitMemoryScreen).observe($('#memory-board'));

function fitNumberScreen(){if(!$('#game').hidden&&(activeActivity==='numbers'||activeActivity==='counting'))document.documentElement.style.setProperty('--numbers-viewport',(window.visualViewport?.height||window.innerHeight)+'px');}
window.addEventListener('resize',fitNumberScreen);window.visualViewport?.addEventListener('resize',fitNumberScreen);

$('#reset-progress').onclick=()=>{$('#reset-confirmation').hidden=false;$('#reset-progress').hidden=true;$('#reset-result').textContent='';$('#reset-cancel').focus();};
$('#reset-cancel').onclick=()=>{$('#reset-confirmation').hidden=true;$('#reset-progress').hidden=false;$('#reset-progress').focus();};
function applyPoints(points){
  clearTimeout(turnTimer);clearTimeout(memoryTimer);clearTimeout(evolutionTimer);evolutionGate?.stop();evolutionGate=null;clearQuestionTransition();if($('#evolution').open)$('#evolution').close();if('speechSynthesis'in window)speechSynthesis.cancel();
  state.score=points;streak=0;completed=0;save();
  if(!activePage().hidden){if(activeActivity==='memory')startMemory();else startListeningActivity(activeActivity);}else render();
  renderRanks();$('#manual-points').value=state.score;previewPoints();
}
$('#reset-confirm').onclick=()=>{applyPoints(0);$('#reset-confirmation').hidden=true;$('#reset-progress').hidden=false;$('#reset-result').textContent='Progression de ce profil remise à zéro : 0 étoile, palier 1.';$('#points-result').textContent='';$('#reset-progress').focus();};
function renderCounting(){
  const board=$('#count-board');board.replaceChildren();$('#choices').style.setProperty('--answer-rows',Math.ceil(profile().maxQuantity/3));
  if(current.kind==='dice'){
    const die=document.createElement('div');die.className='paper-die';die.setAttribute('role','img');die.setAttribute('aria-label','Un dé : compte les points');
    for(let position=1;position<=9;position++){const dot=document.createElement('span');dot.className=DICE_PIPS[current.target].includes(position)?'die-dot':'die-gap';dot.setAttribute('aria-hidden','true');die.append(dot);}board.append(die);
  }else{
    const objects=document.createElement('div');objects.className='count-objects';objects.style.setProperty('--object-columns',Math.min(3,current.target));objects.style.setProperty('--object-rows',Math.ceil(current.target/3));
    for(let i=0;i<current.target;i++){const slot=document.createElement('span');slot.className='count-item';slot.setAttribute('role','img');slot.setAttribute('aria-label',COUNT_OBJECTS[current.object].name);const sprite=document.createElementNS('http://www.w3.org/2000/svg','svg');sprite.setAttribute('class','count-sprite');sprite.setAttribute('viewBox','0 0 100 100');const clip=document.createElementNS('http://www.w3.org/2000/svg','clipPath');clip.setAttribute('id','count-crop-'+i);const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');rect.setAttribute('width','100');rect.setAttribute('height','100');clip.append(rect);sprite.append(clip);sprite.setAttribute('aria-hidden','true');const art=document.createElementNS('http://www.w3.org/2000/svg','image');art.setAttribute('href','assets/objets.png');art.setAttribute('width','200');art.setAttribute('height','200');art.setAttribute('x',-(current.object%2)*100);art.setAttribute('y',-Math.floor(current.object/2)*100);art.setAttribute('clip-path','url(#count-crop-'+i+')');sprite.append(art);slot.append(sprite);objects.append(slot);}board.append(objects);
  }
}

function previewPoints(){const points=parsePoints($('#manual-points').value);$('#points-preview').textContent=points===null?'Indique un nombre entier positif ou nul.':points+' étoiles · palier '+rankFor(points)+'/15 · '+rankNames()[rankFor(points)-1];}
$('#manual-points').oninput=previewPoints;
$('#points-form').onsubmit=event=>{event.preventDefault();const points=parsePoints($('#manual-points').value);if(points===null){$('#points-result').textContent='Indique un nombre entier positif ou nul.';return;}applyPoints(points);$('#points-result').textContent=points+' étoiles enregistrées pour '+childLabel()+'. Palier '+rankFor(points)+'/15.';$('#reset-result').textContent='';};

function renderProfileChoices(){
 const grid=$('#child-profiles');grid.replaceChildren(...accounts.order.map(id=>{
  const child=accounts.profiles[id],card=document.createElement('button');card.type='button';card.className='profile-card';card.dataset.child=id;card.dataset.dragon=child.dragonId;card.classList.toggle('selected',profileChosen&&id===activeId);card.setAttribute('aria-label','Continuer avec '+child.name);
  const art=document.createElement('span');art.className='child-portrait';const dragon=document.createElement('span');dragon.className='profile-dragon';dragon.setAttribute('aria-hidden','true');setDragon(dragon,rankFor(child.score),child.dragonId);
  const name=document.createElement('strong');name.className='child-portrait-name';name.textContent=child.name;art.append(dragon,name);
  const score=document.createElement('span');score.className='profile-score';score.textContent='★ '+child.score+' · Palier '+rankFor(child.score);
  const level=document.createElement('small');level.className='profile-level';level.textContent=DIFFICULTIES[child.difficulty].label;card.append(art,score,level);card.onclick=()=>selectProfile(id);return card;
 }));$('#profiles-empty').hidden=accounts.order.length!==0;
}
function showProfileChooser(){
 $('#profile-chooser').hidden=false;$('#profile-create-form').hidden=true;$('#profiles-title').textContent='Qui joue ?';$('#profiles-back').hidden=!profileChosen;renderProfileChoices();if(!$('#profiles').open)$('#profiles').showModal();
}
function selectProfile(id){
 if(!Object.hasOwn(accounts.profiles,id))return;
 if(accounts.profiles[id].needsName){beginProfileEditor(id);return;}
 save();returnHome();activeId=id;accounts.activeId=id;state=accounts.profiles[id];profileChosen=true;memoryBoard=null;save();render();
 if($('#profiles').open)$('#profiles').close();if($('#parent').open)renderParentSettings();
}
function renderChildSelect(){
 $('#parent-profile').replaceChildren(...accounts.order.map(id=>{const option=document.createElement('option');option.value=id;option.textContent=accounts.profiles[id].name;return option;}));$('#parent-profile').value=activeId;
}
function beginProfileEditor(id=null){
 returnHome();editingProfileId=id;const child=id?accounts.profiles[id]:null;
 $('#profile-chooser').hidden=true;$('#profile-create-form').hidden=false;$('#profiles-title').textContent=child?(child.needsName?'Quel est son prénom ?':'Modifier le profil'):'Ajouter un enfant';
 $('#child-firstname').value=child&&!child.needsName?child.name:'';$('#profile-form-error').textContent='';$('#profile-save').textContent=child?'Enregistrer et continuer':'Créer et continuer';
 $('#dragon-options').replaceChildren(...DRAGON_IDS.map(dragonId=>{
  const label=document.createElement('label');label.className='dragon-option';label.dataset.dragon=dragonId;
  const input=document.createElement('input');input.type='radio';input.name='dragon-choice';input.value=dragonId;input.required=true;input.checked=dragonId===(child?.dragonId||'dragonne');
  const art=document.createElement('span');art.className='dragon-option-image';art.setAttribute('aria-hidden','true');setDragon(art,child?rankFor(child.score):1,dragonId);
  const name=document.createElement('strong');name.textContent=DRAGONS[dragonId].label;label.append(input,art,name);return label;
 }));
 if(!$('#profiles').open)$('#profiles').showModal();$('#child-firstname').focus();
}
$('#profile-toggle').onclick=()=>{returnHome();showProfileChooser();};
$('#profiles-back').onclick=()=>$('#profiles').close();
$('#profiles').addEventListener('cancel',event=>{if(!$('#profile-create-form').hidden){event.preventDefault();showProfileChooser();}else if(!profileChosen)event.preventDefault();});
$('#parent-profile').onchange=event=>selectProfile(event.target.value);
$('#add-child').onclick=()=>beginProfileEditor();$('#parent-add-child').onclick=()=>beginProfileEditor();$('#edit-child').onclick=()=>beginProfileEditor(activeId);
$('#profile-cancel').onclick=showProfileChooser;
$('#profile-create-form').onsubmit=event=>{
 event.preventDefault();const checked=$('input[name="dragon-choice"]:checked');
 try{
  const details={name:$('#child-firstname').value,dragonId:checked?.value};
  const id=editingProfileId;if(id)updateChild(accounts,id,details);const selectedId=id||createChild(accounts,details);selectProfile(selectedId);
 }catch(error){$('#profile-form-error').textContent=error.message;}
};
showProfileChooser();

function openCompanion(){render();$('#companion-title').textContent=dragonMeta().label+(/^[aeiouyhàâäéèêëîïôöùûüœ]/i.test(childLabel())?' d’':' de ')+childLabel();$('#companion-rank').textContent=rankNames()[rankFor(state.score)-1]+' · Palier '+rankFor(state.score)+'/15';$('#companion-view').showModal();}
$$('.companion-open').forEach(button=>button.onclick=openCompanion);
$('#companion-view').addEventListener('click',event=>{if(event.target!==event.currentTarget)return;const r=event.currentTarget.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.currentTarget.close();});

function renderActivities(){
  let visible=0;
  for(const activity of ACTIVITIES){const shown=state.activities[activity.id];$('#'+activity.button).hidden=!shown;if(shown)visible++;}
  $('#activities-empty').hidden=visible!==0;
}
function renderActivitySettings(){
 $('#activity-settings').replaceChildren(...ACTIVITIES.map(activity=>{
  const row=document.createElement('div');row.className='activity-setting';const label=document.createElement('label');label.className='activity-setting-top';
  const art=document.createElement('span');art.className=activity.studyTile!==undefined?'tile study-tile study-tile-'+activity.studyTile:activity.mathTile!==undefined?'tile math-tile math-tile-'+activity.mathTile:activity.readingTile===undefined?'tile tile-'+activity.tile:'tile reading-tile reading-tile-'+activity.readingTile;art.setAttribute('aria-hidden','true');
  const text=document.createElement('span');text.textContent=activity.label;
  const input=document.createElement('input');input.type='checkbox';input.checked=state.activities[activity.id];input.setAttribute('aria-label','Afficher '+activity.label);
  input.onchange=()=>{state.activities[activity.id]=input.checked;save();if(!input.checked&&activeActivity===activity.id&&!activePage().hidden)returnHome();else renderActivities();$('#activity-settings-status').textContent=(input.checked?'Activité affichée':'Activité masquée')+' pour '+childLabel()+'.';};
  label.append(art,text,input);row.append(label);
  if(READING_IDS.includes(activity.id)||MATH_IDS.includes(activity.id)){
   const control=document.createElement('label');control.className='activity-level-control';control.textContent='Niveau';const select=document.createElement('select');select.setAttribute('aria-label','Difficulté — '+activity.label);
   for(const [value,name] of [['','Niveau du profil'],['easy','Facile'],['medium','Moyen'],['hard','Difficile']]){const option=document.createElement('option');option.value=value;option.textContent=name;select.append(option);}
   select.value=state.activityLevels[activity.id]||'';select.onchange=()=>{if(select.value)state.activityLevels[activity.id]=select.value;else delete state.activityLevels[activity.id];save();render();if(activeActivity===activity.id&&!activePage().hidden){clearTimeout(turnTimer);clearQuestionTransition();next();}$('#activity-settings-status').textContent='Niveau enregistré pour '+activity.label+' · '+childLabel()+'.';};control.append(select);row.append(control);
  }
  return row;
 }));$('#activity-settings-status').textContent='';
}

// Activités de lecture : même progression, mêmes transitions que les jeux existants.
for(const id of READING_IDS)$('#'+id+'-start').onclick=()=>startReading(id);
function startReading(kind){
 if(!state.activities[kind])return;
 clearTimeout(turnTimer);clearTimeout(memoryTimer);clearQuestionTransition();
 stopFluency();$('#fluence').hidden=true;document.body.classList.remove('memory-active','numbers-active','counting-active','math-active','fluency-active');document.body.classList.add('reading-active');
 activeActivity=kind;$('#game').dataset.reading=kind;current=null;streak=0;completed=0;locked=false;
 $('#welcome').hidden=true;$('#memory').hidden=true;$('#game').hidden=false;$('#count-board').hidden=true;
 $('#reading-board').hidden=false;$('#choices').className='choices reading-choices';
 $('.question h1').textContent=READING_META[kind].title;$('#activity-label').textContent=READING_META[kind].label.toUpperCase();
 $('#listen').setAttribute('aria-label',kind==='number-words'?'Écouter la consigne':kind==='sounds'?'Réécouter le mot':kind==='link-words'?'Réécouter la consigne':'Écouter le mot');
 $('#choices').setAttribute('aria-label',kind==='sounds'?'Choisis la première syllabe':kind==='build-word'?'Choisis les morceaux dans l’ordre':'Choisis la bonne écriture');
 window.scrollTo(0,0);render();nextReading();
}
function nextReading(){
 if($('#game').hidden||!isReading())return;
 clearQuestionTransition();$('#game').classList.remove('question-enter');void $('#game').offsetWidth;$('#game').classList.add('question-enter');
 current=readingQuestion(activeActivity,activityDifficulty(),current?.id);locked=false;mistakes=0;
 $('#feedback').textContent=activeActivity==='number-words'?current.prompt:READING_META[activeActivity].instruction;renderReading();dots();
 if(activeActivity==='graphemes')say(READING_META.graphemes.instruction);else listen();
}
function renderReading(){
 const board=$('#reading-board'),choices=$('#choices');board.replaceChildren();choices.replaceChildren();
 $('#game').classList.toggle('number-spelling',activeActivity==='number-words'&&current.direction==='digits-to-letters');
 if(activeActivity==='number-words')$('.question h1').textContent=current.direction==='digits-to-letters'?'Comment s’écrit ce nombre ?':'Quel est ce nombre ?';
 board.hidden=!current.display;choices.hidden=current.display==='match';choices.dataset.count=current.choices.length;choices.style.setProperty('--reading-rows',Math.ceil(current.choices.length/3));
 if(current.display==='match'){renderWordLinks();return;}
 if(current.display==='number-word'){const word=document.createElement('div');word.className='number-word-card';word.textContent=current.label;board.append(word);}
 if(current.display==='gap'){
  const word=document.createElement('div');word.className='word-gap';word.setAttribute('aria-label','Mot à compléter');
  const before=document.createElement('span'),gap=document.createElement('span'),after=document.createElement('span');
  before.textContent=current.before;gap.className='missing-part';gap.textContent='·'.repeat(current.target.length);gap.style.setProperty('--missing-length',current.target.length);gap.setAttribute('aria-label','Partie manquante');after.textContent=current.after;word.append(before,gap,after);board.append(word);
 }
 if(current.display==='build'){
  const slots=document.createElement('div');slots.className='word-pieces';slots.style.setProperty('--piece-count',current.parts.length);slots.setAttribute('aria-label','Ton mot');
  current.parts.forEach((part,index)=>{const slot=document.createElement('span');slot.className='piece-slot'+(index<current.selected.length?' filled':'');slot.textContent=index<current.selected.length?current.choices[current.selected[index]]:'· ·';slots.append(slot);});board.append(slots);
  const undo=document.createElement('button');undo.className='undo-piece';undo.type='button';undo.textContent='↶';undo.setAttribute('aria-label','Retirer le dernier morceau');undo.disabled=locked||current.selected.length===0;undo.onclick=()=>{if(locked)return;current.selected.pop();current.wrong=[];renderReading();$('#feedback').textContent='Tu peux réécouter le mot.';};board.append(undo);
 }
 current.choices.forEach((value,index)=>{
  const button=document.createElement('button');button.type='button';button.className='letter reading-choice';button.textContent=value;
  if(current.display==='build'){
   button.classList.toggle('used',current.selected.includes(index));button.disabled=locked||current.selected.includes(index);button.classList.toggle('removed',current.wrong.includes(index));
   button.onclick=()=>chooseReadingPiece(index);
  }else{button.onclick=()=>chooseReadingAnswer(value,button);}
  choices.append(button);
 });
}
function readingError(){mistakes++;streak=0;$('#feedback').textContent='Essaie encore. Tu peux réécouter.';render();}
function finishReading(continuation=nextReading,customResult=null){
 if(locked)return;locked=true;
 $$('#choices button,#reading-board button,#reading-board input').forEach(button=>button.disabled=true);
 const oldRank=rankFor(state.score),result=customResult||award(state.score,streak,mistakes);state.score=result.score;streak=result.streak;completed++;
 save();render();dots();$('#feedback').textContent='Bravo ! +'+result.points+' étoiles'+(result.bonus?' et +5 de bonus !':' !');
 chime();if(!isMath())say(result.bonus?'Bravo ! Un bonus !':'Bravo, tu as trouvé !');celebrateQuestion(result,rankFor(state.score)>oldRank,continuation);
}
function chooseReadingAnswer(value,button){
 if(locked||button.disabled)return;
 if(value!==current.target){button.classList.add('removed');button.disabled=true;button.setAttribute('aria-hidden','true');readingError();return;}
 button.classList.add('correct');if(current.display==='gap'){$('.missing-part').textContent=current.target;$('.missing-part').classList.add('filled');}
 finishReading();
}
function chooseReadingPiece(index){
 if(locked)return;const result=selectPiece(current,index);if(result==='ignored')return;
 if(result==='wrong')readingError();renderReading();
 if(result==='part'){$('#feedback').textContent='Continue dans le bon ordre !';chime();}
 if(result==='complete')finishReading();
}
function renderWordLinks(){
 const board=$('#reading-board'),match=document.createElement('div');match.className='word-links';match.setAttribute('aria-label','Associer trois mots aux boutons audio');
 const lines=document.createElementNS('http://www.w3.org/2000/svg','svg');lines.classList.add('match-lines');lines.setAttribute('aria-hidden','true');match.append(lines);
 const audioColumn=document.createElement('div'),wordColumn=document.createElement('div');audioColumn.className='audio-column';wordColumn.className='word-column';
 current.words.forEach((word,index)=>{
  const button=document.createElement('button');button.className='audio-word';button.dataset.audio=index;button.classList.toggle('selected',current.selected===index);button.classList.toggle('matched',current.matched.includes(index));button.setAttribute('aria-label','Écouter le son '+(index+1));button.setAttribute('aria-pressed',String(current.selected===index));
  const icon=document.createElement('span'),number=document.createElement('b');icon.innerHTML='<svg viewBox="0 0 48 48"><path d="M7 18h9l11-9v30L16 30H7zM33 15c6 5 6 13 0 18M39 8c11 10 11 22 0 32"/></svg>';icon.setAttribute('aria-hidden','true');number.textContent=index+1;button.append(icon,number);
  button.onclick=()=>{if(locked)return;if(!current.matched.includes(index)){current.selected=index;renderReading();$('#feedback').textContent='Relie le son '+(index+1)+' au bon mot.';}say(word);};audioColumn.append(button);
 });
 current.choices.forEach((word,index)=>{
  const button=document.createElement('button');button.className='linked-word';button.textContent=word;button.dataset.word=index;
  const matched=current.matched.find(audioIndex=>current.words[audioIndex]===word);
  button.disabled=matched!==undefined||locked;button.classList.toggle('matched',matched!==undefined);
  if(matched!==undefined){const badge=document.createElement('b');badge.textContent=matched+1;button.prepend(badge);}
  const removed=current.selected!==null&&current.wrong[current.selected].includes(index);button.classList.toggle('removed',removed);
  button.onclick=()=>{
   if(locked)return;if(current.selected===null){$('#feedback').textContent='Écoute le son 1, 2 ou 3 et relie-le au bon mot.';return;}
   const result=matchWord(current,index);if(result==='ignored')return;if(result==='wrong')readingError();
   renderReading();if(result==='pair'){$('#feedback').textContent='Bien associé ! Écoute un autre son.';chime();}if(result==='complete')finishReading();
  };wordColumn.append(button);
 });
 match.append(audioColumn,wordColumn);board.append(match);requestAnimationFrame(drawWordLinks);
}
function drawWordLinks(){
 if(!isReading()||current?.display!=='match'||$('#game').hidden)return;
 const box=$('.word-links'),svg=box?.querySelector('.match-lines');if(!box||!svg)return;
 const r=box.getBoundingClientRect();svg.setAttribute('viewBox',`0 0 ${r.width} ${r.height}`);svg.replaceChildren();
 current.matched.forEach((index)=>{
  const a=box.querySelector('[data-audio="'+index+'"]').getBoundingClientRect(),wordIndex=current.choices.indexOf(current.words[index]),b=box.querySelector('[data-word="'+wordIndex+'"]').getBoundingClientRect();
  const path=document.createElementNS('http://www.w3.org/2000/svg','path'),x1=a.right-r.left,y1=a.top+a.height/2-r.top,x2=b.left-r.left,y2=b.top+b.height/2-r.top;
  path.setAttribute('d',`M${x1},${y1} C${x1+22},${y1} ${x2-22},${y2} ${x2},${y2}`);path.setAttribute('stroke',['#a68ab6','#d2ad54','#7ba18b'][index]);svg.append(path);
 });
}
window.addEventListener('resize',drawWordLinks);

// Mathématiques : résultat, terme manquant ou position sur une droite graduée.
for(const kind of MATH_IDS)$('#'+kind+'-start').onclick=()=>startMath(kind);
function startMath(kind){
 if('speechSynthesis'in window)speechSynthesis.cancel();
 if(!state.activities[kind])return;
 clearTimeout(turnTimer);clearTimeout(memoryTimer);clearQuestionTransition();
 stopFluency();$('#fluence').hidden=true;document.body.classList.remove('memory-active','numbers-active','counting-active','fluency-active');document.body.classList.add('reading-active','math-active');
 activeActivity=kind;current=null;streak=0;completed=0;locked=false;mathRound=0;selectedTable=null;
 $('#welcome').hidden=true;$('#memory').hidden=true;$('#game').hidden=false;$('#count-board').hidden=true;$('#game').dataset.reading=kind;
 $('#choices').className='choices reading-choices math-choices';$('#listen').setAttribute('aria-label','Réécouter le calcul');$('#choices').setAttribute('aria-label','Choisis la réponse du calcul');
 $('#activity-label').textContent=kind==='multiply'?'LES MULTIPLICATIONS':'LES CALCULS + ET −';window.scrollTo(0,0);
 if(kind==='multiply')showTables();else nextMath();
}
function showTables(){
 clearTimeout(turnTimer);clearQuestionTransition();selectedTable=null;locked=true;current={kind:'table-picker',prompt:'Choisis la table de multiplication que tu veux travailler.'};
 $('#game').dataset.mathPhase='tables';$('#reading-board').hidden=true;$('#reading-board').replaceChildren();$('#choices').hidden=false;$('#choices').replaceChildren();$('#choices').style.setProperty('--reading-rows',2);
 $('.question h1').textContent='Quelle table veux-tu ?';$('#listen').setAttribute('aria-label','Écouter la consigne');
 for(let n=1;n<=10;n++){const button=document.createElement('button');button.type='button';button.className='letter reading-choice table-choice';button.textContent=n;button.setAttribute('aria-label','Travailler la table de '+n);button.onclick=()=>{selectedTable=n;current=null;streak=0;completed=0;nextMath();};$('#choices').append(button);}
 $('#feedback').textContent='Choisis une table de 1 à 10.';render();dots();listen();
}
function nextMath(){
 if($('#game').hidden||!isMath())return;
 if(activeActivity==='multiply'&&!selectedTable){showTables();return;}
 clearQuestionTransition();$('#game').classList.remove('question-enter');void $('#game').offsetWidth;$('#game').classList.add('question-enter');locked=false;mistakes=0;
 const previous=current;current=activeActivity==='arithmetic'?arithmeticQuestion(activityDifficulty(),['answer','missing','line'][mathRound++%3],previous?.id):multiplicationQuestion(selectedTable,activityDifficulty(),previous?.factor);
 $('#game').dataset.mathPhase=current.mode;$('.question h1').textContent=current.mode==='line'?'Place le résultat':current.mode==='missing'?'Quel nombre manque ?':'À toi de calculer !';
 $('#listen').setAttribute('aria-label','Réécouter le calcul');$('#feedback').textContent=current.mode==='line'?'Déplace le curseur puis valide.':'Choisis le nombre qui complète le calcul.';
 renderMath();render();dots();listen();
}
function renderMath(){
 const board=$('#reading-board'),choices=$('#choices');board.hidden=false;board.replaceChildren();choices.replaceChildren();choices.hidden=current.mode==='line';choices.dataset.count=current.choices.length;choices.style.setProperty('--reading-rows',Math.ceil(current.choices.length/3));
 if(activeActivity==='multiply'){const change=document.createElement('button');change.className='change-table';change.textContent='↻ Table de '+selectedTable;change.setAttribute('aria-label','Changer de table');change.onclick=()=>{streak=0;completed=0;showTables();};board.append(change);}
 const equation=document.createElement('div');equation.className='equation';equation.setAttribute('aria-label',current.equation);
 const parts=current.equation.split('?');const before=document.createElement('span'),blank=document.createElement('span'),after=document.createElement('span');before.textContent=parts[0];blank.className='math-blank';blank.textContent='?';after.textContent=parts[1]||'';equation.append(before,blank,after);board.append(equation);
 if(current.mode==='line'){renderMathLine(board);return;}
 for(const value of current.choices){const button=document.createElement('button');button.type='button';button.className='letter reading-choice';button.textContent=value;button.setAttribute('aria-label','Réponse '+value);button.onclick=()=>chooseMath(value,button);choices.append(button);}
}
function renderMathLine(board){
 const line=document.createElement('div');line.className='math-numberline';

 const slider=document.createElement('input');slider.type='range';slider.id='math-position';slider.min=0;slider.max=current.limit;slider.step=1;slider.value=0;slider.setAttribute('aria-label','Position sur la jauge de 0 à '+current.limit);slider.oninput=()=>{if(locked)return;line.classList.remove('line-wrong');slider.style.setProperty('--range-fill',Number(slider.value)/current.limit*100+'%');};
 const ticks=document.createElement('div');ticks.className='numberline-ticks';for(let i=0;i<=5;i++){const span=document.createElement('span');span.textContent=Math.round(i*current.limit/5);ticks.append(span);}
 const validate=document.createElement('button');validate.className='primary validate-position';validate.textContent='✓ Valider';validate.setAttribute('aria-label','Valider la position');validate.onclick=()=>chooseMath(Number(slider.value),validate);
 line.append(slider,ticks,validate);board.append(line);current.lineAttempts=[];
}
function chooseMath(value,button){
 if(locked||button.disabled)return;
 if(current.mode==='line'){
  const result=placementReward(state.score,streak,value,current.target,current.limit);
  $('.math-blank').textContent=current.target;$('.math-blank').classList.add('filled');$('.equation').setAttribute('aria-label',current.equation.replace('?',String(current.target)));
  const correction=document.createElement('p');correction.className='placement-correction';correction.textContent='Ta position : '+value+' · Résultat : '+current.target+' · Écart : '+result.distance+' · +'+result.points+' étoiles';$('#reading-board').append(correction);
  finishReading(nextMath,result);$('#reward-caption').textContent=correction.textContent;$('#feedback').textContent=correction.textContent+(result.bonus?' · +5 bonus':'');return;
 }
 if(value!==current.target){
  button.classList.add('removed');button.disabled=true;button.setAttribute('aria-hidden','true');
  readingError();$('#feedback').textContent='Un choix en moins. Essaie encore !';return;
 }
 $('.equation').setAttribute('aria-label',current.equation.replace('?',String(value)));$('.math-blank').textContent=value;$('.math-blank').classList.add('filled');if(current.mode!=='line')button.classList.add('correct');finishReading(nextMath);
}

// Fluence : minute réelle, sélection explicite du dernier mot, record par texte/enfant.
$('#fluency-start').onclick=startFluency;
function stopFluency(){fluencyClock?.stop();fluencyClock=null;fluencyAttempt=null;}
function startFluency(){
 if(!state.activities.fluency)return;
 clearTimeout(turnTimer);clearTimeout(memoryTimer);stopFluency();clearQuestionTransition();
 activeActivity='fluency';current=null;locked=false;streak=0;completed=0;mistakes=0;
 document.body.classList.remove('memory-active','numbers-active','counting-active','reading-active','math-active');document.body.classList.add('fluency-active');
 $('#welcome').hidden=true;$('#game').hidden=true;$('#memory').hidden=true;$('#fluence').hidden=false;
 fluencyAttempt={text:state.fluency.text,phase:'ready',selected:null,seconds:60,outcome:null};render();renderFluency();window.scrollTo(0,0);
 say('Lis pendant une minute. Quand le chrono sera terminé, touche le dernier mot que tu as lu, puis touche la coche verte. Le drapeau montre ton record.');
}
function renderFluency(){
 if(!fluencyAttempt)return;const attempt=fluencyAttempt,record=fluencyRecord(state.fluency,attempt.text),count=fluencyWordCount(attempt.text),choosing=attempt.phase==='choose';
 $('#fluence-timer').textContent=Math.floor(attempt.seconds/60)+':'+String(attempt.seconds%60).padStart(2,'0');
 $('#fluence-timer').classList.toggle('timer-ended',attempt.seconds===0);$('#fluence-best').textContent=record.best?'⚑ Record : '+record.best+' mots':'⚑ Ton premier record';
 $('#fluence-history').textContent=record.attempts?'Dernier essai : '+record.last+' mots · '+(record.best<count?'Objectif : atteindre le mot '+(record.best+1)+' !':'Tu as déjà atteint la fin du texte !'):'Le drapeau indiquera ton meilleur mot après ton premier essai.';
 $('#fluence-run').disabled=!['ready','result'].includes(attempt.phase);$('#fluence-run').textContent=attempt.phase==='reading'?'Lecture en cours…':attempt.phase==='choose'||attempt.phase==='reward'?'Minute terminée':attempt.phase==='result'?'↻ Réessayer pendant 1 minute':'▶ Lire pendant 1 minute';
 $('#fluence-instruction').textContent=attempt.phase==='ready'?'Commence au début du texte. Appuie quand tu es prêt.':attempt.phase==='reading'?'À toi de lire ! Le chrono dure une minute.':choosing?'Touche le dernier mot lu, puis la coche verte.':attempt.phase==='reward'?'Lecture enregistrée !':'Tu peux recommencer depuis le début pour dépasser ton record.';
 $('#fluence-result').textContent=choosing&&attempt.selected!==null?attempt.selected+' mots atteints. Tu peux encore changer le mot sélectionné.':attempt.phase==='result'?(attempt.outcome?.newRecord?'Nouveau record ! ':'')+(attempt.outcome?.last??0)+' mots atteints · record : '+record.best+' mots.':'';
 const text=$('#fluence-text');text.replaceChildren(...fluencyTokens(attempt.text).map(token=>{
  if(!token.index)return document.createTextNode(token.text);
  const word=document.createElement('button');word.type='button';word.className='fluence-word';word.textContent=token.text;word.dataset.word=token.index;word.disabled=!choosing;word.setAttribute('aria-label','Mot '+token.index+' : '+token.text);word.setAttribute('aria-pressed',String(attempt.selected===token.index));
  word.classList.toggle('best-word',record.best>0&&record.best===token.index);word.classList.toggle('last-word',record.last>0&&record.last===token.index);word.classList.toggle('selected-word',attempt.selected===token.index);
  if(record.best===token.index&&record.best>0)word.title='Ton record : '+record.best+' mots';
  word.onclick=()=>{if(fluencyAttempt!==attempt||attempt.phase!=='choose')return;attempt.selected=token.index;renderFluency();};return word;
 }));
 $('#fluence-none').hidden=!choosing;$('#fluence-confirm').hidden=!choosing;$('#fluence-confirm').disabled=attempt.selected===null;$('#fluence-none').classList.toggle('selected',attempt.selected===0);
}
$('#fluence-run').onclick=()=>{
 const attempt=fluencyAttempt;if(!attempt||!['ready','result'].includes(attempt.phase))return;
 attempt.phase='reading';attempt.selected=null;attempt.seconds=60;attempt.outcome=null;locked=false;mistakes=0;renderFluency();if('speechSynthesis'in window)speechSynthesis.cancel();
 $('#fluence-text').scrollIntoView({block:'start',behavior:'auto'});
 fluencyClock?.stop();fluencyClock=createFluencyClock({
  onTick:seconds=>{if(fluencyAttempt!==attempt||attempt.phase!=='reading')return;attempt.seconds=seconds;$('#fluence-timer').textContent=Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');$('#fluence-timer').setAttribute('aria-label','Temps restant : '+seconds+' secondes');},
  onEnd:()=>{if(fluencyAttempt!==attempt||activeActivity!=='fluency')return;attempt.phase='choose';attempt.seconds=0;renderFluency();chime();say('La minute est terminée. Touche le dernier mot que tu as lu, puis touche la coche verte.');}
 });fluencyClock.start();
};
$('#fluence-help').onclick=()=>{if(fluencyAttempt?.phase==='reading'){say('Continue à lire jusqu’à la fin du chrono.');return;}say('Lis pendant une minute. À la fin, touche le dernier mot lu puis la coche verte. Le mot doré avec le drapeau est ton record. Chaque nouvel essai repart du début.');};
$('#fluence-none').onclick=()=>{if(fluencyAttempt?.phase!=='choose')return;fluencyAttempt.selected=0;renderFluency();};
$('#fluence-confirm').onclick=()=>{
 const attempt=fluencyAttempt;if(!attempt||attempt.phase!=='choose'||attempt.selected===null||locked)return;
 attempt.outcome=recordFluencyAttempt(state.fluency,attempt.text,attempt.selected);attempt.phase='reward';renderFluency();finishReading(()=>{if(fluencyAttempt!==attempt)return;attempt.phase='result';renderFluency();});
};
document.addEventListener('visibilitychange',()=>{if(!document.hidden)fluencyClock?.refresh();});
function renderFluencyParent(){$('#fluence-parent-text').value=state.fluency.text;updateFluencyCount();$('#fluence-text-result').textContent='';}
function updateFluencyCount(){$('#fluence-parent-count').textContent=fluencyWordCount($('#fluence-parent-text').value)+' mots · durée fixe : 1 minute';}
$('#fluence-parent-text').oninput=updateFluencyCount;
$('#fluence-restore-default').onclick=()=>{$('#fluence-parent-text').value=DEFAULT_FLUENCY_TEXT;updateFluencyCount();$('#fluence-text-result').textContent='Texte proposé chargé. Appuie sur Enregistrer le texte pour l’appliquer.';};
$('#fluence-text-form').onsubmit=event=>{
 event.preventDefault();const text=normalizeFluencyText($('#fluence-parent-text').value);if(!fluencyWordCount(text)){$('#fluence-text-result').textContent='Écris un texte avec au moins un mot.';return;}
 state.fluency.text=text;save();if(activeActivity==='fluency'&&!$('#fluence').hidden)startFluency();$('#fluence-text-result').textContent='Texte enregistré pour '+childLabel()+'. Ses records sont conservés pour chaque texte.';
};
