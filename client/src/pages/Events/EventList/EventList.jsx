import React from 'react';
import EventListItem from './EventListItem';
import styles from './../Events.module.scss';

const EventList = props => {
  const {
    eventArr: [events, setEvents]
  } = props;

  const mapEvent = ({ id, eventBody, isDone }, index) => {
    const finishItem = id => {
      const newEvents = events.map(event => {
        if (event.id === id) {
          event.isDone = true;

          localStorage.setItem(event.id, JSON.stringify(event));
        }

        return event;
      });

      setEvents(newEvents);
    };

    return (
      <EventListItem
        key={index}
        id={id}
        eventBody={eventBody}
        finishItem={finishItem}
        {...props}
      />
    );
  };

  return <ul className={styles.eventList}>{events.map(mapEvent)}</ul>;
};

export default EventList;
