import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.DB_NAME || "giftlink";

let client;
let db;

export async function connectToDatabase() {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log(`MongoDB connected: ${dbName}`);
  return db;
}

export function getDatabase() {
  if (!db) throw new Error("Database is not connected. Call connectToDatabase() first.");
  return db;
}

export async function closeDatabase() {
  if (client) await client.close();
  client = undefined;
  db = undefined;
}
