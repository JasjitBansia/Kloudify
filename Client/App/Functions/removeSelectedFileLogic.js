function removeSelectedFileLogic(fileNameElement, fileInput, uploadButton) {
  let removeFileImage = document.createElement("img");
  removeFileImage.src = "../Assets/delete.png";
  removeFileImage.classList.add("removeUpload");
  uploadActions.appendChild(removeFileImage);
  removeFileImage.addEventListener("mouseenter", () => {
    removeFileImage.src = "../Assets/delete-inverted.png";
    removeFileImage.style.backgroundColor = "red";
  });
  removeFileImage.addEventListener("mouseleave", () => {
    removeFileImage.src = "../Assets/delete.png";
    removeFileImage.style.backgroundColor = "white";
  });
  removeFileImage.addEventListener("click", () => {
    const chooseFileLabel = document.createElement("label");
    chooseFileLabel.htmlFor = "fileInput";
    chooseFileLabel.id = "fileInputLabel";
    chooseFileLabel.classList.add("uploadElements");
    chooseFileLabel.innerText = "Choose file";
    uploadActions.appendChild(chooseFileLabel);
    fileInput.value = "";
    removeFileImage.remove();
    fileNameElement.remove();
    uploadButton.remove();
    fileInput.disabled = false;
  });
}
