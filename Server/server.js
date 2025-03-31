const express = require("express");
const dotenv = require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGODB_CONNECTION_URI);
const app = express();
const port = 6060;
const path = require("path");
const accountRoutes = require("./Routes/accountRoutes");
app.use(express.json());

app.use("/account", accountRoutes);
app.use(express.static(path.join(__dirname, "../Client")));
app.use(express.static(path.join(__dirname, "../Client/Acknowledgements")));
app.use(express.static(path.join(__dirname, "../Client/Account")));
app.use(express.static(path.join(__dirname, "../Client/Account/Login")));
app.use(express.static(path.join(__dirname, "../Client/Account/Register")));

async function connectDB() {
  await mongoClient.connect();
  console.log("Connected to DB");
}
connectDB();
const db = mongoClient.db("users");

module.exports = { db };

app.get("/", (req, res) => {
  res.send("Hello World!");
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
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
