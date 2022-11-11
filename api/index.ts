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

app.get("/api/insights", async (req, res) => {
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

app.post("/api/insight", async (req, res) => {
    insightController.createInsight(req.body)
        .then(data => res.status(201).send({
            message: 'Created',
            'status': res.statusCode,
            data
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "server error: failed to create insight.",
                'status': res.statusCode
            });
            console.log(err);
        });
});

app.put("/api/insight", async (req, res) => {
    insightController.updateInsight(req.body)
        .then(data => res.status(200).send({
            message: `Updated ${data} record.`,
            'status': res.statusCode
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "server error: failed to update insight.",
                'status': res.statusCode
            });
            console.log(err);
        });
});

app.delete("/api/insight/:id", async (req, res) => {
    insightController.deleteInsight(parseInt(req.params.id))
        .then(data => res.status(202).send({
            message: `Deleted ${data} record.`,
            'status': res.statusCode,
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "server error: failed to delete insight.",
                'status': res.statusCode
            });
            console.log(err);
        });
});

app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});