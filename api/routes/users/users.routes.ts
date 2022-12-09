import express from "express";
import { UserManagementController } from "../../controllers/userManagement.controller";
import { UserController } from "../../controllers/users.controller";

const router = express.Router();

// controller
const userManagementController = new UserManagementController();
const userController = new UserController();

// routes
router.get("/api/user-managements", async (req, res) => {
    userManagementController.getAllUserManagements(req, res);
});

router.get("/api/user-management/:id", async (req, res) => {
    userManagementController.findUserManagementByUserId(req, res);
});

router.post("/api/user", async (req, res) => {
    userController.createUser(req, res);
});

router.delete("/api/user/:id", async (req, res) => {
    userController.deleteUser(req, res);
});

router.put("/api/user", async (req, res) => {
    userController.updateUser(req, res);
});

export default router;
