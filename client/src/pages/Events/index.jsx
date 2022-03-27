import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EventForm from "./EventForm";
import EventList from "./EventList";
import getInitData from "./helperFuncs/getInitData";
import EventTitle from "./EventTitle";

const Events = () => {
  const initialData = getInitData();

  const eventArr = useState(initialData);

  const timeendData = initialData.filter((i) => i.isDone === true);

  return (
    <>
      <Header />
      <EventForm eventArr={eventArr} />
      <EventTitle timeendData={timeendData} />
      <EventList eventArr={eventArr} />
      <Footer />
    </>
  );
};

export default Events;
