let buttonElement = document.querySelector(".submit");
let usernameElement = document.querySelector("#username");
let passwordElement = document.querySelector("#password");
let inputs = document.querySelector(".inputs");
let softRed = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue("--softRed");
let softGreen = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue("--softGreen");
let acknowledgementCheckbox = document.querySelector("#acknowledgements");
let confirmedPasswordElement = document.querySelector("#passwordConfirm");

function formValidation() {
  let username = usernameElement.value.trim();
  let password = passwordElement.value.trim();
  let confirmedPassword = confirmedPasswordElement.value.trim();
  if (
    username &&
    password &&
    confirmedPassword &&
    acknowledgementCheckbox.checked
  ) {
    if (password !== confirmedPassword) {
      alertMessage("Passwords do not match", "alert");
      return false;
    }
    if (password.length < 5) {
      alertMessage("Password should be of atleast 5 characters", "alert");
      return false;
    }
    if (username.includes(" ") || password.includes(" ")) {
      alertMessage("Input data should not contain spaces");
      return false;
    }
    return true;
  } else {
    buttonElement.disabled = true;
  }
}

inputs.addEventListener("change", function (event) {
  let formStatus = formValidation();
  if (formStatus) {
    buttonElement.disabled = false;
  } else {
    buttonElement.disabled = true;
  }
});

buttonElement.addEventListener("click", async function (event) {
  let req = await fetch("/account/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  });
  let res = await req.text();
  if (req.status === 200) {
    alertMessage(res, "successAlert");
    buttonElement.disabled = true;
    document.cookie = `username=${usernameElement.value};expires=${new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    )}`;
    document.cookie = `password=${passwordElement.value};expires=${new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    )}`;
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } else if (req.status === 409) {
    alertMessage(res, "alert");
  } else {
    alertMessage("Server error", "alert");
  }
});
