const jwt = require("jsonwebtoken");
function generateJWT(username, res) {
  let jwttoken = jwt.sign({ username: username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("Auth", jwttoken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}
module.exports = { generateJWT };
