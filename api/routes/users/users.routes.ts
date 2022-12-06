import express from "express";
import { UserManagementController } from "../../controllers/userManagement.controller";

const router = express.Router();

// controller
const userManagementController = new UserManagementController();

// routes
router.get("/api/user-managements", async (req, res) => {
  userManagementController.getAllUserManagements(req, res);
});

router.get("/api/user-management/:id", async (req, res) => {
  userManagementController.findUserManagementByUserId(req, res);
});

export default router;
