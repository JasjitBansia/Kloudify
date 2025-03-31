let bcrypt = require("bcrypt");
async function comparePassword(plainTextPassword, hash) {
  try {
    let result = await bcrypt.compare(plainTextPassword, hash);
    return result;
  } catch (err) {
    console.log(err);
  }
}
module.exports = { comparePassword };
