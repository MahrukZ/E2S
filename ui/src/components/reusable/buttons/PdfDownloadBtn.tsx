import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { EmailService } from "../../../services/uploadFile.service";

const emailService = new EmailService();

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
      const base64File = pdfURLToBase64(
        pdf.output("datauristring"),
        "report.pdf"
      );
      emailService.sendEmail(base64File);
    });
  };

  return (
    <Button variant="light" onClick={downloadPdfDocument}>
      Download <FaDownload />
    </Button>
  );
}

// Reference
// Taken from https://stackoverflow.com/questions/35940290/
// Function converting pdf URL to base 64

const pdfURLToBase64 = (dataURL: string, fileName: string) => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "";
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    n = n - 1;
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

// Reference ends

export default PdfDownloadBtn;
