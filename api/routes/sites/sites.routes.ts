import express from "express";
import { SiteController } from "./../../controllers/sites.controller";
import { SiteManagementController } from "../../controllers/siteManagement.controller";

const router = express.Router();

// controllers
const siteController = new SiteController();
const siteManagmentController = new SiteManagementController();

// routes

router.get("/api/sites", async (req, res) => {
    siteController.getAllSites(req, res);
});

router.get("/api/site-managements", async (req, res) => {
    siteManagmentController.getAllSiteManagements(req, res);
});

router.post("/api/site", async (req, res) => {
    siteController.createSite(req, res);
});

router.put("/api/site", async (req, res) => {
    siteController.updateSite(req, res);
});

router.delete("/api/delete-site/:id", async (req, res) => {
    siteController.deleteSite(req, res);
});

router.get("/api/site/:id", async (req, res) => {
    siteController.findSiteById(req, res);
});

router.get("/api/sites/:orgId", async (req, res) => {
    siteController.findSitesByOrgId(req, res);
});

export default router;
