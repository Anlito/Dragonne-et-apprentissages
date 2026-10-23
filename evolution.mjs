// Finish only when the visual pause and the spoken message have both ended.
export function createEvolutionGate({minDuration,onComplete,schedule=setTimeout,cancel=clearTimeout}){
  let active=true,minimumFinished=false,speechFinished=false;
  const finish=()=>{if(active&&minimumFinished&&speechFinished){active=false;onComplete();}};
  const timer=schedule(()=>{minimumFinished=true;finish();},minDuration);
  return {
    speechFinished(){speechFinished=true;finish();},
    stop(){active=false;cancel(timer);}
  };
}
