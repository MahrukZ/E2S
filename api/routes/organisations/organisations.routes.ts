import express from "express";
import { OrganisationController } from "../../controllers/organisations.controller";

const router = express.Router();

// controllers
const organisationController = new OrganisationController();

// routes
router.get("/api/organisations", async (req, res) => {
    organisationController.getAllOrganisations(req, res);
});

router.post("/api/organisation", async (req, res) => {
    organisationController.createOrganisation(req, res);
});

router.put("/api/organisation", async (req, res) => {
    organisationController.updateOrganisation(req, res);
});

router.delete("/api/organisation/:id", async (req, res) => {
    organisationController.deleteOrganisation(req, res);
});

export default router;
