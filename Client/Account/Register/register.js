let button = document.querySelector(".submit");
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let acknowledgementCheckbox = document.querySelector("#acknowledgements");
let confirmedPassword = document.querySelector("#passwordConfirm");
function alertMessage(message) {
  let alertElement = document.createElement("div");
  alertElement.className = "alert";
  alertElement.innerText = message;
  document.body.appendChild(alertElement);
}
acknowledgementCheckbox.addEventListener("click", function (event) {
  if (
    acknowledgementCheckbox.checked &&
    username.value &&
    password.value &&
    confirmedPassword.value
  ) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
});
button.addEventListener("click", function (event) {
  // fetch("/account/register/", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     username: username.value,
  //     password: password.value,
  //   }),
  // });
  // console.log("Register button clicked");
  alert("Register button clicked");
});
