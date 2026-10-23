import {difficultyFor} from './engine.mjs';
export const PROFILES_KEY='dragonne-profiles-v1';
export const PROFILE_IDS=['dragonne','dragon'];
export const PROFILE_META={
  dragonne:{label:'Dragonne',sprite:'assets/dragonne.png',companion:'Ta dragonne',ranks:['Petite aventurière','Petite exploratrice','Première cape','Jeune écuyère','Écuyère courageuse','Écuyère étoilée','Petite chevalière','Chevalière vaillante','Chevalière du royaume','Gardienne des feuilles','Gardienne des étoiles','Gardienne de la lumière','Chevalière dorée','Héroïne couronnée','Héroïne du soleil']},
  dragon:{label:'Dragon',sprite:'assets/dragon.png',companion:'Ton dragon',ranks:['Petit aventurier','Petit explorateur','Première cape','Jeune écuyer','Écuyer courageux','Écuyer étoilé','Petit chevalier','Chevalier vaillant','Chevalier du royaume','Gardien des feuilles','Gardien des étoiles','Gardien de la lumière','Chevalier doré','Héros couronné','Héros du soleil']}
};
export function cleanProfile(value){
  const score=Number.isFinite(value?.score)?Math.floor(value.score):0;
  return {score:Number.isSafeInteger(score)&&score>=0?score:0,difficulty:difficultyFor(value),sound:value?.sound!==false,motion:value?.motion!==false};
}
export function loadProfiles(saved,legacy=null){
  const valid=saved?.version===1&&saved.profiles&&typeof saved.profiles==='object';
  const profiles={dragonne:cleanProfile(valid&&Object.hasOwn(saved.profiles,'dragonne')?saved.profiles.dragonne:legacy),dragon:cleanProfile(valid&&Object.hasOwn(saved.profiles,'dragon')?saved.profiles.dragon:null)};
  return {version:1,activeId:valid&&PROFILE_IDS.includes(saved.activeId)?saved.activeId:'dragonne',profiles};
}
