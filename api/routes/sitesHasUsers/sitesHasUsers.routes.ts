import express from "express";
import { SitesHasUsersController } from "../../controllers/sitesHasUsers.controller";

const router = express.Router();

// controllers
const sitesHasUsersController = new SitesHasUsersController();

// routes
router.post("/api/sites-has-users", async (req, res) => {
    sitesHasUsersController.createSitesHasUsers(req, res);
});

export default router;
