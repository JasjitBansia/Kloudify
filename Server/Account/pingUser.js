const { db } = require("../db.js");
let collection = db.collection("userData");
async function pingUser(req, res) {
  let username = req.username;
  try {
    await collection.updateOne(
      { username: username },
      { $set: { lastUserPing: new Date().toLocaleString("en-IN") } }
    );
    return res.status(200).send("Pinged");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { pingUser };
