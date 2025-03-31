const { Router } = require("express");
const { registerUser } = require("../Account/Register/registerUser.js");
const router = Router();
router.get("/", (req, res) => {
  res.send(200);
});
router.post("/register", registerUser);
module.exports = router;
