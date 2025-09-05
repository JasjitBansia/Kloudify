function formatSize(bytes) {
  let fileSizeType;
  let formattedSize;
  if (bytes / 1024 / 1024 / 1024 >= 1) {
    formattedSize = Number.parseFloat((bytes / 1024 / 1024 / 1024).toFixed(2));
    fileSizeType = " GB";
    return formattedSize + fileSizeType;
  } else if (bytes / 1024 / 1024 >= 1) {
    formattedSize = Number.parseFloat((bytes / 1024 / 1024).toFixed(2));
    fileSizeType = " MB";
    return formattedSize + fileSizeType;
  } else if (bytes / 1024 >= 1) {
    formattedSize = Number.parseFloat((bytes / 1024).toFixed(2));
    fileSizeType = " KB";
    return formattedSize + fileSizeType;
  } else {
    formattedSize = bytes;
    fileSizeType = " B";
    return formattedSize + fileSizeType;
  }
}
