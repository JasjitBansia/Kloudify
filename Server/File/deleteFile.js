const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
let shreddingState = { shredding: false };
async function deleteFile(req, res) {
  let fileName = req.headers.filename;
  let deletionType = req.headers.deletiontype;
  let username = req.username;
  try {
    let filePath = path.join(__dirname, `../../Files/${username}/${fileName}`);
    let scriptPath = path.join(__dirname, "../../Scripts/shredFile.sh");
    if (deletionType === "normal") {
      fs.unlinkSync(filePath);
      return res.status(200).send("Deleted");
    } else if (deletionType === "shred") {
      shreddingState.shredding = true;
      exec(`bash ${scriptPath} ${filePath}`, (err, stdout, stderr) => {
        if (err) {
          shreddingState.shredding = false;
          return res.status(500).send("Error");
        }
        if (stderr.trim().endsWith(`shred: ${filePath}: removed`)) {
          shreddingState.shredding = false;
        }
      });
      return res.status(202).send("File shredding process has started");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { deleteFile, shreddingState };
