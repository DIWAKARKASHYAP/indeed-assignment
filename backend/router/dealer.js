import { Router } from "express";
const router = Router();
import database from "../db/connection.js";
import Jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

router.post("/signup", async (req, res) => {
    const userData = req.body;

    try {
        const clientData = database.collection("dealers");
        const isExist = await clientData.findOne({ email: req.body.email });

        if (isExist) {
            res.status(200).json({
                success: false,
                message: "Dealer already exists",
            });
        } else {
            const data = await clientData.insertOne({
                ...userData,
                cars: [],
                deals: [],
                sold_vehicles: [],
            });
            console.log(data.insertedId.toString());

            const token = Jwt.sign({ id: data.insertedId.toString() }, "key");
            console.log(token);
            res.status(201).json({
                success: true,
                message: "Dealer created successfully",
                data: data,
                token: token,
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// login rout
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const clientData = database.collection("dealers");
        const user = await clientData.findOne({ email: email });

        if (!user) {
            return res.status(201).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        if (user.password !== password) {
            return res.status(201).json({
                success: true,
                message: "Invalid email or password",
            });
        }
        // console.log(user._id.toString());
        const token = Jwt.sign({ id: user._id.toString() }, "key");
        res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

router.post("/car", async (req, res) => {
    const dealerId = Jwt.verify(req.body.token, "key");
    const o_id = new ObjectId(dealerId.id);
    const carData = req.body;
    delete carData.token;

    const clientData = database.collection("cars");
    // console.log(dealerId);
    try {
        const data = await clientData.insertOne({
            ...carData,
            dealer: dealerId.id,
        });
        const carId = data.insertedId.toString();

        // Update the dealer table to push the carId into the cars array
        const dealerCollection = database.collection("dealers");
        const result = await dealerCollection.updateOne(
            { _id: o_id }, // Use dealerId directly assuming it's a string
            { $push: { cars: carId } } // Push carId into the cars array
        );

        if (result.modifiedCount === 1) {
            console.log("Car added to dealer's cars array successfully");
            res.status(201).json({
                success: true,
                message: "deal created successfully",
            });
        } else {
            console.log("Dealer not found or cars array not updated");
            res.status(404).send("Dealer not found or cars array not updated");
        }
    } catch (error) {
        console.error("Error inserting car and updating dealer:", error);
        res.status(500).send("Internal server error");
    }
});

router.get("/car", async (req, res) => {
    try {
        const clientData = database.collection("cars");
        const carData = await clientData.find({}).toArray();
        res.status(201).json({
            success: true,
            data: carData,
        });
    } catch (error) {
        console.error("Error:", error);
    }
});

router.get("/order", async (req, res) => {
    const token = req.headers.authorization; // Extract JWT token from Authorization header
    const decodedToken = Jwt.verify(token, "key"); // Verify and decode the JWT token
    const dealerId = decodedToken.id; // Extract dealerId from decoded token

    try {
        const dealData = database.collection("deals");
        const deals = await dealData.find({ dealerId: dealerId }).toArray();

        // Fetch user details for each deal
        const usersCollection = database.collection("users");
        const userIds = deals.map((deal) => deal.userId); // Extract user IDs from deals
        const userPromises = userIds.map((userId) =>
            usersCollection.findOne({ _id: new ObjectId(userId) })
        );
        const users = await Promise.all(userPromises);

        // Fetch car details for each deal
        const carIds = deals.map((deal) => deal.carId); // Extract car IDs from deals
        const carsCollection = database.collection("cars");
        const carPromises = carIds.map((carId) =>
            carsCollection.findOne({ _id: new ObjectId(carId) })
        );
        const cars = await Promise.all(carPromises);

        // Inject user details and car details into each deal object
        const dealsWithDetails = deals.map((deal, index) => {
            return {
                ...deal,
                userDetails: users[index],
                carDetails: cars[index],
            };
        });

        res.status(200).json({
            success: true,
            deals: dealsWithDetails,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

router.post("/order", async (req, res) => {
    try {
        const { token, carId, userId, dealId } = req.body;

        // Verify JWT token to get dealerId
        const dealerId = Jwt.verify(token, "key").id;

        // Update dealer's sold vehicles
        await database
            .collection("dealers")
            .updateOne(
                { _id: new ObjectId(dealerId) },
                { $push: { sold_vehicles: carId } }
            );

        // Update user's vehicle info
        await database
            .collection("users")
            .updateOne(
                { _id: new ObjectId(userId) },
                { $push: { vehicle_info: carId } }
            );

        // Delete deal
        await database
            .collection("deals")
            .deleteOne({ _id: new ObjectId(dealId) });

        res.status(200).json({
            success: true,
            message: "Deal processed successfully",
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

router.get("/sold", async (req, res) => {
    const token = req.headers.authorization; // Extract JWT token from Authorization header
    const decodedToken = Jwt.verify(token, "key"); // Verify and decode the JWT token
    const dealerId = decodedToken.id; // Extract dealerId from decoded token

    try {
        const dealData = database.collection("dealers");
        const deals = await dealData
            .find({ _id: new ObjectId(dealerId) })
            .toArray();

        const soldCarIdArray = deals[0].sold_vehicles;

        // Fetch sold vehicles from cars collection
        const carsCollection = database.collection("cars");
        const soldVehiclesPromises = soldCarIdArray.map((carId) =>
            carsCollection.findOne({ _id: new ObjectId(carId) })
        );
        const soldVehicles = await Promise.all(soldVehiclesPromises);

        res.status(200).json({
            success: true,
            soldVehicles: soldVehicles,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

export default router;
