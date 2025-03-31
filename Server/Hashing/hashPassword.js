const bcrypt = require("bcrypt");
async function hashPassword(plainTextPassword) {
  let hash = await bcrypt.hash(plainTextPassword, 5);
  return hash;
}
module.exports = { hashPassword };
