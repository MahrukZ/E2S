import axios from "axios";

export class ConsumptionsService{

    public async getAllConsumptions():Promise<any> {
        const response = await axios.get('/api/consumptions');
        return response.data;
    }

}