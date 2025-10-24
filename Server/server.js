const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const port = 6060;
module.exports = { port };
const path = require("path");
const fs = require("fs");
const accountRoutes = require("./Routes/accountRoutes");
const fileRoutes = require("./Routes/fileRoutes.js");
const { authMiddleware } = require("./Middleware/authMiddleware.js");
const {
  diskMountMiddleware,
  mountDisk,
} = require("./Middleware/diskMountMiddleware.js");
mountDisk();
require("./db.js").connect();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../Client")));
app.use(express.static(path.join(__dirname, "../Client/App")));
app.use(express.static(path.join(__dirname, "../Client/404")));
app.use(express.static(path.join(__dirname, "../Client/Acknowledgements")));
app.use(express.static(path.join(__dirname, "../Client/Account")));
app.use(express.static(path.join(__dirname, "../Client/Account/Login")));
app.use(express.static(path.join(__dirname, "../Client/Account/Register")));
app.use("/account", accountRoutes);
app.use("/file", authMiddleware, diskMountMiddleware, fileRoutes);

app.get("/", (req, res) => {
  res.redirect("/app");
});
app.get("/app", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/App/app.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/Account/Login/login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../Client/Account/Register/register.html")
  );
});
app.get("/acknowledgements", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../Client/Acknowledgements/acknowledgements.html")
  );
});

app.get("/files/:username/:filename", (req, res) => {
  let username = req.params.username;
  let filename = req.params.filename;
  let filePath = path.join(__dirname, `../Files/${username}/${filename}`);
  let fileExists = fs.existsSync(filePath);
  if (fileExists === true) {
    res.set("Content-Disposition", `attachment; filename="${filename}"`);
    res.sendFile(filePath);
  } else {
    res.send({ error: "Requested file does not exist" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/404/404.html"));
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

setInterval(() => {
  const {
    deleteInactiveAccount,
  } = require("./Account/deleteInactiveAccount.js");
  deleteInactiveAccount();
}, 5 * 60 * 1000);
