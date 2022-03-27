import getInitData from "./getInitData";

function createNewEvents(eventName, eventDate, createdEventDate) {
  const newEvent = {
    id: Date.now(),
    eventBody: {
      eventName,
      eventDate,
      createdEventDate,
    },
    isDone: false,
  };

  localStorage.setItem(newEvent.id, JSON.stringify(newEvent));

  const newEvents = getInitData();

  return newEvents;
}

export default createNewEvents;
