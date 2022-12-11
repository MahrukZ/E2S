import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaTrash } from "react-icons/fa";
import { SitesService } from "../../../../services/sites.service";
import { UsersService } from "../../../../services/users.service";
import { SiteManagementService } from "../../../../services/siteManagement.service";

interface IDeleteBtnProp {
    id: any;
    setSitesList: any;
}

function DeleteSite({ id, setSitesList }: IDeleteBtnProp) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const sitesService = new SitesService();
    const siteManagementService = new SiteManagementService();

    const handleDeleteSite = async () => {
        try {
            await sitesService.deleteSite(id);
            const sites = await siteManagementService.getAllSiteManagements();
            setSitesList(sites.data);
            setShow(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Button
                id="deleteUserBtn"
                variant="outline-danger"
                onClick={handleShow}
            >
                <FaTrash />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Site?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this site? This action
                    cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteSite}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteSite;
