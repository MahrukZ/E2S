import { useEffect } from "react";

interface OverviewPageProps {
    setTopbarTitle: any;
}

function OverviewPage({ setTopbarTitle }: OverviewPageProps) {
    useEffect(() => {
        setTopbarTitle("Overview");
        document.title = "Admin - Overview";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div data-testid="overview" className="text-center">
            <h1>Overview</h1>
        </div>
    );
}

export default OverviewPage;
