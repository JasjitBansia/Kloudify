const fs = require("fs");
const path = require("path");
async function deleteFile(req, res) {
  let fileName = req.body.filename;
  let username = req.username;
  try {
    let filePath = path.join(__dirname, `../../Files/${username}/${fileName}`);
    fs.unlinkSync(filePath);
    return res.status(200).send("Deleted");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { deleteFile };
