function removeFileOptionWindow() {
  document.querySelector(".background").remove();
  document.querySelector(".fileActions").remove();
}

async function fileOptions(fileName, fileNameElement, url) {
  //      <div class="fileActions">
  //   <div id="downloadFileOption"><img src="../Assets/download.png" />Download</div>
  //   <div id="copyLinkOption"><img src="../Assets/copy.png" />Copy Link</div>
  //   <div id="renameFileOption"><img src="../Assets/rename.png" />Rename</div>
  //   <div id="deleteFileOption">
  //     <img src="../Assets/delete-inverted.png" />Delete
  //   </div>
  // </div>
  let backgroundDiv = document.createElement("div");
  backgroundDiv.classList.add("background");
  document.body.prepend(backgroundDiv);
  let fileActionsDiv = document.createElement("div");
  fileActionsDiv.classList.add("fileActions");

  let downloadFileDiv = document.createElement("div");
  downloadFileDiv.id = "downloadFileOption";
  downloadFileDiv.innerText = "Download";
  let downloadFileImg = document.createElement("img");
  downloadFileImg.src = "../../Assets/download.png";
  downloadFileDiv.appendChild(downloadFileImg);

  let copyLinkOptionDiv = document.createElement("div");
  copyLinkOptionDiv.id = "copyLinkOption";
  copyLinkOptionDiv.innerText = "Copy Link";
  let copyLinkImg = document.createElement("img");
  copyLinkImg.src = "../../Assets/copy.png";
  copyLinkOptionDiv.appendChild(copyLinkImg);

  let renameFileDiv = document.createElement("div");
  renameFileDiv.id = "renameFileOption";
  renameFileDiv.innerText = "Rename";
  let renameFileImg = document.createElement("img");
  renameFileImg.src = "../../Assets/rename.png";
  renameFileDiv.appendChild(renameFileImg);

  let deleteFileDiv = document.createElement("div");
  deleteFileDiv.id = "deleteFileOption";
  deleteFileDiv.innerText = "Delete";
  let deleteFileImg = document.createElement("img");
  deleteFileImg.src = "../../Assets/delete-inverted.png";
  deleteFileDiv.appendChild(deleteFileImg);

  fileActionsDiv.appendChild(downloadFileDiv);
  fileActionsDiv.appendChild(copyLinkOptionDiv);
  fileActionsDiv.appendChild(renameFileDiv);
  fileActionsDiv.appendChild(deleteFileDiv);
  document.body.prepend(fileActionsDiv);
  window.scrollTo(0, 0);

  downloadFileDiv.addEventListener("click", () => {
    downloadFile(url, fileName, downloadFileDiv);
  });

  copyLinkOptionDiv.addEventListener("click", () => {
    copyFileLink(url);
  });

  renameFileDiv.addEventListener("click", () => {
    renameFile(fileName);
  });

  deleteFileDiv.addEventListener("click", () => {
    deleteFile(fileName, fileNameElement);
  });
}

function downloadFile(url, fileName, downloadFileDiv) {
  removeFileOptionWindow();
  let anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

async function copyFileLink(url) {
  removeFileOptionWindow();
  await navigator.clipboard.writeText(url);
  alertMessage("Link copied to clipboard", "successAlert");
}

async function renameFile(fileName) {
  inputConfirmation("Enter new file name: ");
  removeFileOptionWindow();
  let confirmInput = document.querySelector("#confirmInput");
  confirmInput.value = fileName;
  let excludeFileExtension = fileName.lastIndexOf(".");
  confirmInput.focus();
  confirmInput.setSelectionRange(0, excludeFileExtension);
  let confirmButton = document.querySelector("#confirmButton");
  confirmButton.addEventListener("click", async () => {
    removeConfirmationWindow();
    let newFileName = confirmInput.value.trim();
    let newModifiedFileName = "";
    for (let i = 0; i <= newFileName.length; i++) {
      if (newFileName.charAt(i) === " ") {
        newModifiedFileName += "-";
      } else {
        newModifiedFileName += newFileName.charAt(i);
      }
    }
    let req = await fetch("/file/renameFile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldfilename: fileName,
        newfilename: newModifiedFileName,
      }),
    });
    let res = await req.text();
    if (req.status === 200) {
      getFileList();
      alertMessage(res, "successAlert");
    } else if (req.status === 409) {
      alertMessage(res, "alert");
    } else {
      alertMessage("Server error", "alert");
    }
  });
}

async function deleteFile(fileName, fileNameElement) {
  removeFileOptionWindow();
  selectionConfirmation("Confirm action and select deletion type");
  let selection = document.querySelector("#confirmSelect");
  let deletionInfo = document.querySelector("#deletionTypeInfo");
  let normalDeletionText =
    "Normal deletion. Works by removing file reference from the file system, making the data available for overwriting";
  let shredDeletionText =
    "Shredding. In addition to normal deletion, overwrites the file data with random data, making it non recoverable (slower)";
  deletionInfo.innerText = normalDeletionText;
  selection.addEventListener("change", () => {
    if (selection.value === "normal") {
      deletionInfo.innerText = normalDeletionText;
    } else {
      deletionInfo.innerText = shredDeletionText;
    }
  });
  let confirmButton = document.querySelector("#confirmButton");
  confirmButton.addEventListener("click", async () => {
    removeConfirmationWindow();
    let req = await fetch("/file/delete", {
      method: "DELETE",
      headers: {
        filename: fileName,
        deletiontype: selection.value,
      },
    });
    let res = await req.text();
    if (req.status === 200) {
      getFileList();
      alertMessage(res, "successAlert");
    } else if (req.status === 202) {
      fileNameElement.innerText += " (shredding in progress)";
      alertMessage(res, "successAlert");
      interval = setInterval(async () => {
        let shreddingStateReq = await fetch("/file/getShreddingState");
        let shreddingStateRes = await shreddingStateReq.json();
        if (shreddingStateRes.shredding === false) {
          clearInterval(interval);
          setTimeout(() => {
            getFileList();
            alertMessage("Your file has been shredded", "successAlert");
          }, 3000);
        }
      }, 1000);
    } else {
      alertMessage("Server error", "alert");
    }
  });
}
