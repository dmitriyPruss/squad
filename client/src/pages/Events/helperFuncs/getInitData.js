function getInitData () {
  let initialData = [];

  // localStorage.clear();

  for (let key of Object.keys(localStorage)) {
    if (!isNaN(key)) {
      const newItem = JSON.parse(localStorage.getItem(key));

      const {
        eventBody: {
          eventDate: { year, month, day }
        }
      } = newItem;

      const date = new Date(year, month, day);
      newItem.date = date;

      initialData.push(newItem);
    }
  }

  return initialData.sort((a, b) => a.date - b.date);
}

export default getInitData;
