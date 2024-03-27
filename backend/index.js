import express from "express";
import database from "./db/connection.js";
import user from "./router/user.js";
import dealer from "./router/dealer.js";
import admin from "./router/admin.js";
import cors from "cors";

const check = async () => {
    try {
        const clientData = database.collection("blogposts");

        const data = await clientData.find({}).toArray();
        console.log("Found documents:");
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Close the connection
        // await client.close();
        console.log("Connection closed");
    }
};

// check();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", user);
app.use("/admin", admin);
app.use("/dealer", dealer);

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// mongodb mongodb+srv://mdkg202:root@cluster0.zypkye9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
