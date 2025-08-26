const fs = require("fs");
const path = require("path");
async function uploadFile(req, res) {
  let username = req.username;
  let fileName = req.headers.filename;
  let fileSize = req.headers.filesize;
  let numberOfParts = req.headers.numberofparts;
  let currentPartNumber = req.headers.currentpartnumber;
  try {
    let folderPath = path.join(__dirname, `../../Files/${username}`);
    let filePath = path.join(__dirname, `../../Files/${username}/${fileName}`);
    let folderExists = fs.existsSync(folderPath);
    if (!folderExists) {
      fs.mkdirSync(path.join(__dirname, `../../Files/${username}`));
    }

    req.on("data", (part) => {
      fs.appendFileSync(filePath, part);
    });
    req.on("end", () => {
      if (numberOfParts === currentPartNumber) {
        return res.status(200).send("File uploaded");
      } else {
        return res.status(200).send("Part received");
      }
    });
  } catch (e) {
    console.log(e);
  }
}
module.exports = { uploadFile };
