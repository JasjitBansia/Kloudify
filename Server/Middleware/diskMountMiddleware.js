const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
function diskMountMiddleware(req, res, next) {
  let mountStatus = mountDisk();
  if (mountStatus === "mounted") {
    next();
  } else {
    console.log(mountStatus);
  }
}
function mountDisk() {
  try {
    let mountScript = path.join(__dirname, "../../Scripts/mountDisk.sh");
    let mountPath = path.join(__dirname, "../../Files");
    let mountCmd = execSync(`bash ${mountScript} ${mountPath}`, {
      encoding: "ascii",
    });
    return mountCmd.trim();
  } catch (e) {
    console.log(e);
  }
}
module.exports = { diskMountMiddleware, mountDisk };
