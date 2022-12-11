import axios from "axios";
export class EmailService {
    
  public async sendEmail(file: File): Promise<any> {
    let formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("/uploadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  }
}
