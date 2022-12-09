import Upload from "./Upload";
import { useEffect } from "react";

interface UploadPageProps {
    setTopbarTitle: any;
}

function UploadPage({ setTopbarTitle }: UploadPageProps) {
    useEffect(() => {
        setTopbarTitle("Upload");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="container">
            <Upload />
        </div>
    );
}

export default UploadPage;
