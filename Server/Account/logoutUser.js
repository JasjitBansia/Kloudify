async function logoutUser(req, res) {
  try {
    res.clearCookie("Auth");
    return res.status(200).send("User logged out");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
}
module.exports = { logoutUser };
