import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { InsightController } from "./controllers/insights.controller";
import { SiteController } from "./controllers/sites.controller";
import { SitesAndUsersController } from "./controllers/sitesAndUsers.controller";
import { UserManagementController } from "./controllers/userManagement.controller";
import { ConsumptionController } from "./controllers/consumptions.controller";

// config
dotenv.config();
const port = process.env.PORT || 8082;
const app = express();

app.use(express.json());
app.use(cors());

// controllers
const insightController = new InsightController();
const siteController = new SiteController();
const sitesAndUsersController = new SitesAndUsersController();
const userManagementController = new UserManagementController();
const consumptionController = new ConsumptionController();

// routes

//insights
app.get("/api/insights", async (req, res) => {
    insightController.getAllInsights(req, res);
});

app.post("/api/insight", async (req, res) => {
    insightController.createInsight(req, res);
});

app.put("/api/insight", async (req, res) => {
    insightController.updateInsight(req, res);
});

app.delete("/api/insight/:id", async (req, res) => {
    insightController.deleteInsight(req, res);
});

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

//sites_and_users
app.get("/api/sites-and-users", async (req, res) => {
    sitesAndUsersController.getAllSitesAndUsers(req, res);
});

app.get("/api/sites-and-users/:id", async (req, res) => {
    sitesAndUsersController.findSitesAndUsersByUserId(req, res);
});

// user management
app.get("/api/user-managements", async (req, res) => {
    userManagementController.getAllUserManagements(req, res);
});

app.get("/api/user-management/:id", async (req, res) => {
    userManagementController.findUserManagementByUserId(req, res);
});

// consumptions
app.get("/api/consumptions", async (req, res) => {
    consumptionController.getAllConsumptions(req, res);
});

app.post("/api/consumption", async (req, res) => {
    consumptionController.createConsumption(req, res);
});

app.post("/api/consumption/bulk-create", async (req, res) => {
    consumptionController.bulkCreateConsumptions(req, res);
});

// port listen
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});

export default app;