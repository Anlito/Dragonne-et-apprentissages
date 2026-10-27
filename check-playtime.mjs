import assert from 'node:assert/strict';
import {cleanPlaytime,todayPlaytime,remainingPlaytime,consumePlaytime,addPlaytimeBonus,localDay,parentMultiplication} from './playtime.mjs';
import {cleanProfile,loadProfiles} from './profiles.mjs';
const now=new Date(2026,9,27,12),tomorrow=new Date(2026,9,28,0,0,1);
assert.equal(localDay(now),'2026-10-27');assert.equal(cleanPlaytime(null).enabled,false);
let time=todayPlaytime({enabled:true,minutes:1},now);
time=consumePlaytime(time,59999,now);assert.equal(remainingPlaytime(time),1);
time=consumePlaytime(time,1,now);assert.equal(remainingPlaytime(time),0);
time=addPlaytimeBonus(time,10,now);assert.equal(remainingPlaytime(time),600000);assert.equal(time.usedMs,60000);
const restored=cleanProfile({name:'Elsa',playtime:JSON.parse(JSON.stringify(time))});assert.equal(remainingPlaytime(restored.playtime),600000);
assert.equal(consumePlaytime({...time,enabled:false},10000,now).usedMs,60000);
assert.equal(consumePlaytime({...time,minutes:1,bonusMinutes:0,usedMs:600000},1,now).usedMs,600001,'Baisser la limite conserve le temps déjà joué');
const next=todayPlaytime(time,tomorrow);assert.equal(next.usedMs,0);assert.equal(next.bonusMinutes,0);assert.equal(next.minutes,1);assert(next.enabled);
const accounts=loadProfiles({version:2,activeId:'child-elsa',profiles:{'child-elsa':restored,'child-noe':{name:'Noé'}},order:['child-elsa','child-noe']});
assert(accounts.profiles['child-elsa'].playtime.enabled);assert(!accounts.profiles['child-noe'].playtime.enabled);
for(const minutes of [0,-1,241,1.5,NaN])assert.throws(()=>addPlaytimeBonus(time,minutes,now));
for(const value of [-1,0,241,NaN])assert.equal(cleanPlaytime({minutes:value}).minutes,30);
for(let i=0;i<100;i++){const gate=parentMultiplication();const [a,b]=gate.question.split(' × ').map(Number);assert.equal(gate.answer,a*b);assert(a>=6&&a<=12&&b>=6&&b<=12);}
console.log('Temps quotidien : expiration, bonus, désactivation, rechargement, minuit, profils séparés et multiplication OK.');
