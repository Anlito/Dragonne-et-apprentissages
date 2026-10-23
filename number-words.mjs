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
 const inverse=String(previous).startsWith('letters:'),previousNumber=String(previous).split(':').at(-1);
 const values=Array.from({length:max+1},(_,i)=>i),number=shuffle(values.filter(n=>String(n)!==previousNumber),random)[0];
 const numbers=shuffle([number,...numberDistractors(number,max,readingChoices(difficulty)-1,difficulty,random)],random);
 return {kind:'number-words',id:(inverse?'digits:':'letters:')+number,number,direction:inverse?'digits-to-letters':'letters-to-digits',target:inverse?numberInFrench(number):number,label:inverse?String(number):numberInFrench(number),choices:inverse?numbers.map(numberInFrench):numbers,display:'number-word',prompt:inverse?'Regarde le nombre et retrouve son écriture en lettres.':'Lis le nombre écrit en lettres et retrouve-le parmi les chiffres.'};
}
export function numberDistractors(number,max,count,difficulty,random=Math.random){
 const pool=shuffle(Array.from({length:max+1},(_,n)=>n).filter(n=>n!==number),random);
 if(difficulty!=='easy'){
  const similarity=n=>{const a=numberInFrench(number).split('-'),b=numberInFrench(n).split('-');let prefix=0;while(prefix<Math.min(a.length,b.length)&&a[prefix]===b[prefix])prefix++;return prefix*20+(n%10===number%10?12:0)+(Math.floor(n/10)===Math.floor(number/10)?10:0)-Math.abs(n-number)/10;};
  pool.sort((a,b)=>similarity(b)-similarity(a));
  // Au niveau difficile, mêler un voisin immédiat et une même unité (97 / 87).
  if(difficulty==='hard'&&number>=20){
   const nearby=number+1<=max?number+1:number-1,varied=number%10>=4?number-4:number+4;
   const sameUnit=pool.find(n=>n%10===number%10&&Math.abs(n-number)===10);
   const priority=[nearby,varied,sameUnit].filter((n,i,a)=>pool.includes(n)&&a.indexOf(n)===i);
   return [...priority,...pool.filter(n=>!priority.includes(n))].slice(0,count);
  }
 }
 return pool.slice(0,count);
}
