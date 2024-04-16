import React, { useEffect, useState } from "react";
import Css from "./ReactRecorder.module.css";
import { ReactMic } from "react-mic";


function ReactRecorder() {
  const[voice, SetVoice] = useState(false)
  const[audioLink, SetAudioLink] = useState('')
  const [time, setTime] = useState({ seconds: 0, milliseconds: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          const newMilliseconds = prevTime.milliseconds + 1;
          if (newMilliseconds === 100) {
            return { seconds: prevTime.seconds + 1, milliseconds: 0 };
          } else {
            return { ...prevTime, milliseconds: newMilliseconds };
          }
        });
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isActive]);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };
 

    const OnStop = (blob) =>{
        console.log(blob)
        SetAudioLink(blob.blobURL)
    }

   const StartHandle = () =>{
    SetVoice(true)
    setIsActive(!isActive);

   }

   const StopHandle = () =>{
    SetVoice(false)
    setTime({ seconds: 0, milliseconds: 0 });
    setIsActive(false);
   }

   const ClearHandle = () =>{
    SetAudioLink('')
    setTime({ seconds: 0, milliseconds: 0 });
    setIsActive(false);
   }

  return (
    <div className={Css.Container}>
      <div className={Css.Recorder}>
        <h1 className={Css.Title}>React Recorder</h1>
        <p className={Css.Seconds}>{time.seconds}:{time.milliseconds}</p>
        <ReactMic
        record={voice}
        className={Css.RoadRecorder}
        strokeColor={'violet'}
        onStop={OnStop}
        />
      </div>
      <div className={Css.Recorders}>
        {audioLink ? <audio controls src={audioLink}></audio> : <div className={Css.AudioChange}><h4 id="titleEmpty">Пока что пусто попробуйте сказать что то</h4></div>} 
        </div>
      
      <div className={Css.Btns}>
      <div>
          { voice ? <button onClick={StopHandle} className={Css.BtnStop}><div className={Css.StopBtn}></div></button> : <button onClick={StartHandle}className={Css.BtnStart}><div className={Css.RedBtn}></div></button> }
        </div>
        
      </div>
      <div>
        { audioLink ?  <button onClick={ClearHandle} className={Css.BtnClear}>Clear</button> : <button onClick={ClearHandle} className={Css.ButtonClear}>Clear</button> }
        </div>  
    </div>
  );
}

export default ReactRecorder;
