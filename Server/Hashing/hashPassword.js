const bcrypt = require("bcrypt");
async function hashPassword(plainTextPassword) {
  try {
    let hash = await bcrypt.hash(plainTextPassword, 5);
    return hash;
  } catch (err) {
    console.log(err);
  }
}
module.exports = { hashPassword };
