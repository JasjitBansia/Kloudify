const { Router } = require("express");
const router = Router();
const { uploadFile } = require("../File/uploadFile.js");
const { fileNameConflict } = require("../File/fileNameConflict.js");
const { getSpaceUsed } = require("../File/getSpaceUsed.js");
router.get("/", (req, res) => {
  res.redirect("/app");
});
router.post("/upload", uploadFile);
router.get("/fileNameConflict", fileNameConflict);
router.get("/getSpaceUsed", getSpaceUsed);
module.exports = router;
