const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const port = 6060;
const path = require("path");
const accountRoutes = require("./Routes/accountRoutes");
require("./db.js").connect();
app.use(express.json());

app.use(cookieParser());
app.use("/account", accountRoutes);
app.use(express.static(path.join(__dirname, "../Client")));
app.use(express.static(path.join(__dirname, "../Client/App")));
app.use(express.static(path.join(__dirname, "../Client/404")));
app.use(express.static(path.join(__dirname, "../Client/Acknowledgements")));
app.use(express.static(path.join(__dirname, "../Client/Account")));
app.use(express.static(path.join(__dirname, "../Client/Account/Login")));
app.use(express.static(path.join(__dirname, "../Client/Account/Register")));

app.get("/", (req, res) => {
  res.redirect("/app");
});
const { authMiddleware } = require("./Middleware/authMiddleware.js");
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/404/404.html"));
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
