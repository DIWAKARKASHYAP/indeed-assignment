const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb://localhost:27017";

// Database Name
const dbName = "your_database_name";

// Schema definition
const schema = {
    admin: [
        { name: "admin_id", type: "string", primary: true },
        { name: "password", type: "string" },
    ],
    user: [
        { name: "user_email", type: "string", primary: true },
        { name: "user_id", type: "string", note: "randomly generated" },
        { name: "user_location", type: "string" },
        { name: "user_info", type: "object", note: "user private data" },
        { name: "password", type: "string" },
        { name: "vehicle_info", type: "array" },
    ],
    dealership: [
        { name: "dealership_email", type: "string", primary: true },
        { name: "dealership_id", type: "string", note: "randomly generated" },
        { name: "dealership_name", type: "string" },
        { name: "dealership_location", type: "string" },
        { name: "password", type: "string" },
        {
            name: "dealership_info",
            type: "object",
            note: "dealership private data",
        },
        { name: "cars", type: "array" },
        { name: "deals", type: "array" },
        { name: "sold_vehicles", type: "array" },
    ],
    deal: [
        {
            name: "deal_id",
            type: "string",
            primary: true,
            note: "randomly generated",
        },
        { name: "car_id", type: "string" },
        { name: "deal_info", type: "object", note: "store additional fields" },
    ],
    cars: [
        {
            name: "car_id",
            type: "string",
            primary: true,
            note: "randomly generated",
        },
        { name: "type", type: "string" },
        { name: "name", type: "string" },
        { name: "model", type: "string" },
        { name: "car_info", type: "object", note: "store additional fields" },
    ],
    sold_vehicles: [
        {
            name: "vehicle_id",
            type: "string",
            primary: true,
            note: "randomly generated",
        },
        { name: "car_id", type: "string" },
        {
            name: "vehicle_info",
            type: "object",
            note: "store additional fields",
        },
    ],
};

async function createSchema() {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("Connected to MongoDB");

        // Select the database
        const db = client.db(dbName);

        // Create collections and indexes
        for (const collectionName in schema) {
            const fields = schema[collectionName];
            const collectionFields = {};
            const indexes = [];
            fields.forEach((field) => {
                collectionFields[field.name] = field.type;
                if (field.primary) {
                    indexes.push({ key: { [field.name]: 1 }, unique: true });
                }
            });

            // Create collection
            await db.createCollection(collectionName);

            // Create indexes
            if (indexes.length > 0) {
                await db.collection(collectionName).createIndexes(indexes);
            }
        }

        console.log("Schema created successfully");
    } catch (error) {
        console.error("Error creating schema:", error);
    } finally {
        // Close the connection
        await client.close();
        console.log("Connection closed");
    }
}

// Create the schema
createSchema();
