import Upload from "./Upload";
import { useEffect } from "react";

interface UploadPageProps {
    setTopbarTitle: any;
}

function UploadPage({ setTopbarTitle }: UploadPageProps) {
    useEffect(() => {
        setTopbarTitle("Upload");
        document.title = "Admin/Site Management";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div data-testid="uploadElement" className="container">
            <Upload siteId={0} />
        </div>
    );
}

export default UploadPage;
