import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaBuilding } from "react-icons/fa";
import { SiteManagementService } from "../../../../services/siteManagement.service";
import "./OverviewCols.css";

function SiteManagementCard() {
    const [numOfSites, setNumOfSites] = useState(0);

    const siteManagementService = new SiteManagementService();

    useEffect(() => {
        const getTotalNumOfSitesAndLocations = async () => {
            try {
                const sites =
                    await siteManagementService.getAllSiteManagements();
                setNumOfSites(sites.data.length);
            } catch (err) {
                console.log(err);
            }
        };
        getTotalNumOfSitesAndLocations();
    }, [numOfSites]);

    return (
        <Col>
            <a href="/admin/site-management">
                <Card className="cardStyle">
                    <Card.Title className="cardContent">
                        <h1>
                            <FaBuilding /> Site Management
                        </h1>
                    </Card.Title>
                    <Card.Text>
                        <h6>View or Edit Sites</h6>
                    </Card.Text>
                    <Card.Body className="cardBody">
                        <Row>
                            <Col>
                                <h3>Sites</h3>
                                <h4>{numOfSites}</h4>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </a>
        </Col>
    );
}

export default SiteManagementCard;
