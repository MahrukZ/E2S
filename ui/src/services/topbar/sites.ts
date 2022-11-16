
export class SitesService {

    public async getSites(): Promise<any> {
        const response = await fetch('/api/sites');
        return await response.json();
    }

}