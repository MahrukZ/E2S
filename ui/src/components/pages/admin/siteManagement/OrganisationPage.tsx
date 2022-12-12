import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { OrganisationsService } from "../../../../services/organisations.service";
import Message from "../../../reusable/alerts/Message";

interface OrganisationPageProps {
    setTopbarTitle: any;
}

export interface IOrganisation {
    orgId?: number;
    name?: string;
    logoId?: number;
}

function OrganisationPage({ setTopbarTitle }: OrganisationPageProps) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [org, setOrg] = useState<IOrganisation>({
        name: "",
        logoId: 1,
    });

    const orgService = new OrganisationsService();

    const createOrganisation = async () => {
        try {
            await orgService.createOrganisation(org);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddOrg = () => {
        let valid: boolean = true;
        if (org.name!.length <= 0) {
            setSuccess("");
            setError("Fill in all required fields!");
            valid = false;
        }
        if (valid) {
            createOrganisation();
            setError("");
            setSuccess(`Successfully added organisation: ${org.name}`);
        }
    };

    useEffect(() => {
        setTopbarTitle("Organisation Management");
        document.title = "Admin - Organisation Management";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container className="mt-5">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Organisation Name*</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the name of your Organisation"
                        autoFocus
                        onChange={(e: any) => {
                            setOrg({ ...org, name: e.target.value });
                        }}
                    />
                </Form.Group>
                {error.length > 0 && <Message message={error} type="danger" />}
                {success.length > 0 && (
                    <Message message={success} type="success" />
                )}
                <Button variant="outline-success" onClick={handleAddOrg}>
                    Add Organisation
                </Button>
            </Form>
        </Container>
    );
}

export default OrganisationPage;
