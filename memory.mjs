export const ANIMALS=['Le chat','Le chien','Le lapin','L’ours','Le renard','Le panda','Le lion','Le koala','La grenouille','La tortue','Le poisson','La baleine','L’éléphant','La girafe','Le cochon','Le hibou'];
export function memoryLayout(count,width,height,gap=8){
  const candidates=count===8?[2,4]:[4,8];
  let best=null;
  for(const columns of candidates){const rows=count/columns;const size=Math.min((width-(columns-1)*gap)/columns,(height-(rows-1)*gap)/rows);if(!best||size>best.size)best={columns,rows,size};}
  return best;
}
function shuffle(items,random){for(let i=items.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}return items;}
export function createMemory(pairs,random=Math.random){
  if(![4,8,16].includes(pairs))throw new RangeError('Nombre de paires invalide');
  const animals=shuffle(Array.from({length:16},(_,i)=>i),random).slice(0,pairs);
  return {cards:shuffle(animals.flatMap(animal=>[{animal,matched:false,revealed:false},{animal,matched:false,revealed:false}]),random),flipped:[],mistakes:0,found:0,turns:0,busy:false,pairs};
}
export function flipMemory(board,index){
  const card=board.cards[index];
  if(board.busy||!card||card.revealed||card.matched)return {type:'ignored'};
  card.revealed=true;board.flipped.push(index);
  if(board.flipped.length===1)return {type:'first',animal:card.animal};
  board.busy=true;board.turns++;
  const first=board.cards[board.flipped[0]];
  if(first.animal!==card.animal){board.mistakes++;return {type:'mismatch'};}
  first.matched=card.matched=true;board.found++;
  const mistakes=board.mistakes;board.mistakes=0;board.flipped=[];
  return {type:'match',mistakes,complete:board.found===board.pairs,animal:card.animal};
}
export function settleMemory(board){
  for(const index of board.flipped)if(!board.cards[index].matched)board.cards[index].revealed=false;
  board.flipped=[];board.busy=false;
}
