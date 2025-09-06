const { db } = require("../db.js");
const { parse } = require("date-fns");
const fs = require("fs");
const path = require("path");
let collection = db.collection("userData");
let userCountCollection = db.collection("userCount");
async function deleteInactiveAccount() {
  let currentTimestamp = Date.now();
  try {
    (await collection.find({}).toArray()).forEach(async (document) => {
      let username = document.username;
      let lastUserPing = document.lastUserPing;
      let lastActiveTimestamp = parse(
        lastUserPing,
        "d/M/yyyy, h:mm:ss a",
        new Date()
      ).getTime();
      let dayDifference = Number.parseInt(
        (currentTimestamp - lastActiveTimestamp) / (24 * 60 * 60 * 1000)
      );
      if (dayDifference > 90) {
        await collection.deleteOne({ username: username });
        await userCountCollection.updateOne({}, { $inc: { userCount: -1 } });
        let folderPath = path.join(__dirname, `../../Files/${username}`);
        let files = fs.readdirSync(folderPath);
        let numberOfFiles = files.length;
        if (numberOfFiles > 0) {
          files.forEach((file) => {
            fs.unlinkSync(
              path.join(__dirname, `../../Files/${username}/${file}`)
            );
          });
        }
        fs.rmdirSync(folderPath);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
module.exports = { deleteInactiveAccount };
