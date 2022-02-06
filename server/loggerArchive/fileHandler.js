const { readFile, writeFile, truncate } = require('fs/promises');
const path = require('path');
const loggedDataHandler = require('./loggedDataHandler');

module.exports = async () => {
  const { dir } = path.parse(__dirname);

  const filePath = `${dir}/logger/err_report.txt`;

  try {
    const fileData = await readFile(filePath, 'utf8');

    let newFileData;
    if (fileData !== '') {
      newFileData = fileData
        .split('}')
        .map(loggedDataHandler)
        .join(' \n');
    } else {
      newFileData = '';
    }

    const newFile = await writeFile(
      `${dir}/loggerArchive/${+new Date()}.txt`,
      newFileData
    );

    const truncatedFile = await truncate(filePath);
  } catch (error) {
    return error;
  }
};
