const { db } = require("../db.js");
const collection = db.collection("userData");
const { port } = require("../server.js");
async function checkSufficientSpace(req, res) {
  let username = req.username;
  let fileSize = Number.parseInt(req.body.filesize);
  let currentPartNumber = req.body.currentpartnumber;
  let partSize = req.body.partsize;

  try {
    let userDocument = await collection.findOne({ username: username });
    let allocatedSpaceInBytes = userDocument.allocatedSpaceGB;
    allocatedSpaceInBytes = allocatedSpaceInBytes * 1024 * 1024 * 1024;
    let usedSpaceReq = await fetch(
      `http://localhost:${port}/account/getSpaceUsed`,
      {
        headers: {
          token: req.headers.token,
        },
      }
    );
    let usedSpaceRes = await usedSpaceReq.json();
    let usedSpace = usedSpaceRes.usedSpace;
    if (
      usedSpace + (fileSize - currentPartNumber * partSize) >
      allocatedSpaceInBytes
    ) {
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
