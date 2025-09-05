const { db } = require("../db.js");
async function getAllocatedSpace(req, res) {
  let username = req.username;
  let collection = db.collection("userData");
  try {
    let document = await collection.findOne({ username: username });
    let allocatedSpace = document.allocatedSpaceGB;
    return res.status(200).send(String(allocatedSpace));
  } catch (e) {
    return res.status(500).send("Error");
  }
}
module.exports = { getAllocatedSpace };
