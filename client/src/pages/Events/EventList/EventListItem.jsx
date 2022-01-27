import React, { useState, useEffect } from 'react';
import { subMilliseconds } from 'date-fns';
import TimeIsOver from '../EventList/TimeIsOver';
import calcTime from '../helperFuncs/calcTime';
import styles from './../Events.module.scss';

function EventListItem (props) {
  const {
    id,
    eventBody: {
      eventName,
      eventDate: { year, month, day }
    },
    eventArr: [events, setEvents],
    finishItem
  } = props;

  const currentDate = new Date();

  const userDate = new Date(year, month, day);

  const timerData =
    currentDate < userDate ? new Date(userDate - currentDate) : '';

  const [timer, setTimer] = useState(timerData);

  const timeValues = calcTime(timer);

  useEffect(() => {
    if (timer > 0) {
      let timerId = setTimeout(function runTimer () {
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

  return (
    <li className={styles.eventItem}>
      <div className={timerData !== '' ? styles.runTimer : styles.stopTimer}>
        <span>{eventName}</span>
      </div>

      {timer > 0 ? (
        <div className={styles.timerView}>
          <span> {timeValues.days} d</span>
          <span> {`${timeValues.hours} h`}</span>
          <span> {`${timeValues.minutes} m`}</span>
          <span> {`${timeValues.seconds} s`}</span>
        </div>
      ) : (
        <TimeIsOver id={id} events={events} finishItem={finishItem} />
      )}
    </li>
  );
}

export default EventListItem;
