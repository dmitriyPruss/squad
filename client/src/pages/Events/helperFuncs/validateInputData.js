function validateInputData (events, eventName, eventDate, createdEventDate) {
  let stopFunc = null;
  events.forEach(event => {
    if (event.eventBody.eventName === eventName.trim()) {
      stopFunc = true;
    }
  });

  if (stopFunc) {
    return 'Repeated name!';
  }

  if (
    eventDate.year <= createdEventDate.getFullYear() &&
    eventDate.month <= createdEventDate.getMonth() &&
    eventDate.day < createdEventDate.getDate()
  ) {
    return 'This isn`t a future date';
  }

  if (
    eventDate.year === createdEventDate.getFullYear() &&
    eventDate.month === createdEventDate.getMonth() &&
    eventDate.day === createdEventDate.getDate() &&
    eventDate.hours < createdEventDate.getHours()
  ) {
    console.log('eventDate.hours', eventDate.hours);
    return 'This hour has already passed';
  }

  if (
    eventDate.year === createdEventDate.getFullYear() &&
    eventDate.month === createdEventDate.getMonth() &&
    eventDate.day === createdEventDate.getDate() &&
    eventDate.hours === createdEventDate.getHours() &&
    eventDate.minutes < createdEventDate.getMinutes()
  ) {
    return 'These minutes have already passed';
  }

  return false;
}

export default validateInputData;
