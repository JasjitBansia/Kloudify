let fileList = document.querySelector(".fileList");
async function getFilelist() {
  let req = await fetch("/file/getFileList");
  let files = await req.json();
  if (req.status === 200) {
    document.querySelector(".fileList").innerHTML = "";
    files.forEach((file) => {
      let div = document.createElement("div");
      div.classList.add("file");
      let fileOptionsMenu = document.createElement("div");
      fileOptionsMenu.classList.add("fileOptionsMenu");
      let fileOptionsImg = document.createElement("img");
      fileOptionsImg.src = "../../Assets/hamburger.png";
      fileOptionsMenu.appendChild(fileOptionsImg);
      div.appendChild(fileOptionsMenu);
      let fileNameElement = document.createElement("span");
      fileNameElement.innerText = file.fileName;
      fileNameElement.classList.add("fileName");
      div.appendChild(fileNameElement);
      fileList.appendChild(div);
      fileOptionsImg.addEventListener("click", () => {
        fileOptions(file.fileName);
      });
    });
  } else {
    alertMessage("Sever error", "alert");
  }
}
