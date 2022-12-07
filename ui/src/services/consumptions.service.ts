import axios from "axios";
import { IUploadData } from "../components/pages/admin/upload/UploadButton";

export class ConsumptionsService {
  public async getAllConsumptions(): Promise<any> {
    const response = await axios.get("/api/consumptions");
    return response.data;
  }

    public async bulkCreateConsumptions(consumptions: IUploadData[]): Promise<any> {
        // Last record comes back as undefined. This line gets all data without last record.
        const consumptionsData = consumptions.slice(0, -1);
        const response = await axios.post(`/api/consumption/bulk-create`, consumptionsData);
        return await response.data;
    }

    public async findAllConsumptionsBySiteIdAndTime(startTime: Date, endTime: Date, siteId: number): Promise<any> {
        const response = await axios.get(`/api/consumption/find/${startTime}/${endTime}/${siteId}`);
        return await response.data;
    }

    public async findSumOfConsumptionsBySiteIdAndTime(startTime: Date, endTime: Date, siteId: number): Promise<any> {
        const response = await axios.get(`/api/consumption/find-sum/${startTime}/${endTime}/${siteId}`);
        return await response.data;
    }
}
