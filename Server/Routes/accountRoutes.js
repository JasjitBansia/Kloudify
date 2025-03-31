const { Router } = require("express");
const { register } = require("../Account/Register/registerUser.js");
const router = Router();
router.get("/", (req, res) => {
  res.send(200);
});
router.post("/register", register);
module.exports = router;
