import { MongoClient } from "mongodb";

const uri =
    "mongodb+srv://mdkg202:YyETOmopkyS2oxn6@cluster0.zypkye9.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

connectToDatabase();

const database = client.db("carDeal");
console.log("====================================");
// console.log(client);
console.log("====================================");
// console.log(database);
console.log("====================================");
export default database;

// mongodb+srv://mdkg202:YliBcJE91Iml7DEe@cluster0.zypkye9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// username = mdkg202
// password = DLsYFORMvsLNyFLQ

// const clientData = database.collection("blogposts");

// console.log(clientData);

// cryptocoder766
// azp8sXfu1oTEE8oi
