import axios from "axios"

export class InsightsService {

    public async getInsights(): Promise<any> {
        const response = await axios.get(`/api/insights`);
        return await response.data;
    }

}