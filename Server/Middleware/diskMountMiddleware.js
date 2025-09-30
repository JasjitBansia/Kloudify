const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
function diskMountMiddleware(req, res, next) {
  mountDisk();
  next();
}
function mountDisk() {
  try {
    let mountScript = path.join(__dirname, "../../Scripts/mountDisk.sh");
    let mountPath = path.join(__dirname, "../../Files");
    let mountCmd = execSync(`bash ${mountScript} ${mountPath}`, {
      encoding: "ascii",
    });
    let output = mountCmd.trim();
    if (Number.parseInt(output) === 0 || output.endsWith("0")) {
      return output;
    } else {
      process.exit(1);
    }
  } catch (e) {
    console.log(e);
  }
}
module.exports = { diskMountMiddleware, mountDisk };
