async function uploadFile(file) {
  document.querySelector(".removeUpload").remove();
  let partSize = 5 * (1024 * 1024);
  let numberOfParts = Number.parseInt(file.size / partSize);
  let currentPartNumber = 0;

  let fileExistsReq = await fetch("/file/fileNameConflict", {
    headers: {
      filename: file.name,
    },
  });
  let res = await fileExistsReq.text();
  if (fileExistsReq.status === 200) {
    for (let i = 0; i <= file.size; i += partSize) {
      let part = file.slice(i, i + partSize);
      let req = await fetch("/file/upload", {
        method: "POST",
        headers: {
          filename: file.name,
          filesize: file.size,
          partsize: partSize,
          numberofparts: numberOfParts,
          currentpartnumber: currentPartNumber,
        },
        body: part,
      });
      let res = await req.text();
      if (req.status === 200) {
        sessionStorage.setItem("isUploading", "true");
        if (res === "File uploaded") {
          sessionStorage.setItem("isUploading", "false");
          document.querySelector(
            ".fileNameClass"
          ).innerText = `${file.name} - Uploading 100%`;
          alertMessage(res, "successAlert");
          getFileList();
          resetUploadState();
        } else {
          if (sessionStorage.getItem("isUploading") === "true") {
            await getUploadProgress(file);
          }
        }
      } else if (req.status === 507) {
        sessionStorage.setItem("isUploading", "false");
        alertMessage(res, "alert");
        resetUploadState();
        break;
      } else if (req.status === 400) {
        sessionStorage.setItem("isUploading", "false");
        alertMessage(res, "alert");
        resetUploadState();
        break;
      } else if (req.status === 503) {
        sessionStorage.setItem("isUploading", "false");
        alertMessage(res, "alert");
        resetUploadState();
        break;
      } else {
        sessionStorage.setItem("isUploading", "false");
        alertMessage("Server error", "alert");
        resetUploadState();
        console.log(res);
        break;
      }
      currentPartNumber++;
    }
  } else if (fileExistsReq.status === 409) {
    alertMessage(res, "alert");
    sessionStorage.setItem("isUploading", "false");
    resetUploadState();
  } else {
    alert("Server error", "alert");
    console.log(res);
  }
}
