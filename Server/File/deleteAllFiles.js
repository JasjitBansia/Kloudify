const fs = require("fs");
const path = require("path");
async function deleteAllFiles(req, res) {
  let username = req.username;
  try {
    let folderPath = path.join(__dirname, `../../Files/${username}`);
    let files = fs.readdirSync(folderPath);
    let numberOfFiles = files.length;
    if (numberOfFiles > 0) {
      files.forEach((file) => {
        fs.unlinkSync(path.join(__dirname, `../../Files/${username}/${file}`));
      });
      return res.status(200).send("All files deleted");
    } else {
      return res.status(404).send("There are no files to delete");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { deleteAllFiles };
