const fs = require("fs");
const path = require("path");
async function deleteFile(req, res) {
  let fileName = req.headers.filename;
  let deletionType = req.headers.deletiontype;
  let username = req.username;
  try {
    let filePath = path.join(__dirname, `../../Files/${username}/${fileName}`);
    if (deletionType === "normal") {
      fs.unlinkSync(filePath);
      return res.status(200).send("Deleted");
    } else if (deletionType === "shred") {
      return res.status(501).send("Feature coming in future");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { deleteFile };
