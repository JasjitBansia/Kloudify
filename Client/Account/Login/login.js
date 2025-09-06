let buttonElement = document.querySelector(".submit");
let usernameElement = document.querySelector("#username");
let passwordElement = document.querySelector("#password");
let token = document.cookie.split("Auth=")[1];
if (token !== undefined) {
  window.location.href = "/app";
}
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
  if (req.status === 200) {
    window.location.href = "/app";
  } else if (req.status === 401) {
    alertMessage(res, "alert");
  } else {
    alertMessage("Server error", "alert");
    console.log(res);
  }
});
