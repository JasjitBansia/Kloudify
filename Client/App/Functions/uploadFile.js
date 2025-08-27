async function uploadFile(file) {
  document.querySelector(".removeUpload").remove();
  let partSize = 5 * (1024 * 1024);
  let numberOfParts = Number.parseInt(file.size / partSize);
  let currentPartNumber = 0;
  let uploadingState = false;

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
          numberofparts: numberOfParts,
          currentpartnumber: currentPartNumber,
        },
        body: part,
      });
      let res = await req.text();
      if (req.status === 200) {
        uploadingState = true;
        if (res === "File uploaded") {
          uploadingState = false;
          document.querySelector(
            ".fileNameClass"
          ).innerText = `${file.name} - Uploading 100%`;
          alertMessage(res, "successAlert");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          if (uploadingState === true) {
            await getUploadProgress(file);
          }
        }
      } else if (req.status === 507) {
        uploadingState = false;
        alertMessage(res, "alert");
        setTimeout(() => {
          window.location.reload();
        }, 2700);
        break;
      } else {
        uploadingState = false;
        alertMessage("Server error", "alert");
        console.log(res);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        break;
      }
      currentPartNumber++;
    }
  } else if (fileExistsReq.status === 409) {
    alertMessage(res, "alert");
    setTimeout(() => {
      window.location.reload();
    }, 2200);
  } else {
    alert("Server error", "alert");
    console.log(res);
  }
}
