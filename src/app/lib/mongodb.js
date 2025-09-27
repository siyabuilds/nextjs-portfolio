import { MongoClient } from "mongodb";

let client;
let clientPromise;

if (!process.env.MONGO_URI) throw new Error("MONGO_URI not defined");

if (process.env.NODE_ENV === "development") {
  // In dev, we use a global mongo instance to avoid multiple connections due to hot reload
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGO_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, new client is fine for serverless function
  client = new MongoClient(process.env.MONGO_URI);
  clientPromise = client.connect();
}

export default clientPromise;
