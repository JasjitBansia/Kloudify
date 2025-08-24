const { db } = require("../db.js");
const { generateJWT } = require("./generateJWT.js");
const { hashPassword } = require("./Hashing/hashPassword.js");
let collection = db.collection("userData");
let userCountCollection = db.collection("userCount");
async function registerUser(req, res) {
  let userDocument = await userCountCollection.findOne({});
  let userCount = userDocument.userCount;
  let receivedUsername = req.body.username;
  let receivedPassword = req.body.password;
  try {
    if (userCount < 15) {
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
        await userCountCollection.updateOne({}, { $inc: { userCount: 1 } });
        generateJWT(receivedUsername, res);
        return res.status(200).send("User registererd");
      } else {
        return res.status(409).send("User already exists");
      }
    } else {
      return res
        .status(403)
        .send("Max number of users have already registered. Sorry :(");
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = { registerUser };
