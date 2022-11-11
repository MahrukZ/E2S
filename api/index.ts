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
    insightController.getInsights()
        .then(data => res.status(200).send({
            message: 'Success',
            'status': res.statusCode,
            data
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "server error: failed to fetch insights.",
                'status': res.statusCode
            });
            console.log(err);
        });
});


app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});