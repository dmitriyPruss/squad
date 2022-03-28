module.exports = (i) => {
  if (i !== "\n") {
    let data;
    data = i + "}";

    const { message, code, time } = JSON.parse(data);

    const newItemForArch = {
      message,
      code,
      time,
    };

    return JSON.stringify(newItemForArch, null, 2);
  }
};
