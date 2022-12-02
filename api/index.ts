import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { InsightController } from "./controllers/insights.controller";
import { SiteController } from "./controllers/sites.controller";
import { SitesAndUsersController } from "./controllers/sitesAndUsers.controller";
import { UserManagementController } from "./controllers/userManagement.controller";
import { ConsumptionController } from "./controllers/consumptions.controller";
import { UserController } from "./controllers/users.controller";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";

// config
dotenv.config();
const port = process.env.PORT || 8082;
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    // key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600,
    }
}))


// controllers
const insightController = new InsightController();
const siteController = new SiteController();
const sitesAndUsersController = new SitesAndUsersController();
const userManagementController = new UserManagementController();
const consumptionController = new ConsumptionController();
const userController = new UserController();

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

// users
app.get("/api/users", async (req, res) => {
    userController.getAllUsers(req, res);
});

// app.get("/api/users/:email/:password", async (req, res) => {
//     userController.findUserByEmailAndPassword(req, res);
// });

// sign in
app.post("/sign-in", async (req, res) => {
    userController.signIn(req, res);
})

// port listen
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});

export default app;