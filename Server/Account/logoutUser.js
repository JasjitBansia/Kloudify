async function logoutUser(req, res) {
  try {
    res.clearCookie("Auth");
    return res.status(200).send("User logged out");
  } catch (e) {
    console.log(e);
  }
}
module.exports = { logoutUser };
