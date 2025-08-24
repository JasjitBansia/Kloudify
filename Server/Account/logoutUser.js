async function logoutUser(req, res) {
  res.clearCookie("Auth");
  return res.status(200).send("User logged out");
}
module.exports = { logoutUser };
