import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbname = process.env.DBNAME;

// ✅ EXPORT collections properly
export const collections = {
  PRODUCTS: "products",
};

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ✅ FIX dbConnect
export const dbConnect = async (collectionName) => {
  const connectedClient = await client.connect();
  return connectedClient.db(dbname).collection(collectionName);
};
