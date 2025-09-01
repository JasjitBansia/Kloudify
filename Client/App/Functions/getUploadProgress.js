async function getUploadProgress(file) {
  let originalFileSize = file.size;
  let modifiedOriginalFileSize;
  let modifiedUploadedFileSize;
  let fileSizeType;
  let uploadedDataType;
  let fileName = file.name;
  let req = await fetch("/file/getUploadProgress", {
    headers: {
      filename: fileName,
    },
  });
  let res = await req.text();
  let uploadedFileSize = Number.parseInt(res);
  let uploadPercentage = (uploadedFileSize / originalFileSize) * 100;
  let screenWidth = screen.width;

  if (originalFileSize / 1024 / 1024 / 1024 > 1) {
    modifiedOriginalFileSize = Number.parseFloat(
      (originalFileSize / 1024 / 1024 / 1024).toFixed(2)
    );
    fileSizeType = "GB";
  } else if (originalFileSize / 1024 / 1024 > 1) {
    modifiedOriginalFileSize = Number.parseFloat(
      (originalFileSize / 1024 / 1024).toFixed(2)
    );
    fileSizeType = "MB";
  } else if (originalFileSize / 1024 > 1) {
    modifiedOriginalFileSize = Number.parseFloat(
      (originalFileSize / 1024).toFixed(2)
    );
    fileSizeType = "KB";
  } else {
    modifiedOriginalFileSize = originalFileSize;
    fileSizeType = "B";
  }

  if (uploadedFileSize / 1024 / 1024 / 1024 > 1) {
    modifiedUploadedFileSize = Number.parseFloat(
      (uploadedFileSize / 1024 / 1024 / 1024).toFixed(2)
    );
    uploadedDataType = "GB";
  } else if (uploadedFileSize / 1024 / 1024 > 1) {
    modifiedUploadedFileSize = Number.parseFloat(
      (uploadedFileSize / 1024 / 1024).toFixed(2)
    );
    uploadedDataType = "MB";
  } else if (uploadedFileSize / 1024 > 1) {
    modifiedUploadedFileSize = Number.parseFloat(
      (uploadedFileSize / 1024).toFixed(2)
    );
    uploadedDataType = "KB";
  } else {
    modifiedUploadedFileSize = uploadedFileSize;
    uploadedDataType = "B";
  }

  if (fileName.length > 10) {
    fileName = fileName.slice(0, 10) + "...";
  }
  if (screenWidth < 768) {
    document.querySelector(".fileNameClass").style.fontSize = "30px";
  }
  document.querySelector(
    ".fileNameClass"
  ).innerText = `${fileName} - Uploading ${uploadPercentage.toFixed(
    2
  )}% (${modifiedUploadedFileSize} ${uploadedDataType} / ${modifiedOriginalFileSize} ${fileSizeType})`;
}
