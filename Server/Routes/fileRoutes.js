const { Router } = require("express");
const router = Router();
const { uploadFile } = require("../File/uploadFile.js");
const { fileNameConflict } = require("../File/fileNameConflict.js");
const { getSpaceUsed } = require("../File/getSpaceUsed.js");
const { checkSufficientSpace } = require("../File/checkSufficientSpace.js");
const { getUploadProgress } = require("../File/getUploadProgress.js");
const { deleteFile } = require("../File/deleteFile.js");
router.get("/", (req, res) => {
  res.redirect("/app");
});
router.post("/upload", uploadFile);
router.get("/fileNameConflict", fileNameConflict);
router.get("/getSpaceUsed", getSpaceUsed);
router.post("/checkSufficientSpace", checkSufficientSpace);
router.get("/getUploadProgress", getUploadProgress);
router.delete("/delete", deleteFile);
module.exports = router;
