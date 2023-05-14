import React, {useState, useEffect} from 'react'

const Temporizador = () => {
    let [targetSeconds, setTargetSeconds] = useState(null)
    let [elapsedSeconds, setElapsedSeconds] = useState(0)
    let [remainingSeconds, setRemainingSeconds] = useState(0)
    let [timeBreak, setTimeBreak] = useState(false)
    let [targetSecondsBreak, setTargetSecondsBreak] = useState(null)
    let [elapsedSecondsBreak, setElapsedSecondsBreak] = useState(null)
    let [remainingSecondsBreak, setRemainingSecondsBreak] = useState(0)

    
    useEffect(function(){

        if(targetSeconds === null) return;

        setElapsedSeconds(0)
        setRemainingSeconds(targetSeconds)
        

        let interval = setInterval(function(){
            setElapsedSeconds((elapsedSeconds) => elapsedSeconds + 1)
            setRemainingSeconds((remainingSeconds) => remainingSeconds - 1)
        },1000);

        return ()=> {
            clearInterval(interval);
        }
        if(remainingSeconds==0) {
          setTimeBreak(true)
        }
    },[targetSeconds, setTimeBreak])
    
    useEffect(function(){

      if(targetSecondsBreak === null && timeBreak == true) return;

      setElapsedSecondsBreak(0)
      setRemainingSecondsBreak(targetSecondsBreak)
      

      let interval = setInterval(function(){
          setElapsedSecondsBreak((elapsedSecondsBreak) => elapsedSecondsBreak + 1)
          setRemainingSecondsBreak((remainingSecondsBreak) => remainingSecondsBreak - 1)
      },1000);

      return ()=> {
          clearInterval(interval);
      }
  },[targetSecondsBreak])

    

    function parseForm(ev) {
        ev.preventDefault()
        let seconds = ev.target.seconds.value
        console.log(seconds)
        setTargetSeconds(parseInt(seconds))
        
        
    }
    function parseFormBreak(ev) {
      ev.preventDefault()
      let secondsBreak = ev.target.secondsBreak.value
      setTargetSecondsBreak(parseInt(seconds))
      console.log(targetSecondsBreak)
      
  }
  
    if (elapsedSecondsBreak >= targetSecondsBreak && targetSecondsBreak !== null) {
        return (
            <>
            {/* setTimeBreak(true) */}
            <p>Descanso</p>
            <button onClick={()=> setTargetSecondsBreak(null)}>Reiniciar</button>

            </>
            
        )
    }
    
    

    if(targetSeconds !== null) {
        return(
          <>
            <p>Soy un conteo hasta el {targetSeconds}, han transcurrido {elapsedSeconds} segundos y todavía faltan {remainingSeconds}</p>
            
          </>
            
        )
    } else {
      if (targetSeconds == elapsedSeconds && timeBreak == true) {
        return(
          <>
          
           <p> Soy un conteo de descanso hasta el {targetSecondsBreak}, han transcurrido {elapsedSecondsBreak} segundos y todavía faltan {remainingSecondsBreak}</p>
          </>
           
        )
      }
    }

  return (
    <>
         <h2>Temporizador</h2>
        <div>
        <form action="" onSubmit={ev=>parseForm(ev)}>
            <div>
                <button>INICIAR</button>
            </div>
            <input type="number" name='seconds' />
            
            
            
        </form>
        <p>Cuantos segundos de trabajo?</p>
        
        </div>
        <div>
        <form action="" onSubmit={ev=>parseFormBreak(ev)}>
            <input type="number" name='seconds' />
                                    
        </form>
        <p>Cuantos segundos de descanso?</p>
        
        </div>
        
    </>
  )
}

export default Temporizador
