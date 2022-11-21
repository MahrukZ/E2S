import { Request, Response } from "express";
import { UserManagementService } from "../services/user_management.service";

export class UserManagementController {
    private userManagementService: UserManagementService;

    constructor() {
        this.userManagementService = new UserManagementService();
    }

    async getAllUserManagements(req: Request, res: Response): Promise<any> {
        return (this.userManagementService.getAllUserManagements()
            .then(data => {
                res.status(200).json({
                    message: 'Success',
                    status: 200,
                    data
                });
            })
            .catch (err => {
                res.status(500).json({
                    message: err.message || "server error: failed to fetch user management data.",
                    status: 500
                });
            })
        );
    };


    async findUserManagementByUserId(req: Request, res: Response): Promise<any> {
        return (this.userManagementService.findUserManagementByUserId(parseInt(req.params.id))
            .then(data => {
                res.status(200).json({
                    message: 'Success',
                    status: 200,
                    data
                });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "server error: failed to fetch user management data.",
                status: 500
            });
        })
        );
    };


}