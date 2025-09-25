const fs = require("fs");
const path = require("path");
async function getSpaceUsed(req, res) {
  let username = req.username;
  let folderPath = path.join(__dirname, `../../Files/${username}`);
  try {
    let files = fs.readdirSync(folderPath);
    let totalSize = 0;
    files.forEach((file) => {
      let filePath = folderPath + `/${file}`;
      let fileSize = fs.statSync(filePath).size;
      totalSize += fileSize;
    });
    return res.status(200).send({ usedSpace: totalSize });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { getSpaceUsed };
