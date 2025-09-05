let settingsElement = document.querySelector(".settings");
let settingsContainer = document.querySelector(".settingsContainer");
let deleteAllFilesElement = document.querySelector("#deleteAllFiles");
let deleteAccountElement = document.querySelector("#deleteAccount");
settingsElement.addEventListener("mouseover", () => {
  settingsContainer.style.opacity = "1";
  settingsContainer.style.pointerEvents = "all";
});
settingsElement.addEventListener("mouseout", () => {
  settingsContainer.style.opacity = "0";
  settingsContainer.style.pointerEvents = "none";
});

deleteAllFilesElement.addEventListener("click", () => {
  deletAllFiles();
});

deleteAccountElement.addEventListener("click", () => {
  deleteAccount();
});

async function deletAllFiles() {
  if (sessionStorage.getItem("isUploading") === "false") {
    buttonConfirmation("Are you sure you want to delete all of your files?");
    let confirmButton = document.querySelector("#confirmButton");
    confirmButton.addEventListener("click", async () => {
      removeConfirmationWindow();
      let req = await fetch("/file/deleteAllFiles", { method: "DELETE" });
      let res = await req.text();
      if (req.status === 200) {
        alertMessage(res, "successAlert");
        getFileList();
      } else if (req.status === 404) {
        alertMessage(res, "alert");
      } else {
        alertMessage("Server Error", "alert");
      }
    });
  } else {
    alertMessage("An upload is in progress. Try again after it ends", "alert");
  }
}

async function deleteAccount() {
  buttonConfirmation(
    "Your account along with your files will be deleted (normal deletion). Are you sure?"
  );
  let confirmButton = document.querySelector("#confirmButton");
  confirmButton.addEventListener("click", async () => {
    removeConfirmationWindow();
    let req = await fetch("/account/deleteAccount", { method: "DELETE" });
    let res = await req.text();
    if (req.status === 200) {
      alertMessage(res, "successAlert");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      alertMessage("Server Error", "alert");
    }
  });
}
