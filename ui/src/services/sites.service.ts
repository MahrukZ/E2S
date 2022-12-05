import axios from "axios";

export class SitesService {
  public async getSites(): Promise<any> {
    const response = await axios.get("/api/sites");
    return await response.data;
  }
}
