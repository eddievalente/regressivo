import React, { useState, useEffect } from 'react';

function Relogio() {

    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [counter, setCounter] = useState(0);
    const [valorInicial, setValorInicial] = useState(90);

    function stopTimer() {
      setIsActive(false);
      setIsPaused(true);
      setCounter(0);
      setSecond('00');
      setMinute('00')
    }

    function startTimer() {
      setIsActive(true);
      setIsPaused(false);
      setCounter(valorInicial);
      setSecond('00');
      setMinute('00');
    }  

    function startStop() {
      if ( isActive ) {
        stopTimer();
      } else {
        startTimer();
      }
    }

    function pauseResume() {
      setIsPaused(!isPaused);
    }  
      
    function handleInputChange() {
      let value = document.querySelector("#valor_inicial").value;
      setValorInicial(value);
    }

    useEffect(() => {
      let intervalId;
    
      if ( isActive ) {
        intervalId = setInterval(() => {
          const secondCounter = counter % 60;
          const minuteCounter = Math.floor(counter / 60);
          const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
          const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;
          setSecond(computedSecond);
          setMinute(computedMinute);
          if ( !isPaused ) setCounter(counter - 1);
        }, 1000)
      }
         return () => clearInterval(intervalId);
      }, [isActive, isPaused, counter]
    )

    return (
      <div className={ isActive ? "container strunning": "container stinicio" }>
        <div className="time">
          <span className="minute">{minute}</span>
          <span>:</span>
          <span className="second">{second}</span>
        </div>
        <div className="buttons">
          <button onClick={startStop} className="start">
            {isActive ? "Stop": "Start"}
          </button>
          <button onClick={pauseResume} className="pause">
            {isPaused ? "Pause": "Resume"}
          </button>
          <button onClick={stopTimer} className="reset">Reset</button>
        </div>

        <div className="controle">
          <label>Segundos:
            <input type="number" id="valor_inicial" name="valor_inicial" precision="0" value={valorInicial} onChange={handleInputChange}/>
          </label>
        </div>
      </div>
    )
}

export default Relogio;
