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

deleteAllFiles.addEventListener("click", () => {});
