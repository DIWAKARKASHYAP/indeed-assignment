import { Router } from "express";
const router = Router();
import database from "../db/connection.js";
import Jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

router.post("/signup", async (req, res) => {
    const userData = req.body;

    try {
        const clientData = database.collection("users");
        const isExist = await clientData.findOne({ email: req.body.email });

        if (isExist) {
            res.status(200).json({
                success: false,
                message: "User already exists",
            });
        } else {
            const data = await clientData.insertOne({
                ...userData,
                vehicle_info: [],
            });
            console.log(data.insertedId.toString());

            const token = Jwt.sign({ id: data.insertedId.toString() }, "key");
            console.log(token);
            res.status(201).json({
                success: true,
                message: "User created successfully",
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

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const clientData = database.collection("users");
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

router.post("/order", async (req, res) => {
    const userId = Jwt.verify(req.body.token, "key");
    const dealData = req.body;
    delete dealData.token;

    try {
        const clientData = database.collection("deals");
        const dealerData = database.collection("dealers");

        // Insert the deal data
        const dealInsertResult = await clientData.insertOne({
            ...dealData,
            userId: userId.id,
        });

        // Insert the insertedId into the deals array of the specified dealer
        await dealerData.updateOne(
            { _id: new ObjectId(req.body.dealerId) },
            { $push: { deals: dealInsertResult.insertedId } }
        );

        return res.status(201).json({
            success: true,
            message: "Deal created successfully",
            insertedId: dealInsertResult.insertedId,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

router.get("/order", async (req, res) => {
    const token = req.headers.authorization; // Extract JWT token from Authorization header
    const decodedToken = Jwt.verify(token, "key"); // Verify and decode the JWT token
    const userId = decodedToken.id; // Extract userId from decoded token

    try {
        const clientData = database.collection("deals");

        // Find deals where userId matches
        const deals = await clientData.find({ userId: userId }).toArray();

        // Extract car IDs from deals
        const carIds = deals.map((deal) => deal.carId);

        // Fetch car details for each car ID
        const carsCollection = database.collection("cars");
        const carDetailsPromises = carIds.map((carId) =>
            carsCollection.findOne({ _id: new ObjectId(carId) })
        );
        const carDetails = await Promise.all(carDetailsPromises);

        // Merge car details with deals
        const dealsWithCarDetails = deals.map((deal, index) => {
            return { ...deal, carDetails: carDetails[index] };
        });

        return res.status(200).json({
            success: true,
            message: "Deals fetched successfully",
            deals: dealsWithCarDetails,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

router.get("/bought", async (req, res) => {
    const token = req.headers.authorization; // Extract JWT token from Authorization header
    const decodedToken = Jwt.verify(token, "key"); // Verify and decode the JWT token
    const dealerId = decodedToken.id; // Extract dealerId from decoded token

    try {
        const dealData = database.collection("users");
        const deals = await dealData
            .find({ _id: new ObjectId(dealerId) })
            .toArray();

        const soldCarIdArray = deals[0].vehicle_info;

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
