import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import EventForm from './EventForm/EventForm';
import EventList from './EventList/EventList';
import getInitData from './helperFuncs/getInitData';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from './Events.module.scss';

const Events = () => {
  const initialData = getInitData();

  const eventArr = useState(initialData);

  const timeendData = initialData.filter(i => i.isDone === true);

  return (
    <>
      <Header></Header>
      <div>
        <EventForm eventArr={eventArr} />
        <div className={styles.eventHeader}>
          <h2>Live upcomming checks</h2>
          <div>
            <span>Remaining time: </span>
            <AccessTimeIcon />
            {timeendData.length > 0 ? (
              <span className={styles.pastEvents}>
                Quantity of past events: {timeendData.length}
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
        <EventList eventArr={eventArr} />
      </div>
      <Footer></Footer>
    </>
  );
};

export default Events;
