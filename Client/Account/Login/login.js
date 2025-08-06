let buttonElement = document.querySelector(".submit");
let usernameElement = document.querySelector("#username");
let passwordElement = document.querySelector("#password");
let softRed = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue("--softRed");
let softGreen = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue("--softGreen");

async function loginRequest(username, password) {
  let req = await fetch("/account/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  let res = await req.text();
  return [res, req.status];
}

if (document.cookie) {
  window.location.href = "/app";
}
buttonElement.addEventListener("click", async () => {
  if (usernameElement.value === "" || passwordElement.value === "") {
    alertMessage("Fill in the empty fields", "alert");
    return;
  }
  let response = await loginRequest(
    usernameElement.value.trim(),
    passwordElement.value.trim()
  );
  if (response[1] === 200) {
    window.location.href = "/app";
  } else if (response[1] === 401) {
    alertMessage(response[0], "alert");
  } else {
    alertMessage("Server error", "alert");
    console.log(response[0]);
  }
});
