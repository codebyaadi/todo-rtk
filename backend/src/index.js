import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { connectdb } from "./config/database.js";
import todoRoutes from "./routes/todo.route.js";

dotenv.config();

const DEFAULT_PORT = parseInt(process.env.PORT || "8080", 10);

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", todoRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello, Backend"
    });
});

const startServer = async () => {
    try {
        await connectdb();
        app.listen(DEFAULT_PORT, () => console.log(`connected to backend at port ${DEFAULT_PORT}`));
    } catch (error) {
        console.error(error);
    }
};

startServer();