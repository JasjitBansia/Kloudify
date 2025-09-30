const fs = require("fs");
const path = require("path");
async function getFileList(req, res) {
  let username = req.username;
  let folderPath = path.join(__dirname, `../../Files/${username}`);
  let fileArray = [];
  try {
    let files = fs.readdirSync(folderPath);
    files.forEach((file) => {
      let fileStats = fs.statSync(folderPath + `/${file}`);
      let ctime = fileStats.ctimeMs;
      let size = fileStats.size;
      let obj = {
        fileName: file,
        ctime: ctime,
        size: size,
        url: `https://kloudify.host/files/${username}/${file}`,
      };
      fileArray.push(obj);
    });
    for (let i = 0; i < fileArray.length - 1; i++) {
      for (let j = 0; j < fileArray.length - i - 1; j++) {
        if (fileArray[j].ctime < fileArray[j + 1].ctime) {
          let temp = fileArray[j];
          fileArray[j] = fileArray[j + 1];
          fileArray[j + 1] = temp;
        }
      }
    }
    return res.status(200).send(fileArray);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { getFileList };
