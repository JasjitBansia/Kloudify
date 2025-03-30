const { Router } = require("express");
const router = Router();
router.get("/", (req, res) => {
  res.send(200);
});
router.post("/register", (req, res) => {
  console.log("Register route");
  console.log(req.body);
});
module.exports = router;
