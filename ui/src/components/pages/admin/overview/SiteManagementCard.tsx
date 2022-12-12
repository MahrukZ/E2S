import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaBuilding } from "react-icons/fa";
import { SiteManagementService } from "../../../../services/siteManagement.service";
import "./OverviewCols.css";
import ReactLoading from "react-loading";

function SiteManagementCard() {
    const [numOfSites, setNumOfSites] = useState(0);
    const [isLoading, setLoading] = useState<Boolean>(false);

    const siteManagementService = new SiteManagementService();

    useEffect(() => {
        const getTotalNumOfSitesAndLocations = async () => {
            setLoading(true);
            try {
                const sites =
                    await siteManagementService.getAllSiteManagements();
                setNumOfSites(sites.data.length);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        getTotalNumOfSitesAndLocations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numOfSites]);

    return (
        <Col id="siteManagementCol">
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
                                {isLoading ? (
                                    <ReactLoading
                                        className="loaderAlignment"
                                        type="spin"
                                        color="#203841"
                                        height={"40%"}
                                        width={"40%"}
                                    />
                                ) : (
                                    <h4>{numOfSites}</h4>
                                )}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </a>
        </Col>
    );
}

export default SiteManagementCard;
