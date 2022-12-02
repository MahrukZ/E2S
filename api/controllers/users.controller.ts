import { Request, Response } from "express";
import { UserService } from "../services/users.service";

declare module 'express-session' {
    export interface SessionData {
      user: { [key: string]: any };
    }
  }

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getAllUsers(req: Request, res: Response): Promise<any> {
        return (this.userService.getAllUsers()
            .then(data => {
                res.status(200).json({
                    message: 'Success',
                    status: 200,
                    data
                });
            })
            .catch (err => {
                res.status(500).json({
                    message: err.message || "server error: failed to fetch user data.",
                    status: 500
                });
            })
        );
    };


    // async findUserByEmailAndPassword(req: Request, res: Response): Promise<any> {
    //     return (this.userService.findUserByEmailAndPassword(req.params.email, req.params.password)
    //         .then(data => {
    //             res.status(200).json({
    //                 message: 'Success',
    //                 status: 200,
    //                 data
    //             });
    //     })
    //     .catch(err => {
    //         res.status(500).json({
    //             message: err.message || "server error: failed to fetch user.",
    //             status: 500
    //         });
    //     })
    //     );
    // };

    async signIn(req: Request, res: Response): Promise<any> {
        return (this.userService.signIn(req.body.email, req.body.password)
            .then(data => {
                res.status(200).json({
                    message: 'Success',
                    status: 200,
                    data
                });
                req.session.user = data;
                console.log("session: ", req.session.user);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "server error: failed to fetch user.",
                status: 500
            });
        })
        );
    };
}