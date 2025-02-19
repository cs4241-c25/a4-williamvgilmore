
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {

    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    if (!cachedClient) {
        cachedClient = client;
    }

    if (!cachedDb) {
        cachedDb = client.db("a4");
    }


    return { client: cachedClient, db: cachedDb };
}


export { connectToDatabase };