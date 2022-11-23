import Form from 'react-bootstrap/Form';
import SiteAndUser from "../../../dtos/SiteAndUser";

interface SiteDropownProps {
    sites: SiteAndUser[];
}

function SiteDropdown({ sites }: SiteDropownProps) {
  return (
    <div>
      <Form.Select data-testid="siteDropdown" id="siteDropdown" size="sm" className="mt-1 mb-1">
        {sites.map((site, index) => (
          <option data-testid={index} key={index} value={site.siteId}>
            {site.siteName}
          </option>
        ))}
      </Form.Select>
    </div>
  )
}

export default SiteDropdown