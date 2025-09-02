let softRed = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue("--softRed");
let softGreen = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue("--softGreen");
function alertMessage(message, type) {
  let alertElement = document.createElement("div");
  alertElement.classList.add("alert");
  if (type === "alert") {
    alertElement.style.backgroundColor = softRed;
  }
  if (type === "successAlert") {
    alertElement.style.backgroundColor = softGreen;
  }
  alertElement.innerText = message;
  alertElement.style.opacity = "0";
  alertElement.style.transition = "opacity 0.3s";
  document.body.appendChild(alertElement);
  setTimeout(() => {
    alertElement.style.opacity = "1";
  }, 100);
  setTimeout(() => {
    alertElement.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(alertElement);
    }, 300);
  }, 2000);
}
function createBasicElements(confirmText) {
  let backgroundDiv = document.createElement("div");
  backgroundDiv.classList.add("background");
  document.body.prepend(backgroundDiv);
  let confirmDiv = document.createElement("div");
  confirmDiv.classList.add("confirm");
  let text = document.createElement("span");
  text.id = "confirmText";
  text.innerText = confirmText;
  confirmDiv.appendChild(text);
  let confirmButtonsDiv = document.createElement("div");
  confirmButtonsDiv.classList.add("confirmButtons");
  let confirmButton = document.createElement("button");
  confirmButton.id = "confirmButton";
  confirmButton.innerText = "Confirm";
  let cancelButton = document.createElement("button");
  cancelButton.id = "cancelButton";
  cancelButton.innerText = "Cancel";
  confirmButtonsDiv.appendChild(confirmButton);
  confirmButtonsDiv.appendChild(cancelButton);
  confirmDiv.appendChild(confirmButtonsDiv);
  cancelButton.addEventListener("click", () => {
    removeConfirmationWindow();
  });
  return { confirmDiv: confirmDiv, confirmButtonsDiv: confirmButtonsDiv };
}
function removeConfirmationWindow() {
  document.querySelector(".confirm").remove();
  document.querySelector(".background").remove();
}
function inputConfirmation(confirmText) {
  let elements = createBasicElements(confirmText);
  let confirmDiv = elements.confirmDiv;
  let confirmButtonsDiv = elements.confirmButtonsDiv;
  let input = document.createElement("input");
  input.id = "confirmInput";
  confirmDiv.insertBefore(input, confirmButtonsDiv);
  document.body.prepend(confirmDiv);
}
function buttonConfirmation(confirmText) {
  //  <div class="confirm">
  //     <span id="confirmText"></span>
  //     <input type="text" id="confirmInput">
  //     <div class="confirmButtons">
  //       <button id="confirmButton">Confirm</button>
  //       <button id="cancelButton">Cancel</button>
  //     </div>
  //   </div>
  let elements = createBasicElements(confirmText);
  let confirmDiv = elements.confirmDiv;
  document.body.prepend(confirmDiv);
}
function selectionConfirmation(confirmText) {
  // <div class="confirm">
  //   <span id="confirmText">Select deletion type</span>
  //   <select name="deleteType" id="confirmSelect">
  //     <option value="normal">Normal</option>
  //     <option value="shred">Shred</option>
  //   </select>
  //   <span id="deletionTypeInfo">
  //     Normal deletion. Works by removing file reference from the file system,
  //     making the data available for overwriting
  //   </span>
  //   <div class="confirmButtons">
  //     <button id="confirmButton">Confirm</button>
  //     <button id="cancelButton">Cancel</button>
  //   </div>
  // </div>;
  let elements = createBasicElements(confirmText);
  let confirmDiv = elements.confirmDiv;
  let confirmButtonsDiv = elements.confirmButtonsDiv;
  let selection = document.createElement("select");
  selection.id = "confirmSelect";
  let normalOption = document.createElement("option");
  normalOption.value = "normal";
  normalOption.innerText = "Normal (recommended)";
  selection.appendChild(normalOption);
  let shredOption = document.createElement("option");
  shredOption.value = "shred";
  shredOption.innerText = "Shred";
  selection.appendChild(shredOption);
  confirmDiv.insertBefore(selection, confirmButtonsDiv);
  let info = document.createElement("span");
  info.id = "deletionTypeInfo";
  confirmDiv.insertBefore(info, confirmButtonsDiv);
  document.body.prepend(confirmDiv);
}
