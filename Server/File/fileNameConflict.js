const fs = require("fs");
const path = require("path");
function fileNameConflict(req, res) {
  let fileName = req.headers.filename;
  let modifiedFileName = "";
  let username = req.username;
  try {
    for (let i = 0; i <= fileName.length - 1; i++) {
      if (fileName.charAt(i) === " ") {
        modifiedFileName += "-";
      } else {
        modifiedFileName += fileName.charAt(i);
      }
    }
    let filePath = path.join(
      __dirname,
      `../../Files/${username}/${modifiedFileName}`
    );
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
