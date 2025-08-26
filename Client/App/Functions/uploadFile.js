async function uploadFile(file) {
  document.querySelector(".removeUpload").remove();
  console.log(file.name);
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
    let enoughSpace = await fetch("/file/getSpaceUsed");
    let res = await enoughSpace.text();
    if (enoughSpace.status === 200) {
      for (let i = 0; i < file.size; i += partSize) {
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
          if (res === "File uploaded") {
            alertMessage(res, "successAlert");
          } else {
            console.log("Part received");
          }
        } else if (req.status === 409) {
          alertMessage(res, "alert");
        } else {
          alertMessage("Server error", "alert");
          console.log(res);
        }
        console.log(res);
        currentPartNumber++;
      }
    } else if (enoughSpace.status === 507) {
      alertMessage(res, "alert");
    } else {
      alert("Server error", "alert");
      console.log(res);
    }
  } else if (fileExistsReq.status === 409) {
    alertMessage(res, "alert");
  } else {
    alert("Server error", "alert");
    console.log(res);
  }
}
