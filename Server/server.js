const express = require("express");
const app = express();
const port = 6060;
const path = require("path");
const accountRoutes = require("./Routes/accountRoutes");
app.use(express.json());

app.use("/account", accountRoutes);
app.use(express.static(path.join(__dirname, "../Client")));
app.use(express.static(path.join(__dirname, "../Client/Account")));
app.use(express.static(path.join(__dirname, "../Client/Account/Login")));
app.use(express.static(path.join(__dirname, "../Client/Account/Register")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/Account/Login/login.html"));
});
console.log("------");
app.get("/register", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../Client/Account/Register/register.html")
  );
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
