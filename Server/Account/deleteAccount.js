const { db } = require("../db.js");
const { port } = require("../server.js");
let collection = db.collection("userData");
let fs = require("fs");
let path = require("path");
async function deleteAccount(req, res) {
  let username = req.username;
  try {
    let deleteAllFilesReq = await fetch(
      `http://localhost:${port}/file/deleteAllFiles`,
      {
        method: "DELETE",
        headers: {
          token: req.cookies.Auth,
        },
      }
    );
    if (deleteAllFilesReq.status === 200 || deleteAllFilesReq.status === 404) {
      let folderPath = path.join(__dirname, `../../Files/${username}`);
      fs.rmdirSync(folderPath);
      await collection.deleteOne({ username: username });
      res.clearCookie("Auth");
      return res.status(200).send("Your account has been deleted");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { deleteAccount };
