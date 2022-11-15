import axios from "axios"

export class SitesService {

    public async getSites(): Promise<any> {
        const response = await axios.get('/api/sites');
        return response.data;
    }

    // public async addUser(user: any) {
    //     const response = await fetch(`/api/user`, {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({user})
    //       })
    //     return await response.json();
    // }

}