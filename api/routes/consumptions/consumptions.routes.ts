import express from "express";
import { ConsumptionController } from "./../../controllers/consumptions.controller";

const router = express.Router();

// controller
const consumptionController = new ConsumptionController();

// routes
router.get("/api/consumptions", async (req, res) => {
    consumptionController.getAllConsumptions(req, res);
});

router.post("/api/consumptions", async (req, res) => {
    consumptionController.createConsumption(req, res);
});

router.post("/api/consumption/bulk-create", async (req, res) => {
    consumptionController.bulkCreateConsumptions(req, res);
});

export default router;