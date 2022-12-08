import Form from "react-bootstrap/Form";
import { ISiteAndUser } from "./Topbar";

interface SiteDropownProps {
    sites: ISiteAndUser[];
    setCurrentSite: any;
}

function SiteDropdown({ sites, setCurrentSite }: SiteDropownProps) {
    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        setCurrentSite(value);
    };

    return (
        <div>
            <Form.Select
                onChange={selectChange}
                data-testid="siteDropdown"
                id="siteDropdown"
                size="sm"
                className="mt-1 mb-1"
            >
                {sites.map((site, index) => (
                    <option data-testid={index} key={index} value={site.siteId}>
                        {site.siteName}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
}

export default SiteDropdown;
