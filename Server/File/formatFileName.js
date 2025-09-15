function formatFileName(originalName) {
  let modifiedFileName = "";
  for (let i = 0; i <= originalName.length - 1; i++) {
    if (originalName.charAt(i) === " ") {
      modifiedFileName += "-";
    } else {
      modifiedFileName += originalName.charAt(i);
    }
  }
  return modifiedFileName;
}
module.exports = { formatFileName };
