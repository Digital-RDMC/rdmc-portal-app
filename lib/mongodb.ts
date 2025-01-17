import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URL || ''; // MongoDB connection string
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URL) {
  throw new Error('Please add your MongoDB URI to the .env.local file');
}

// Reuse the client if already initialized (for performance in serverless functions)
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
