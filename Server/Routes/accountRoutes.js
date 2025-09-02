const { Router } = require("express");
const router = Router();
const { registerUser } = require("../Account/registerUser.js");
const { loginUser } = require("../Account/loginUser.js");
const { logoutUser } = require("../Account/logoutUser.js");
const { authMiddleware } = require("../Middleware/authMiddleware.js");
const { pingUser } = require("../Account/pingUser.js");
router.get("/", (req, res) => {
  res.redirect("/app");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.post("/pingUser", authMiddleware, pingUser);
module.exports = router;
