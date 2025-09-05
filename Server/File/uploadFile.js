const fs = require("fs");
const path = require("path");
const { port } = require("../server.js");
const { shreddingState } = require("../File/deleteFile.js");
async function uploadFile(req, res) {
  let username = req.username;
  let fileName = req.headers.filename;
  let modifiedFileName = "";
  let fileSize = req.headers.filesize;
  let numberOfParts = req.headers.numberofparts;
  let currentPartNumber = req.headers.currentpartnumber;
  let partSize = req.headers.partsize;
  try {
    if (fileSize > 5) {
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
      if (shreddingState.shredding === false) {
        let sufficientSpaceReq = await fetch(
          `http://localhost:${port}/file/checkSufficientSpace`,
          {
            method: "POST",
            headers: {
              token: req.cookies.Auth,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              filesize: fileSize,
              currentpartnumber: currentPartNumber,
              partsize: partSize,
            }),
          }
        );
        let sufficientSpaceRes = await sufficientSpaceReq.text();
        if (sufficientSpaceReq.status === 507) {
          return res.status(507).send(sufficientSpaceRes);
        } else if (sufficientSpaceReq.status === 200) {
          req.on("data", (part) => {
            fs.appendFileSync(filePath, part);
          });
          req.on("end", () => {
            if (numberOfParts === currentPartNumber) {
              return res.status(200).send("File uploaded");
            } else {
              return res.status(200).send("Part received");
            }
          });
        } else {
          return res.status(400).send("File size must be greater than 5 bytes");
        }
      } else {
        return res
          .status(503)
          .send(
            "A shredding process is in progress on the platform. Try again later"
          );
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { uploadFile };
