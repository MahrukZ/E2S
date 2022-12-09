import React from "react";
import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { UsersService } from "../../../../services/users.service";

function DeleteBtn(id: number) {
    const usersService = new UsersService();

    const handleDeleteUser = async () => {
        try {
            usersService.deleteUser(id);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Button variant="outline-danger" onClick={handleDeleteUser}>
            <FaTrash />
        </Button>
    );
}

export default DeleteBtn;
