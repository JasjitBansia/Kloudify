const fs = require("fs");
const path = require("path");
const { port } = require("../server.js");
let requestNumber = 0;
async function uploadFile(req, res) {
  requestNumber++;
  let username = req.username;
  let fileName = req.headers.filename;
  let modifiedFileName = "";
  let fileSize = req.headers.filesize;
  let numberOfParts = req.headers.numberofparts;
  let currentPartNumber = req.headers.currentpartnumber;

  try {
    let folderPath = path.join(__dirname, `../../Files/${username}`);
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
    let folderExists = fs.existsSync(folderPath);
    if (!folderExists) {
      fs.mkdirSync(path.join(__dirname, `../../Files/${username}`));
    }

    if (requestNumber === 1) {
      let sufficientSpaceReq = await fetch(
        `http://localhost:${port}/file/checkSufficientSpace`,
        {
          method: "POST",
          headers: {
            token: req.cookies.Auth,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filesize: fileSize }),
        }
      );
      let sufficientSpaceRes = await sufficientSpaceReq.text();
      if (sufficientSpaceReq.status === 507) {
        requestNumber = 0;
        return res.status(507).send(sufficientSpaceRes);
      }
    }
    req.on("data", (part) => {
      fs.appendFileSync(filePath, part);
    });
    req.on("end", () => {
      if (numberOfParts === currentPartNumber) {
        requestNumber = 0;
        return res.status(200).send("File uploaded");
      } else {
        return res.status(200).send("Part received");
      }
    });
  } catch (e) {
    requestNumber = 0;
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { uploadFile };
