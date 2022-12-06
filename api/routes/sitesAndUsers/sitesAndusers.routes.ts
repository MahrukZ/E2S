import express from "express";
import { SitesAndUsersController } from "../../controllers/sitesAndUsers.controller";

const router = express.Router();

// controllers
const sitesAndUsersController = new SitesAndUsersController();

// routes
router.get("/api/sites-and-users", async (req, res) => {
  sitesAndUsersController.getAllSitesAndUsers(req, res);
});

router.get("/api/sites-and-users/:id", async (req, res) => {
  sitesAndUsersController.findSitesAndUsersByUserId(req, res);
});

export default router;
