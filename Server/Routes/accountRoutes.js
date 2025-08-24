const { Router } = require("express");
const { registerUser } = require("../Account/registerUser.js");
const { loginUser } = require("../Account/loginUser.js");
const { logoutUser } = require("../Account/logoutUser.js");
const router = Router();
const { authMiddleware } = require("../Middleware/authMiddleware.js");

router.get("/", (req, res) => {
  res.redirect("/app");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);

module.exports = router;
