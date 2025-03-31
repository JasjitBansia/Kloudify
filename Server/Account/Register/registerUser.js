const { db } = require("../../server.js");
async function register(req, res) {
  await db.collection("userdata").insertOne({
    username: req.body.username,
    password: req.body.password,
  });
  console.log("User registered");
}
module.exports = { register };
