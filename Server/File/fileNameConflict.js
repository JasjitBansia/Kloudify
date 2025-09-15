const fs = require("fs");
const path = require("path");
const { formatFileName } = require("./formatFileName");
function fileNameConflict(req, res) {
  let fileName = req.headers.filename;
  let username = req.username;
  try {
    fileName = formatFileName(fileName);
    let filePath = path.join(__dirname, `../../Files/${username}/${fileName}`);
    if (fs.existsSync(filePath)) {
      return res.status(409).send("File with this name already exists");
    } else {
      return res.status(200).send("OK");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { fileNameConflict };
