let button = document.getElementById("submit");
function alertMessage(message) {
  let alertElement = document.createElement("div");
  alertElement.className = "alert";
  alertElement.innerText = message;
  document.body.appendChild(alertElement);
}
button.addEventListener("click", function (event) {
  alertMessage("Login button clicked");
});
