const fs = require("fs");
const path = require("path");
async function getUploadProgress(req, res) {
  let fileName = req.headers.filename;
  let username = req.username;
  try {
    let filePath = path.join(__dirname, `../../Files/${username}/${fileName}`);
    let fileStat = fs.statSync(filePath);
    let fileSize = fileStat.size;
    return res.status(200).send(fileSize.toString());
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { getUploadProgress };
