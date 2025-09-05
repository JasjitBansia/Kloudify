async function getUploadProgress(file) {
  let originalFileSize = file.size;
  let formattedFileSize = formatSize(originalFileSize);
  let fileName = file.name;
  let req = await fetch("/file/getUploadProgress", {
    headers: {
      filename: fileName,
    },
  });
  let res = await req.text();
  let uploadedFileSize = Number.parseInt(res);
  let formattedUploadedSize = formatSize(uploadedFileSize);
  let uploadPercentage = (uploadedFileSize / originalFileSize) * 100;
  let screenWidth = screen.width;
  if (fileName.length > 10) {
    fileName = fileName.slice(0, 10) + "...";
  }
  if (screenWidth < 768) {
    document.querySelector(".fileNameClass").style.fontSize = "25px";
  }
  document.querySelector(
    ".fileNameClass"
  ).innerText = `${fileName} - Uploading\n ${uploadPercentage.toFixed(
    2
  )}% (${formattedUploadedSize} / ${formattedFileSize})`;
}
