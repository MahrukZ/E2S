import Form from "react-bootstrap/Form";
import { ISiteAndUser } from "./Topbar";

interface SiteDropownProps {
  sites: ISiteAndUser[];
}

function SiteDropdown({ sites }: SiteDropownProps) {
  return (
    <div>
      <Form.Select
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
