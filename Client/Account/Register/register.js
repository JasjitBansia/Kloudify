let buttonElement = document.querySelector(".submit");
let usernameElement = document.querySelector("#username");
let passwordElement = document.querySelector("#password");
let inputs = document.querySelector(".inputs");
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
      alertMessage("Input data should not contain spaces", "alert");
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
  let req = await fetch("/account/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value.trim(),
      password: password.value.trim(),
    }),
  });
  let res = await req.text();
  if (req.status === 200) {
    alertMessage(res, "successAlert");
    buttonElement.disabled = true;
    setTimeout(() => {
      window.location.href = "/app";
    }, 2000);
  } else if (req.status === 409) {
    alertMessage(res, "alert");
  } else if (req.status === 403) {
    alertMessage(res, "alert");
  } else {
    alertMessage("Server error", "alert");
    console.log(res);
  }
});
