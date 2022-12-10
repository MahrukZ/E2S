import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaTrash } from "react-icons/fa";
import { UserManagementService } from "../../../../services/userManagement.service";
import { UsersService } from "../../../../services/users.service";

interface IDeleteBtnProp {
    id: number;
    setUsersList: any;
}

function DeleteBtn({ id, setUsersList }: IDeleteBtnProp) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const usersService = new UsersService();
    const userManagementService = new UserManagementService();

    const handleDeleteUser = async () => {
        try {
            await usersService.deleteUser(id);
            const users = await userManagementService.getAllUserManagements();
            setUsersList(users.data);
            setShow(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Button variant="outline-danger" onClick={handleShow}>
                <FaTrash />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this user? This action
                    cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteBtn;
