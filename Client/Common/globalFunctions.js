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
function inputConfirmation(confirmText) {
  //  <div class="confirm">
  //     <span id="confirmText"></span>
  //     <input type="text" id="confirmInput">
  //     <div class="confirmButtons">
  //       <button id="confirmButton">Confirm</button>
  //       <button id="cancelButton">Cancel</button>
  //     </div>
  //   </div>
  let confirmDiv = document.createElement("div");
  confirmDiv.classList.add("confirm");
  let text = document.createElement("span");
  text.id = "confirmText";
  text.innerText = confirmText;
  confirmDiv.appendChild(text);
  let input = document.createElement("input");
  input.id = "confirmInput";
  confirmDiv.appendChild(input);
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
  document.body.prepend(confirmDiv);
}
