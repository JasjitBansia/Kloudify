const bcrypt = require("bcrypt");
async function hashPassword(plainTextPassword) {
  try {
    let hash = await bcrypt.hash(plainTextPassword, 12);
    return hash;
  } catch (err) {
    console.log(err);
  }
}
module.exports = { hashPassword };
