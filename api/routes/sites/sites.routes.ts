import express from "express";
import { SiteController } from "./../../controllers/sites.controller";

const router = express.Router();

// controllers
const siteController = new SiteController();

// routes

// Unused Routes
// router.get("/api/sites", async (req, res) => {
//     siteController.getAllSites(req, res);
// });

// router.post("/api/site", async (req, res) => {
//     siteController.createSite(req, res);
// });

// router.put("/api/site", async (req, res) => {
//     siteController.updateSite(req, res);
// });

// router.delete("/api/site/:id", async (req, res) => {
//     siteController.deleteSite(req, res);
// });

router.get("/api/site/:id", async (req, res) => {
    siteController.findSiteById(req, res);
});

export default router;
