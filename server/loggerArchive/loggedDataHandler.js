module.exports = (i, index) => {
  if (i !== '\n') {
    let data;
    data = i + '}';

    console.log(data);
    const newItem = JSON.parse(data);

    const newItemForArch = {
      message: newItem.message,
      code: newItem.code,
      time: newItem.time
    };

    return JSON.stringify(newItemForArch, null, 2);
  }
};
