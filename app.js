import {COUNT_OBJECTS,DICE_PIPS,countingQuestion} from './counting.mjs';
import {ANIMALS,createMemory,flipMemory,settleMemory,memoryLayout} from './memory.mjs';
import {award,rankFor,question,numberQuestion,DIFFICULTIES,difficultyFor,RANK_THRESHOLDS,POINTS_PER_RANK} from './engine.mjs';
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const key='dragonne-v1';
let state={score:0,difficulty:'easy',sound:true,motion:true};
try{const saved=JSON.parse(localStorage.getItem(key));if(saved){state.score=Number.isFinite(saved.score)?Math.max(0,Math.floor(saved.score)):0;state.difficulty=difficultyFor(saved);state.sound=saved.sound!==false;state.motion=saved.motion!==false;}}catch{}
const profile=()=>DIFFICULTIES[state.difficulty];
let activeActivity='letters', memoryBoard=null, memoryTimer, memoryStartScore=0, afterCelebration;
const activePage=()=>activeActivity==='memory'?$('#memory'):$('#game');
let streak=0, completed=0, current=null, mistakes=0, locked=false, turnTimer, evolutionTimer, toastTimer, challengeAnswer, deferredInstall;
const names=['Petite aventurière','Petite exploratrice','Première cape','Jeune écuyère','Écuyère courageuse','Écuyère étoilée','Petite chevalière','Chevalière vaillante','Chevalière du royaume','Gardienne des feuilles','Gardienne des étoiles','Gardienne de la lumière','Chevalière dorée','Héroïne couronnée','Héroïne du soleil'];
function save(){try{localStorage.setItem(key,JSON.stringify(state));}catch{$('#storage-note').textContent='Le navigateur ne permet pas de conserver la progression. Elle reste disponible pendant cette partie.';}}
function setDragon(el,rank){const i=rank-1;el.style.backgroundPosition=`${(i%5)*25}% ${Math.floor(i/5)*50}%`;}
function render(){const rank=rankFor(state.score);$$('[data-score]').forEach(el=>el.textContent=state.score);$$('[data-rank]').forEach(el=>el.textContent=rank);$$('[data-progress]').forEach(el=>el.style.width=`${rank===15?100:(state.score%POINTS_PER_RANK)/POINTS_PER_RANK*100}%`);$$('.dragon').forEach(el=>setDragon(el,rank));$('.rank-label').innerHTML=`${names[rank-1]} · <span data-rank>${rank}</span>/15`;$('#streak').textContent=`Série · ${streak}`;$('#difficulty').textContent=`${profile().label} · ${activeActivity==='counting'?'1 à '+profile().maxQuantity:activeActivity==='numbers'?profile().numbers+' chiffres':profile().letters+' lettres'}`;document.body.classList.toggle('reduce-motion',!state.motion);}
function say(text,done){if(!state.sound||!('speechSynthesis'in window)){done?.();return;}speechSynthesis.cancel();const utter=new SpeechSynthesisUtterance(text);utter.lang='fr-FR';utter.rate=.82;const voice=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('fr'));if(voice)utter.voice=voice;utter.onend=done;utter.onerror=done;speechSynthesis.speak(utter);}
let audio;function chime(big=false){if(!state.sound)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();(big?[523.25,659.25,783.99,1046.5]:[659.25,783.99]).forEach((f,i)=>{const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime+i*.13;o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.07,t+.015);g.gain.exponentialRampToValueAtTime(.001,t+.3);o.connect(g);g.connect(audio.destination);o.start(t);o.stop(t+.31);});}catch{}}
function toast(text){clearTimeout(toastTimer);$('#toast').textContent=text;$('#toast').hidden=false;toastTimer=setTimeout(()=>$('#toast').hidden=true,2600);}
function listen(){if(!current)return;$('#voice-note').classList.toggle('voice-warning',!state.sound||!('speechSynthesis'in window));if(!state.sound){$('#voice-note').textContent='La voix est désactivée dans le coin parent.';return;}if(!('speechSynthesis'in window)){$('#voice-note').textContent='La voix n’est pas disponible dans ce navigateur.';return;}say(activeActivity==='counting'?current.prompt:`Trouve ${activeActivity==='numbers'?'le chiffre':'la lettre'} ${current.target}.`);$('#voice-note').textContent='Tu peux réécouter autant que tu veux.';}
function dots(){$('#session-dots').replaceChildren(...Array.from({length:10},(_,i)=>{const el=document.createElement('i');if(i<completed%10||(completed>0&&completed%10===0))el.className='done';return el;}));}
function next(){
  if($('#game').hidden)return;clearQuestionTransition();$('#game').classList.remove('question-enter');void $('#game').offsetWidth;$('#game').classList.add('question-enter');locked=false;mistakes=0;
  const numeric=activeActivity==='numbers'||activeActivity==='counting';current=activeActivity==='counting'?countingQuestion(profile().maxQuantity,current?.target):numeric?numberQuestion(profile().numbers,current?.target):question(profile().letters,current?.target);if(activeActivity==='counting')renderCounting();
  $('#choices').classList.toggle('alphabet',!numeric&&profile().letters>=13);$('#choices').classList.toggle('numberpad',numeric);
  const values=numeric?Array.from({length:activeActivity==='counting'?profile().maxQuantity:9},(_,i)=>i+1):current.choices;
  $('#choices').replaceChildren(...values.map(value=>{
    if(numeric&&!current.choices.includes(value)){const gap=document.createElement('span');gap.className='number-space';gap.setAttribute('aria-hidden','true');return gap;}
    const el=document.createElement('button');el.className=numeric?'letter number-key':'letter';el.textContent=value;el.setAttribute('aria-label',(numeric?'Chiffre ':'Lettre ')+value);el.onclick=()=>choose(value,el);return el;
  }));
  $('#feedback').textContent='Prends ton temps, tu peux réécouter.';dots();listen();
}
function choose(letter,el){if(locked||el.disabled)return;if(letter!==current.target){mistakes++;streak=0;el.classList.add('removed');el.disabled=true;el.setAttribute('aria-hidden','true');$('#feedback').textContent='Un choix en moins. Essaie encore !';say(activeActivity==='counting'?'Compte encore, puis choisis un chiffre.':`Essaie encore. Trouve ${activeActivity==='numbers'?'le chiffre':'la lettre'} ${current.target}.`);render();return;}locked=true;el.classList.add('correct');const oldRank=rankFor(state.score),result=award(state.score,streak,mistakes);state.score=result.score;streak=result.streak;completed++;save();render();dots();$('#feedback').textContent=`Bravo ! +${result.points} ${result.points===1?'étoile':'étoiles'}${result.bonus?' et +5 de bonus':''} !`;chime();say(result.bonus?'Bravo ! Tu gagnes un bonus !':'Bravo, tu as trouvé !');celebrateQuestion(result,rankFor(state.score)>oldRank);}
function clearQuestionTransition(){
  $('#question-transition').hidden=true;
  $('#question-transition').classList.remove('leaving');
  $('#game').classList.remove('celebrating');$('#memory').classList.remove('celebrating');
}
function celebrateQuestion(result,evolves,continuation=next){
  afterCelebration=continuation;
  $('#game').classList.remove('question-enter');
  $('#reward-points').textContent='+'+(result.points+result.bonus);
  $('#reward-caption').textContent=result.bonus?'Étoiles et bonus !':result.points===1?'Une étoile gagnée !':'Étoiles gagnées !';
  $('#question-transition').hidden=false;
  activePage().classList.add('celebrating');
  turnTimer=setTimeout(()=>finishQuestionTransition(evolves),2200);
}
function finishQuestionTransition(evolves){
  if(activePage().hidden){clearQuestionTransition();return;}
  if($('#parent').open){turnTimer=setTimeout(()=>finishQuestionTransition(evolves),300);return;}
  $('#question-transition').classList.add('leaving');
  turnTimer=setTimeout(()=>{clearQuestionTransition();if(evolves)showEvolution(false);else afterCelebration();},state.motion?300:0);
}
function showEvolution(preview){clearTimeout(turnTimer);const dialog=$('#evolution');dialog.dataset.preview=String(preview);$('#evolution-rank').textContent=`${names[rankFor(state.score)-1]} · Palier ${rankFor(state.score)}`;dialog.showModal();const dragon=dialog.querySelector('.dragon');dragon.style.animation='none';void dragon.offsetWidth;dragon.style.animation='';chime(true);say('Ta dragonne grandit ! Quelle belle aventure !');clearTimeout(evolutionTimer);evolutionTimer=setTimeout(closeEvolution,state.motion?3400:1400);}
function closeEvolution(){clearTimeout(evolutionTimer);const dialog=$('#evolution');const preview=dialog.dataset.preview==='true';dialog.close();if(!preview&&!activePage().hidden)afterCelebration();}
$('#skip-evolution').onclick=closeEvolution;$('#evolution').addEventListener('cancel',e=>{e.preventDefault();closeEvolution();});
function startListeningActivity(kind){
  clearTimeout(turnTimer);clearTimeout(memoryTimer);clearQuestionTransition();document.body.classList.remove('memory-active');document.body.classList.toggle('numbers-active',kind==='numbers'||kind==='counting');document.body.classList.toggle('counting-active',kind==='counting');activeActivity=kind;
  $('#memory').hidden=true;$('#welcome').hidden=true;$('#game').hidden=false;window.scrollTo(0,0);streak=0;completed=0;current=null;
  $('#count-board').hidden=kind!=='counting';$('.question h1').textContent=kind==='counting'?'Combien y en a ?':'Écoute et retrouve';$('#activity-label').textContent=kind==='counting'?'JE COMPTE':kind==='numbers'?'LES CHIFFRES':'LES LETTRES';$('#listen').setAttribute('aria-label',kind==='counting'?'Réécouter la question':kind==='numbers'?'Réécouter le chiffre':'Réécouter la lettre');$('#choices').setAttribute('aria-label',kind==='letters'?'Choisis la lettre':'Choisis le chiffre');
  render();next();fitNumberScreen();
}
$('#letters').onclick=()=>startListeningActivity('letters');$('#numbers-start').onclick=()=>startListeningActivity('numbers');$('#counting-start').onclick=()=>startListeningActivity('counting');
$('#home').onclick=()=>{document.body.classList.remove('memory-active','numbers-active','counting-active');clearTimeout(turnTimer);clearTimeout(memoryTimer);$('#memory').hidden=true;clearQuestionTransition();if('speechSynthesis'in window)speechSynthesis.cancel();$('#game').hidden=true;$('#welcome').hidden=false;window.scrollTo(0,0);current=null;locked=false;};
$('#listen').onclick=listen;$('#greet').onclick=()=>say('Coucou ! Je suis ta dragonne. Viens jouer avec moi !');
$$('[data-soon]').forEach(el=>el.onclick=()=>{toast('Cette activité arrive bientôt !');say(`${el.dataset.soon} arrive bientôt. Tu peux jouer aux lettres !`);});
$('#settings').onclick=()=>{$('#reset-confirmation').hidden=true;$('#reset-progress').hidden=false;$('#reset-result').textContent='';const a=4+Math.floor(Math.random()*5),b=3+Math.floor(Math.random()*6);challengeAnswer=a+b;$('#challenge').textContent=`${a} + ${b}`;$('#parent-gate').hidden=false;$('#parent-options').hidden=true;$('#gate-answer').value='';$('#gate-error').textContent='';$('#parent').showModal();};
$('#gate-form').onsubmit=e=>{e.preventDefault();if(Number($('#gate-answer').value)!==challengeAnswer){$('#gate-error').textContent='Réessaie.';return;}$('#parent-gate').hidden=true;$('#parent-options').hidden=false;$('#level').value=state.difficulty;renderDifficulty();renderRanks();$('#sound').checked=state.sound;$('#motion').checked=state.motion;};
function renderRanks(){const rank=rankFor(state.score);$('#rank-summary').textContent=rank===15?`${state.score} étoiles · dernier palier atteint !`:`${state.score} étoiles · palier ${rank}/15 · encore ${RANK_THRESHOLDS[rank]-state.score} étoiles avant le suivant.`;$('#rank-rows').replaceChildren(...RANK_THRESHOLDS.map((points,i)=>{const row=document.createElement('tr');const level=document.createElement('th'),name=document.createElement('td'),threshold=document.createElement('td');level.textContent=String(i+1);name.textContent=names[i]+(rank===i+1?' · actuel':'');threshold.textContent=String(points);row.append(level,name,threshold);return row;}));}
function renderDifficulty(){const p=profile();$('#difficulty-summary').textContent=`${p.letters} lettres proposées · ${p.numbers} chiffres proposés · ${p.memoryPairs} paires (${p.memoryPairs*2} cartes) · quantités de 1 à ${p.maxQuantity}.`;}
$('#level').onchange=e=>{state.difficulty=e.target.value;save();render();renderDifficulty();if(!activePage().hidden){clearTimeout(turnTimer);clearQuestionTransition();if(activeActivity==='memory')startMemory();else next();}};
$('#sound').onchange=e=>{state.sound=e.target.checked;if(!state.sound&&'speechSynthesis'in window)speechSynthesis.cancel();save();};
$('#motion').onchange=e=>{state.motion=e.target.checked;save();render();};
$('#preview-evolution').onclick=()=>{if($('#question-transition').hidden)showEvolution(true);else toast('Ferme le coin parent pour terminer la récompense.');};
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;$('#install').hidden=false;});$('#install').onclick=async()=>{if(deferredInstall){await deferredInstall.prompt();deferredInstall=null;$('#install').hidden=true;}};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&'speechSynthesis'in window)speechSynthesis.cancel();});
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>toast('Le mode hors connexion n’a pas pu être activé.'));
render();

function startMemory(){
  clearTimeout(memoryTimer);clearTimeout(turnTimer);clearQuestionTransition();
  activeActivity='memory';document.body.classList.remove('numbers-active','counting-active');document.body.classList.add('memory-active');$('#welcome').hidden=true;$('#game').hidden=true;$('#memory').hidden=false;$('#memory-finish').hidden=true;
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
$('#reset-confirm').onclick=()=>{
  clearTimeout(turnTimer);clearTimeout(memoryTimer);clearTimeout(evolutionTimer);clearQuestionTransition();if($('#evolution').open)$('#evolution').close();if('speechSynthesis'in window)speechSynthesis.cancel();
  state.score=0;streak=0;completed=0;save();
  if(!activePage().hidden){if(activeActivity==='memory')startMemory();else startListeningActivity(activeActivity);}else render();
  renderRanks();$('#reset-confirmation').hidden=true;$('#reset-progress').hidden=false;$('#reset-result').textContent='Progression remise à zéro : 0 étoile, palier 1.';$('#reset-progress').focus();
};

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
