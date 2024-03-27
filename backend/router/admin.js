import { Router } from "express";
const router = Router();

// const app = express();

router.get("/login", (req, res) => {
    res.send("Hello, world! login");
});

export default router;
