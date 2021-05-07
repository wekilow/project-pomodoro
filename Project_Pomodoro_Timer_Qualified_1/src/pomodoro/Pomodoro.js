import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration, secondsToDuration } from "../utils/duration/index";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [show, setShow] = useState("notShow");

  // Break Duration minus button decrementer function
  const minusBreakDuration = () => {
    // to make sure that it doesn't decrement below zero
    if (breakDuration <= 1) {
      return;
    } else {
      setBreakDuration(breakDuration - 1);
    }
  };
  // Break Duration plus button incrementer function
  const plusBreakDuration = () => {
    if (breakDuration >= 15) {
      return;
    } else {
      setBreakDuration(breakDuration + 1);
    }
  };

  // Focus Duration minus button decrementer function
  const minusFocusDuration = () => {
    // to make sure that it doesn't decrement below zero
    if (focusDuration <= 5) {
      return;
    } else {
      setFocusDuration(focusDuration - 5);
    }
  };
  // Focus Duration plus button incrementer function
  const plusFocusDuration = () => {
    if (focusDuration >= 60) {
      return;
    } else {
      setFocusDuration(focusDuration + 5);
    }
  };

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running

      // console.log("1", remainingTime, "2", isBreak, "3", breakDuration, "4", focusDuration);
      if (!isTimerRunning) {
        // start the timer

        // setFocusDuration();
      } else if(remainingTime <= 0) {
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();

        if(isBreak) {
          setRemainingTime(focusDuration * 60);
          setIsBreak(false);
        } else {
          setRemainingTime(breakDuration * 60);
          setIsBreak(true);
        }
      }
      else {
        // console.log(secondsToDuration(remainingTime));
        setRemainingTime(remainingTime - 1);
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    if (show === "noShow") {
      setShow("");

      setIsTimerRunning(false);
    } else {
      setShow("noShow");

      if (remainingTime === 0) {
        setRemainingTime(focusDuration * 60);
      }

      setIsTimerRunning(true);
    }
  }

  function stopButton() {
    setIsTimerRunning(false);
    setRemainingTime(0);
  }

  const barTimer = (1 - (remainingTime / ((isBreak ? breakDuration : focusDuration) * 60))) * 100;

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={minusFocusDuration}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={plusFocusDuration}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={minusBreakDuration}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={plusBreakDuration}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={stopButton}
              data-testid="stop"
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      {isTimerRunning === false && remainingTime === 0 ? null : (
        <div className={show}>
          {/* TODO: This area should show only when a focus or break session is running or pauses */}
          <div className="row mb-2">
            <div className="col">
              {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
              <h2 data-testid="session-title">
                {isBreak ? "On Break" : "Focusing"} for {minutesToDuration(isBreak ? breakDuration : focusDuration)} minutes
              </h2>
              {/* TODO: Update message below to include time remaining in the current session */}
              <p className="lead" data-testid="session-sub-title">
                {secondsToDuration(remainingTime)} remaining
              </p>
              <div>
                {remainingTime > 0 && isTimerRunning === false ? (
                  <h4>PAUSED</h4>
                ) : null}
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="progress" style={{ height: "20px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={barTimer} // TODO: Increase aria-valuenow as elapsed time increases
                  style={{ width: barTimer + "%" }} // TODO: Increase width % as elapsed time increases
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pomodoro;
