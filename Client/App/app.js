let logOut = document.querySelector("#logout");
let fileInput = document.querySelector("#fileInput");
let uploadActions = document.querySelector(".uploadActions");
let urlInitial = "https://kloudify.host/Assets/";
window.onload = async function () {
  await fetch("/account/pingUser", { method: "POST" });
  sessionStorage.setItem("isUploading", "false");
  getFileList();
  function preloadImage(url) {
    let img = new Image();
    img.src = url;
  }
  let preloadingImages = ["copy.png", "delete.png", "hamburger.png", "rename.png", "download.png"];
  for (let i = 0; i <= preloadingImages.length - 1; i++) {
    preloadImage(urlInitial + preloadingImages[i]);
  }
};
logOut.addEventListener("click", async () => {
  try {
    let req = await fetch("/account/logout", { method: "POST" });
    let res = await req.text();
    if (req.status === 200) {
      document.body.innerHTML = "";
      alertMessage(res, "successAlert");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else {
      alertMessage("Server error", "alert");
      console.log(res);
    }
  } catch (e) {
    console.log(e);
  }
});
fileInput.addEventListener("change", (e) => {
  let file = e.target.files[0];
  if (file) {
    document.getElementById("fileInputLabel").remove();
    let uploadButton = document.createElement("button");
    uploadButton.classList.add("uploadElements");
    uploadButton.innerText = "Upload";
    uploadButton.id = "uploadButton";
    uploadActions.appendChild(uploadButton);
    let fileNameElement = document.createElement("span");
    fileNameElement.classList.add("fileNameClass");
    document.querySelector("#uploadArea").prepend(fileNameElement);
    fileNameElement.innerText = file.name;
    removeSelectedFileLogic(fileNameElement, fileInput, uploadButton);
    uploadButton.addEventListener("click", () => {
      if (sessionStorage.getItem("isUploading") === "false") {
        sessionStorage.setItem("isUploading", "true");
        uploadFile(file);
      } else {
        alertMessage("A file upload is already in progress", "alert");
      }
    });
  }
});
