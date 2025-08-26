const fs = require("fs");
const path = require("path");
const { db } = require("../db.js");
const collection = db.collection("userData");
async function getSpaceUsed(req, res) {
  let username = req.username;
  let userDocument = await collection.findOne({ username: username });
  let allocatedSpace = userDocument.allocatedSpaceGB;
  let folderPath = path.join(__dirname, `../../Files/${username}`);
  try {
    let files = fs.readdirSync(folderPath);
    let totalSize = 0;
    files.forEach((file) => {
      let filePath = folderPath + `/${file}`;
      let fileSize = fs.statSync(filePath).size;
      totalSize += fileSize;
    });
    totalSize = totalSize / 1024 / 1024 / 1024;
    console.log(totalSize);
    if (totalSize > allocatedSpace) {
      return res
        .status(507)
        .send("Not enough storage space to upload this file");
    } else {
      return res.status(200).send("OK");
    }
  } catch (e) {
    console.log(e);
  }
}
module.exports = { getSpaceUsed };
