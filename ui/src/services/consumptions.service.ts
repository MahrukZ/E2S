import axios from "axios"
import { IUploadData } from "../components/pages/upload/UploadButton"

export class ConsumptionsService {

    public async bulkCreateConsumptions(consumptions: IUploadData[]): Promise<any> {
        // Below JSON is the format we need to upload in
        // const testJSON = [{
        //     "time_interval": "01/01/2022 00:00",
        //     "heat_demand": 2359.085965,
        //     "electricity_demand": 2576.30814,
        //     "electricity_price": 43.45,
        //     "gas_price": 43.63,
        //     "site_id": 1,
        //     "org_id": 1
        // },
        // {
        //     "time_interval": "01/01/2022 00:30",
        //     "heat_demand": 2349.085995,
        //     "electricity_demand": 2576.30814,
        //     "electricity_price": 43.55,
        //     "gas_price": 43.34,
        //     "site_id": 1,
        //     "org_id": 1
        // }];

        // Last record comes back as undefined. This line gets all data without last record.
        const consumptionsData = consumptions.slice(0, -1);
        console.log("request:", consumptionsData);
        const response = await axios.post(`/api/consumption/bulk-create`, consumptionsData);
        return await response.data;
    }

}