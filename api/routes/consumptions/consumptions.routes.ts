import express from "express";
import { ConsumptionController } from "./../../controllers/consumptions.controller";

const router = express.Router();

// controller
const consumptionController = new ConsumptionController();

// routes
router.get("/api/consumptions", async (req, res) => {
    consumptionController.getAllConsumptions(req, res);
});

router.post("/api/consumption", async (req, res) => {
    consumptionController.createConsumption(req, res);
});

router.post("/api/consumption/bulk-create", async (req, res) => {
    consumptionController.bulkCreateConsumptions(req, res);
});

router.get("/api/consumption/find/:start/:end/:id", async (req, res) => {
    consumptionController.findAllConsumptionsBySiteIdAndTime(req, res);
});

router.get("/api/consumption/find-sum/:start/:end/:id", async (req, res) => {
    consumptionController.findSumOfConsumptionsBySiteIdAndTime(req, res);
});

export default router;