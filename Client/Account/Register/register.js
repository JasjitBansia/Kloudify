let button = document.getElementById("submit");
let username = document.getElementById("username");
let password = document.getElementById("password");
let confirmedPassword = document.getElementById("passwordConfirm");
function alertMessage(message) {
  let alertElement = document.createElement("div");
  alertElement.className = "alert";
  alertElement.innerText = message;
  document.body.appendChild(alertElement);
}
button.addEventListener("click", function (event) {
  fetch("/account/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  });
  console.log("Register button clicked");
});
