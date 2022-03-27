function getInitData() {
  let initialData = [];

  for (let key of Object.keys(localStorage)) {
    if (!isNaN(key)) {
      const newItem = JSON.parse(localStorage.getItem(key));

      const {
        eventBody: {
          eventDate: { year, month, day, hours, minutes },
        },
      } = newItem;

      const date = new Date(year, month, day, hours, minutes);
      newItem.date = date;

      initialData.push(newItem);
    }
  }

  initialData
    .sort((a, b) => a.date - b.date)
    .forEach((data) => delete data.date);

  return initialData;
}

export default getInitData;
