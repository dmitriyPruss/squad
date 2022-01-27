function validateInputData (events, eventName) {
  let stopFunc = null;
  events.forEach(event => {
    if (event.eventBody.eventName === eventName.trim()) {
      stopFunc = true;
    }
  });

  if (stopFunc) {
    return 'Repeated name!';
  }

  return false;
}

export default validateInputData;
