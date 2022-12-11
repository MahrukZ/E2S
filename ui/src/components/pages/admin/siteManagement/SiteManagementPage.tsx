import { useEffect } from "react";

interface SiteManagementPageProps {
    setTopbarTitle: any;
}

function SiteManagementPage({ setTopbarTitle }: SiteManagementPageProps) {
    useEffect(() => {
        setTopbarTitle("Site Managment");
        document.title = "Admin/Site Management";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="text-center">
            <h1>Site Management</h1>
        </div>
    );
}

export default SiteManagementPage;
