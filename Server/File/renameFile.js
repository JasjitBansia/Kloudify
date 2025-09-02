const fs = require("fs");
const path = require("path");
const { port } = require("../server.js");
async function renameFile(req, res) {
  let username = req.username;
  let oldFileName = req.body.oldfilename;
  let newFileName = req.body.newfilename;
  try {
    let folderPath = path.join(__dirname, `../../Files/${username}`);
    let oldNamePath = folderPath + `/${oldFileName}`;
    let newNamePath = folderPath + `/${newFileName}`;
    let nameCheckReq = await fetch(
      `http://localhost:${port}/file/fileNameConflict`,
      {
        headers: {
          token: req.cookies.Auth,
          filename: newFileName,
        },
      }
    );
    if (nameCheckReq.status === 200) {
      fs.renameSync(oldNamePath, newNamePath);
      return res.status(200).send("File renamed");
    } else if (nameCheckReq.status === 409) {
      return res.status(409).send("A file with this name already exists");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { renameFile };
