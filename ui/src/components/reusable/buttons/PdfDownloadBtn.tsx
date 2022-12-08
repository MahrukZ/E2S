import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";

interface IPdfDownloadProp {
    rootElementId: string;
    downloadFileName: string;
}

function PdfDownloadBtn({ rootElementId, downloadFileName }: IPdfDownloadProp) {
    const downloadPdfDocument = () => {
        const input = document.getElementById(rootElementId);
        html2canvas(input!).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
            pdf.save(`${downloadFileName}.pdf`);
        });
    };

    return (
        <Button variant="primary" onClick={downloadPdfDocument}>
            Download <FaDownload />
        </Button>
    );
};

export default PdfDownloadBtn;
