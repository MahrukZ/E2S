import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { InsightController } from "./controllers/insights.controller";

dotenv.config();

const port = process.env.PORT || 8082;
const app = express();
const insightController = new InsightController();

app.use(express.json());
app.use(cors());

app.use("/api/insights", async (req, res) => {
    try {
        res.status(200);
        insightController.getInsights().then(data => res.json(data))
    } catch (err) {
        console.error(err);
        res.status(500).send([
            "Server Error: Failed to fetch insights."
        ]);
    }
});


app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});