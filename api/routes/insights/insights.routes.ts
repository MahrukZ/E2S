import express from "express";
import { InsightController } from "./../../controllers/insights.controller";

const router = express.Router();

// controllers
const insightController = new InsightController();

// routes
router.get("/api/insights", async (req, res) => {
    insightController.getAllInsights(req, res);
});

router.post("/api/insight", async (req, res) => {
    insightController.createInsight(req, res);
});

router.put("/api/insight", async (req, res) => {
    insightController.updateInsight(req, res);
});

router.delete("/api/insight/:id", async (req, res) => {
    insightController.deleteInsight(req, res);
});

export default router;