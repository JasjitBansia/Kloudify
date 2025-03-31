const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_CONNECTION_URI);
async function connect() {
  try {
    await client.connect();
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
}
const db = client.db("users");
module.exports = { connect, db };
