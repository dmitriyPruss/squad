import React, { useState, useEffect, useMemo } from "react";
import { subMilliseconds } from "date-fns";
import TimeIsOver from "../EventList/TimeIsOver";
import calcTime from "../helperFuncs/calcTime";
import ProgressItem from "./ProgressItem";
import styles from "./../Events.module.scss";

function EventListItem(props) {
  const {
    id,
    eventBody: {
      eventName,
      eventDate: { year, month, day, hours, minutes },
      createdEventDate,
    },
    eventArr: [events, setEvents],
    finishItem,
  } = props;

  const currentDate = new Date();

  const userDate = new Date(year, month, day, hours, minutes);

  const timerData =
    currentDate < userDate ? Number(userDate - currentDate) : "";

  const [timer, setTimer] = useState(timerData);
  const timeValues = calcTime(timerData);

  const initialProgressData =
    Math.round((new Date() - Number(new Date(createdEventDate))) / 1000) * 1000;

  const [progressState, setProgressState] = useState(initialProgressData);
  const period = useMemo(() => userDate - new Date(createdEventDate), []);

  useEffect(() => {
    if (timer > 0) {
      let timerId = setTimeout(function runTimer() {
        setTimer(subMilliseconds(timer, 1000));

        const { days, hours, minutes, seconds } = calcTime(timer);

        timeValues.days = days;
        timeValues.hours = hours;
        timeValues.minutes = minutes;
        timeValues.seconds = seconds;

        timerId = setTimeout(runTimer, 1000);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
  });

  useEffect(() => {
    let progressId = setTimeout(function runProgress() {
      setProgressState(progressState + 1000);

      progressId = setTimeout(runProgress, 1000);
    }, 1000);

    return () => {
      clearTimeout(progressId);
    };
  }, [progressState]);

  return (
    <li className={styles.eventItem}>
      <div className={timerData !== "" ? styles.runTimer : styles.stopTimer}>
        {timerData !== "" ? (
          <div className={styles.progressContainer}>
            <ProgressItem progressState={progressState} period={period} />
            <span>{eventName}</span>
          </div>
        ) : (
          <p>{eventName}</p>
        )}
      </div>

      {timer > 0 ? (
        <>
          <div className={styles.timerView}>
            <span> {timeValues.days} d</span>
            <span> {`${timeValues.hours} h`}</span>
            <span> {`${timeValues.minutes} m`}</span>
            <span> {`${timeValues.seconds} s`}</span>
          </div>
        </>
      ) : (
        <TimeIsOver id={id} events={events} finishItem={finishItem} />
      )}
    </li>
  );
}

export default EventListItem;
