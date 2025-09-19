async function getFileList() {
  let loaderClass = document.querySelector(".loaderClass");
  let loader = document.createElement("div");
  loader.classList.add("loader");
  loaderClass.prepend(loader);
  let fileList = document.querySelector(".fileList");
  let fileListReq = await fetch("/file/getFileList");
  let files = await fileListReq.json();
  let usedSpaceReq = await fetch("/account/getSpaceUsed");
  let usedSpaceRes = await usedSpaceReq.json();
  let username = usedSpaceRes.username;
  let allocatedSpaceReq = await fetch("/account/getAllocatedSpace");
  let allocatedSpaceRes = await allocatedSpaceReq.text();
  let usedSpaceBytes = usedSpaceRes.usedSpace;
  let formattedUsedSpace = formatSize(usedSpaceBytes);
  let headingStorageStat = document.querySelector("#headingStorageStat");
  headingStorageStat.innerText = `(${formattedUsedSpace} / ${allocatedSpaceRes} GB)`;
  if (fileListReq.status === 200) {
    loader.remove();
    document.querySelector(".fileList").innerHTML = "";
    files.forEach((file) => {
      let formattedFileSize = formatSize(file.size);
      let div = document.createElement("div");
      div.classList.add("file");
      let fileOptionsMenu = document.createElement("div");
      fileOptionsMenu.classList.add("fileOptionsMenu");
      let fileOptionsImg = document.createElement("img");
      fileOptionsImg.src = "../../Assets/hamburger.png";
      fileOptionsMenu.appendChild(fileOptionsImg);
      div.appendChild(fileOptionsMenu);
      let fileNameElement = document.createElement("span");
      fileNameElement.innerText =
        file.fileName + " (" + formattedFileSize + ")";
      fileNameElement.classList.add("fileName");
      div.appendChild(fileNameElement);
      fileList.appendChild(div);
      fileOptionsImg.addEventListener("click", () => {
        fileOptions(file.fileName, fileNameElement, username);
      });
    });
  } else {
    loader.remove();
    alertMessage("Sever error", "alert");
  }
}
