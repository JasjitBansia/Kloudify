function resetUploadState() {
  let loader = document.querySelector(".loader");
  if (loader !== null) {
    loader.remove();
  }
  document.querySelector("#uploadButton").remove();
  const chooseFileLabel = document.createElement("label");
  chooseFileLabel.htmlFor = "fileInput";
  chooseFileLabel.id = "fileInputLabel";
  chooseFileLabel.classList.add("uploadElements");
  chooseFileLabel.innerText = "Choose file";
  uploadActions.appendChild(chooseFileLabel);
  fileInput.value = "";
  document.querySelector(".fileNameClass").remove();
}
