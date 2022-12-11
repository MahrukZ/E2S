import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { ISiteAndUser } from "./Topbar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./Topbar.css";

interface SiteDropownProps {
    sites: ISiteAndUser[];
    setCurrentSite: any;
    currentSite: any;
}

function SiteDropdown({
    sites,
    setCurrentSite,
    currentSite,
}: SiteDropownProps) {
    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        setCurrentSite(value);
    };

    useEffect(() => {
        const setSite = async () => {
            let firstSite = 1;

            if (sites.length > 0) {
                if (currentSite === 0) {
                    firstSite = sites[0]["siteId"];
                    setCurrentSite(firstSite);
                }
            }
        };
        setSite();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="onTop">
            <Tooltip anchorId="siteDropdown" />
            <Form.Select
                onChange={selectChange}
                data-testid="siteDropdown"
                id="siteDropdown"
                size="sm"
                className="mt-1 mb-1"
                data-tooltip-content="Choose the site you want to see data for"
            >
                {sites.map((site, index) => (
                    <option
                        data-testid={index}
                        key={index}
                        value={site.siteId}
                    >
                        {site.siteName}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
}

export default SiteDropdown;
