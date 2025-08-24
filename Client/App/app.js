let logOut = document.querySelector("#logout");

logOut.addEventListener("click", async () => {
  try {
    let req = await fetch("/account/logout", { method: "POST" });
    let res = await req.text();
    alertMessage("User logged out", "successAlert");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  } catch (e) {}
});
