async function deletAllFiles() {
  let req = await fetch("/file/deleteAllFiles", { method: "DELETE" });
  let res = await req.text();
  if (req.status === 200) {
    removeConfirmationWindow();
    alertMessage(res, "successAlert");
    getFilelist();
  } else if (req.status === 404) {
    removeConfirmationWindow();
    alertMessage(res, "alert");
  } else {
    removeConfirmationWindow();
    alertMessage("Server Error", "alert");
  }
}
