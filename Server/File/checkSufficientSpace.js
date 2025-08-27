const { db } = require("../db.js");
const collection = db.collection("userData");
const { port } = require("../server.js");
async function checkSufficientSpace(req, res) {
  let username = req.username;
  let currentFileSize = Number.parseInt(req.body.filesize);
  try {
    let userDocument = await collection.findOne({ username: username });
    let allocatedSpaceInBytes = userDocument.allocatedSpaceGB;
    allocatedSpaceInBytes = allocatedSpaceInBytes * 1024 * 1024 * 1024;
    let usedSpaceReq = await fetch(
      `http://localhost:${port}/file/getSpaceUsed`,
      {
        headers: {
          token: req.headers.token,
        },
      }
    );
    let usedSpaceRes = await usedSpaceReq.json();
    let usedSpace = usedSpaceRes.usedSpace;
    if (usedSpace + currentFileSize > allocatedSpaceInBytes) {
      return res
        .status(507)
        .send("Not enough storage space to upload this file");
    } else {
      return res.status(200).send("OK");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { checkSufficientSpace };
