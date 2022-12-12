import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { OrganisationsService } from "../../../../services/organisations.service";

interface OrganisationPageProps {
    setTopbarTitle: any;
}

export interface IOrganisation {
    orgId?: number;
    name?: string;
    logoId?: number;
}

function OrganisationPage({ setTopbarTitle }: OrganisationPageProps) {
    const [org, setOrg] = useState<IOrganisation>({
        name: "",
        logoId: 1,
    });

    const orgService = new OrganisationsService();

    const handleAddOrg = () => {
        const createOrganisation = async () => {
            try {
                console.log(org);
                await orgService.createOrganisation(org);
            } catch (err) {
                console.log(err);
            }
        };
        createOrganisation();
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
                    <Form.Label>Organisation Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the name of your Organisation"
                        autoFocus
                        onChange={(e: any) => {
                            setOrg({ ...org, name: e.target.value });
                        }}
                    />
                </Form.Group>
                <Button variant="outline-success" onClick={handleAddOrg}>
                    Add Organisation
                </Button>
            </Form>
        </Container>
    );
}

export default OrganisationPage;
