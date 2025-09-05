let { shreddingState } = require("./deleteFile.js");
async function getShreddingState(req, res) {
  try {
    res.status(200).send(shreddingState);
  } catch (e) {
    return res.status(500).send("Error");
  }
  res.status(200);
}
module.exports = {
  getShreddingState,
};
