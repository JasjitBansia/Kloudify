let buttonElement = document.querySelector(".submit");
let usernameElement = document.querySelector("#username");
let passwordElement = document.querySelector("#password");
let softRed = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue("--softRed");
let softGreen = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue("--softGreen");

function attemptLoginWithCookie() {}

buttonElement.addEventListener("click", async () => {
  if (usernameElement.value === "" || passwordElement.value === "") {
    alertMessage("Fill in the empty fields", "alert");
    return;
  }
  let req = await fetch("/account/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameElement.value.trim(),
      password: passwordElement.value.trim(),
    }),
  });
  let res = await req.text();
  console.log(res);
  if (req.status === 200) {
    window.location.href = "/";
  } else if (req.status === 401) {
    alertMessage(res, "alert");
  } else {
    alertMessage("Server error", "alert");
    console.log(res);
  }
});
