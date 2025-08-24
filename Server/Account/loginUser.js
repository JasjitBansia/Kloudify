const { db } = require("../db.js");
const { generateJWT } = require("./generateJWT.js");
let collection = db.collection("userData");
let { comparePassword } = require("./Hashing/comparePassword.js");
async function loginUser(req, res) {
  let receivedUsername = req.body.username;
  let receivedPassword = req.body.password;
  try {
    let user = await collection.findOne({
      username: receivedUsername,
    });
    if (user === null) {
      return res.status(401).send("Invalid credentials entered");
    }
    let comparedPassword = await comparePassword(
      receivedPassword,
      user.password
    );
    if (comparedPassword === false) {
      return res.status(401).send("Invalid credentials entered");
    } else {
      generateJWT(user.username, res);
      return res.status(200).send("User logged in");
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = { loginUser };
