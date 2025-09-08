const { MongoClient } = require('mongodb');

let db = null;
let client = null;

async function connectDB(MONGODB_URI) {
  if (db) return db;
  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db("Companies-data");
  console.log("Connected to MongoDB");
  return db;
}

function getDb() {
  if (!db) {
    throw new Error("Database not connected. Call connectDB first.");
  }
  return db;
}

module.exports = { connectDB, getDb, client };
