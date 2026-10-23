function shuffle(values,random){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const readingChoices=level=>({easy:3,medium:4,hard:6})[level]||3;
const SMALL=['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize'];
export function numberInFrench(n){
 if(!Number.isInteger(n)||n<0||n>100)throw new RangeError('Nombre entre 0 et 100');
 if(n<SMALL.length)return SMALL[n];if(n<20)return 'dix-'+SMALL[n-10];if(n===100)return 'cent';
 if(n>=80){if(n===80)return 'quatre-vingts';return 'quatre-vingt-'+numberInFrench(n-80);}
 if(n>=70)return n===71?'soixante-et-onze':'soixante-'+numberInFrench(n-60);
 const tens={2:'vingt',3:'trente',4:'quarante',5:'cinquante',6:'soixante'},unit=n%10,base=tens[Math.floor(n/10)];return base+(unit===0?'':unit===1?'-et-un':'-'+SMALL[unit]);
}
export function numberWordsQuestion(difficulty='easy',previous=null,random=Math.random){
 const max={easy:9,medium:20,hard:100}[difficulty]??9;
 const values=Array.from({length:max+1},(_,i)=>i),target=shuffle(values.filter(n=>String(n)!==previous),random)[0];
 return {kind:'number-words',id:String(target),target,label:numberInFrench(target),choices:shuffle([target,...shuffle(values.filter(n=>n!==target),random).slice(0,readingChoices(difficulty)-1)],random),display:'number-word',prompt:'Lis le nombre écrit en lettres et retrouve-le parmi les chiffres.'};
}
