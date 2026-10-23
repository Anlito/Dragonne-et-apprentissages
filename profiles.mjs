import {difficultyFor} from './engine.mjs';
import {cleanActivities} from './activities.mjs';
export const PROFILES_KEY='dragonne-profiles-v2';
export const PREVIOUS_PROFILES_KEY='dragonne-profiles-v1';
const femaleRanks=['Petite aventurière','Petite exploratrice','Première cape','Jeune écuyère','Écuyère courageuse','Écuyère étoilée','Petite chevalière','Chevalière vaillante','Chevalière du royaume','Gardienne des feuilles','Gardienne des étoiles','Gardienne de la lumière','Chevalière dorée','Héroïne couronnée','Héroïne du soleil'];
const maleRanks=['Petit aventurier','Petit explorateur','Première cape','Jeune écuyer','Écuyer courageux','Écuyer étoilé','Petit chevalier','Chevalier vaillant','Chevalier du royaume','Gardien des feuilles','Gardien des étoiles','Gardien de la lumière','Chevalier doré','Héros couronné','Héros du soleil'];
export const DRAGONS={
 dragonne:{label:'Dragonne des feuilles',sprite:'assets/dragonne.png',companion:'Ta dragonne',ranks:femaleRanks},
 dragon:{label:'Dragon azur',sprite:'assets/dragon.png',companion:'Ton dragon',ranks:maleRanks},
 braise:{label:'Braise',sprite:'assets/dragon-braise.png',companion:'Ton dragon',ranks:maleRanks},
 soleil:{label:'Soleil',sprite:'assets/dragon-soleil.png',companion:'Ton dragon',ranks:maleRanks}
};
export const DRAGON_IDS=Object.keys(DRAGONS);
export function cleanName(value){return typeof value==='string'?value.replace(/[\u0000-\u001f\u007f]/g,'').trim().replace(/\s+/g,' ').slice(0,24):'';}
export function cleanProfile(value){
 const score=Number.isFinite(value?.score)?Math.floor(value.score):0,name=cleanName(value?.name);
 return {name:name||'Enfant',dragonId:Object.hasOwn(DRAGONS,value?.dragonId)?value.dragonId:'dragonne',needsName:!name||value?.needsName===true,score:Number.isSafeInteger(score)&&score>=0?score:0,difficulty:difficultyFor(value),sound:value?.sound!==false,motion:value?.motion!==false,activities:cleanActivities(value?.activities)};
}
const validId=id=>typeof id==='string'&&/^(child-[a-z0-9-]+|dragonne|dragon)$/i.test(id);
export function loadProfiles(saved,legacy=null){
 const profiles=Object.create(null);let order=[];
 if(saved?.version===2&&saved.profiles&&typeof saved.profiles==='object'&&!Array.isArray(saved.profiles)){
  for(const [id,child] of Object.entries(saved.profiles))if(validId(id)&&child&&typeof child==='object')profiles[id]=cleanProfile(child);
  order=[...new Set([...(Array.isArray(saved.order)?saved.order:[]),...Object.keys(profiles)])].filter(id=>Object.hasOwn(profiles,id));
 }else if(saved?.version===1&&saved.profiles&&typeof saved.profiles==='object'){
  for(const id of ['dragonne','dragon'])if(Object.hasOwn(saved.profiles,id)){
   profiles[id]=cleanProfile({...saved.profiles[id],name:id==='dragonne'?'Dragonne':'Dragon',dragonId:id,needsName:true});order.push(id);
  }
 }else if(legacy&&typeof legacy==='object'){
  profiles.dragonne=cleanProfile({...legacy,name:'Dragonne',dragonId:'dragonne',needsName:true});order.push('dragonne');
 }
 return {version:2,activeId:Object.hasOwn(profiles,saved?.activeId)?saved.activeId:order[0]||null,order,profiles};
}
function profileDetails(accounts,{name,dragonId},excludeId=null){
 const cleaned=cleanName(name);
 if(!cleaned||typeof name!=='string'||name.trim().length>24)throw new Error('Indique un prénom de 1 à 24 caractères.');
 if(!Object.hasOwn(DRAGONS,dragonId))throw new Error('Choisis un dragon.');
 if(accounts.order.some(id=>id!==excludeId&&accounts.profiles[id].name.toLocaleLowerCase('fr')===cleaned.toLocaleLowerCase('fr')))throw new Error('Ce prénom existe déjà. Ajoute une initiale pour le distinguer.');
 return {name:cleaned,dragonId,needsName:false};
}
export function createChild(accounts,details,id='child-'+(globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,12))){
 const values=profileDetails(accounts,details);
 if(!validId(id)||Object.hasOwn(accounts.profiles,id))throw new Error('Identifiant de profil invalide.');
 accounts.profiles[id]=cleanProfile(values);accounts.order.push(id);return id;
}
export function updateChild(accounts,id,details){
 if(!Object.hasOwn(accounts.profiles,id))throw new Error('Profil introuvable.');
 Object.assign(accounts.profiles[id],profileDetails(accounts,details,id));return accounts.profiles[id];
}
