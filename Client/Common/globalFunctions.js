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
