
const { MongoClient, ServerApiVersion } = require('mongodb');

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
    // Return cached connection if available
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }


    if (!cachedClient) {
        cachedClient = client;
    }

    if (!cachedDb) {
        cachedDb = client.db("a4");
    }

    // Return the client and db
    return { client: cachedClient, db: cachedDb };
}

module.exports = { connectToDatabase };