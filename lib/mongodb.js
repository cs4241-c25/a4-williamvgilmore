// eslint-disable-next-line @typescript-eslint/no-require-imports
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://williamvr107:0XDhgOQguoAoZkKP@cluster0.cejph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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