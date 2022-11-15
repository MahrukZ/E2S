import Form from 'react-bootstrap/Form';

interface SiteDropownProps {
    sites: String[];
}

function SiteDropdown({ sites }: SiteDropownProps) {
  return (
    <div>
      <Form.Select id="siteDropdown" size="sm" className="mt-1 mb-1">
        {sites.map((site, index) => (
          <option key={index} value={index}>
            {site}
          </option>
        ))}
      </Form.Select>
    </div>
  )
}

export default SiteDropdown