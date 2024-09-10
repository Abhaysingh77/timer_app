import React from "react";
import { CgPlayButtonO } from "react-icons/cg";
import { GrPowerReset } from "react-icons/gr";
import { GiPauseButton } from "react-icons/gi";
import { RxLapTimer } from "react-icons/rx";

import "./Stopwatch.css";
function Stopwatch() {

  // timer data
  const [timer, setTimer] = React.useState({
    ms: 0,
    sec: 0,
    min: 0,
    hour: 0,
  });

  //whether the counter is running or not
  const [isActive, setIsActive] = React.useState(false);

  //active timer timeInterval id
  const [isActiveId, setIsActiveId] = React.useState(null);

  //this is the timeInterval id for the functionality when timer get paused and it blinks
  const [bhukBhakId, setBhukBhakId] = React.useState(null);

  //this is the array of objects of laps data
  const [lapData, setLapData] = React.useState([]);

  //this is the reference of reset button
  const buttonRef = React.useRef(null);

  //this is the reference of timer digits
  const timerRef = React.useRef(null);

  //handlings reset button functionality
  const handleReset = () => {
    //claering lap data whenever clicks on reset button
    if (lapData.length > 0) {
      setLapData([]);
    }

    // stopping the blinking effect of timer
    if (bhukBhakId) {
      clearInterval(bhukBhakId);
    }

    //adding scaling animation to the reset button on clicking
    if (buttonRef.current) {
      buttonRef.current.classList.add("bounce_animation");
    }
    buttonRef.current.addEventListener("mousedown", () => {
      buttonRef.current.classList.remove("bounce_animation");
    });

    //setting the timer to 00:00:00:00
    setTimer({
      ms: 0,
      sec: 0,
      min: 0,
      hour: 0,
    });
    
    setIsActive(false);
    clearInterval(isActiveId);
  };

  //handling the star, stop and resume functinality
  const handleStartStop = () => {
    //setting the state to the latest change in the timer 
    if (!isActive) {
      if (bhukBhakId) {
        clearInterval(bhukBhakId);
      }
      timerRef.current.classList.remove("timer_display");

      //this will create a non-stopping time ticking effect
      const id = setInterval(() => {
        setTimer(({ ms, sec, min, hour }) => {
          console.log(ms, sec, min, hour);
          if (ms == 99) {
            ms = 0;
            sec++;
            if (sec === 59) {
              sec = 0;
              min++;
              if (min === 59) {
                min = 0;
                hour++;
              }
            }
          } else {
            ms++;
          }
          return { ms, sec, min, hour };
        });
      }, 10);
      setIsActiveId(id);
      setIsActive(true);
    } else {

      // resetting the current timer id and also changing the state from active to not active
      clearInterval(isActiveId);
      setIsActive(false);

      //creating the blinking effect
      if (timerRef.current) {
        const bId = setInterval(() => {
          timerRef.current.classList.add("timer_display");
          setTimeout(() => {
            timerRef.current.classList.remove("timer_display");
          }, 500);
        }, 1000);
        setBhukBhakId(bId);
      }
    }
  };

  //handling the lap data
  const handleLapData = () => {
    if (isActive) {
      // Calculate the time difference between the current timer and the last lap time
      const lastLap =
        lapData.length > 0
          ? lapData[lapData.length - 1].lap
          : { hour: 0, min: 0, sec: 0, ms: 0 };

      let hourDifference = Math.abs(timer.hour - lastLap.hour);
      let minDifference = Math.abs(timer.min - lastLap.min);
      let secDifference = Math.abs(timer.sec - lastLap.sec);
      let msDifference = Math.abs(timer.ms - lastLap.ms);

      // Formatting the lap time to ensure two digits
      const formattedHour =
        hourDifference < 10 ? `0${hourDifference}` : hourDifference;
      const formattedMin =
        minDifference < 10 ? `0${minDifference}` : minDifference;
      const formattedSec =
        secDifference < 10 ? `0${secDifference}` : secDifference;
      const formattedMs = msDifference < 10 ? `0${msDifference}` : msDifference;

      // Create a new lap object
      const newLap = {
        lapNo: lapData.length + 1,
        lap: {
          hour: formattedHour,
          min: formattedMin,
          sec: formattedSec,
          ms: formattedMs,
        },
        total: {
          hour: timer.hour < 10 ? `0${timer.hour}` : timer.hour,
          min: timer.min < 10 ? `0${timer.min}` : timer.min,
          sec: timer.sec < 10 ? `0${timer.sec}` : timer.sec,
          ms: timer.ms < 10 ? `0${timer.ms}` : timer.ms,
        },
      };

      // Update the lapData state with the new lap
      setLapData([...lapData, newLap]);
    }
  };

  return (
    <>
      <div className="timer_app">
        {/* <div id="title">Stopwatch</div> */}
        <div className="timer" ref={timerRef}>
          <span className="hour">
            {timer.hour <= 9 && "0"}
            {timer.hour}:
          </span>
          <span className="minutes">
            {timer.min <= 9 && "0"}
            {timer.min}:
          </span>
          <span className="seconds">
            {timer.sec <= 9 && "0"}
            {timer.sec}
          </span>
          <span className="milliseconds">
            .{timer.ms <= 9 && "0"}
            {timer.ms}
          </span>
        </div>
        <div id="btn-group">
          <span>
          {/* Either of the button will be show to the UI*/}
            {isActive ? (
              <GiPauseButton onClick={handleStartStop} />
            ) : (
              <CgPlayButtonO onClick={handleStartStop} />
            )}
          </span>
          <span id="reset" ref={buttonRef} onClick={handleReset}>
            <GrPowerReset />
          </span>
          <span className="lap" onClick={handleLapData}>
            <RxLapTimer />
          </span>
        </div>
      </div>
      {lapData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Laps</th>
              <th>Time</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>

            {/* Iterating over the lapData array to successfully render it to the UI */}
            {lapData.map((lap, index) => (
              <tr key={index}>
                <td>{lap.lapNo}</td>
                <td>
                  {lap.lap.hour}:{lap.lap.min}:{lap.lap.sec}:{lap.lap.ms}
                </td>
                <td>
                  {lap.total.hour}:{lap.total.min}:{lap.total.sec}:
                  {lap.total.ms}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Stopwatch;