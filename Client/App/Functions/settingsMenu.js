let settingsElement = document.querySelector(".settings");
let settingsContainer = document.querySelector(".settingsContainer");
let deleteAllFiles = document.querySelector("#deleteAllFiles");
settingsElement.addEventListener("mouseover", () => {
  settingsContainer.style.opacity = "1";
  settingsContainer.style.pointerEvents = "all";
});
settingsElement.addEventListener("mouseout", () => {
  settingsContainer.style.opacity = "0";
  settingsContainer.style.pointerEvents = "none";
});

deleteAllFiles.addEventListener("click", () => {
  deletAllFiles();
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
        getFilelist();
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
