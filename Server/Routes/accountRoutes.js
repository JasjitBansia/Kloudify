const { Router } = require("express");
const { registerUser } = require("../Account/registerUser.js");
const { loginUser } = require("../Account/loginUser.js");
const router = Router();
router.get("/", (req, res) => {
  res.send(200);
});
router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;
