import { Request, Response } from "express";
import { UserManagementService } from "../services/user_management.service";

export class UserManagementController {
    private userManagementService: UserManagementService;

    constructor() {
        this.userManagementService = new UserManagementService();
    }

    async getAllUserManagements(req: Request, res: Response) {
        this.userManagementService.getAllUserManagements()
        .then(data => res.status(200).send({
            message: 'Success',
            'status': res.statusCode,
            data
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "server error: failed to fetch insights.",
                'status': res.statusCode
            });
            console.error(err);
        });
    }

    
    async findUserManagementById(req: Request, res: Response) {
        this.userManagementService.findUserManagementByUserId(parseInt(req.params.id))
        .then(data => res.status(200).send({
            message: 'Success',
            'status': res.statusCode,
            data
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "server error: failed to fetch user management.",
                'status': res.statusCode
            });
            console.error(err);
        });
    }

}