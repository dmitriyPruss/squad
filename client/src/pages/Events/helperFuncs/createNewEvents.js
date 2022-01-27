function createNewEvents (events, eventName, eventDate) {
  const newEvent = {
    id: Date.now(),
    eventBody: {
      eventName,
      eventDate
    },
    isDone: false
  };

  localStorage.setItem(newEvent.id, JSON.stringify(newEvent));

  const newEvents = [...events, newEvent];

  for (let i = 0; i < newEvents.length; i++) {
    const {
      eventBody: { eventDate }
    } = newEvents[i];

    const date = new Date(eventDate.year, eventDate.month, eventDate.day);
    newEvents[i].date = date;
  }

  return newEvents.sort((a, b) => a.date - b.date);
}

export default createNewEvents;
