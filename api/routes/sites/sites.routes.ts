import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { SiteController } from "./../../controllers/sites.controller";

// config
dotenv.config();
const port = process.env.PORT || 8082;
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());

// controllers
const siteController = new SiteController();

//sites
app.get("/api/sites", async (req, res) => {
    siteController.getAllSites(req, res);
});

app.post("/api/site", async (req, res) => {
    siteController.createSite(req, res);
});

app.put("/api/site", async (req, res) => {
    siteController.updateSite(req, res);
});

app.delete("/api/site/:id", async (req, res) => {
    siteController.deleteSite(req, res);
});