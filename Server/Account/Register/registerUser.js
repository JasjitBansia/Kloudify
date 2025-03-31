const { db } = require("../../db.js");
const { hashPassword } = require("../../Hashing/hashPassword.js");
let collection = db.collection("userData");
async function registerUser(req, res) {
  let receivedUsername = req.body.username;
  let receivedPassword = req.body.password;

  try {
    let userExists = await collection.findOne({
      username: receivedUsername,
    });
    if (userExists === null) {
      let hashedPassword = await hashPassword(receivedPassword);
      collection.findOne();
      db.collection;
      await collection.insertOne({
        username: receivedUsername,
        password: hashedPassword,
        createdAt: new Date().toLocaleString("en-IN"),
        allocatedSpaceGB: 75,
        lastUserPing: new Date().toLocaleString("en-IN"),
      });
      return res.status(200).send("User registererd");
    } else {
      return res.status(409).send("User already exists");
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = { registerUser };
