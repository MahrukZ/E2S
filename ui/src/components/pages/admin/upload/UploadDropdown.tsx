import React from "react";
import { SitesService } from "../../../../services/sites.service";
import { useEffect, useState } from "react";

export interface ISite {
    siteId: number;
    siteName: string;
}

function UploadDropdown() {
    const siteService = new SitesService();

    const [allSites, setAllSites] = useState<ISite[]>([]);

    useEffect(() => {
        const redirect = async () => {
            let sitesList: ISite[] = [];

            const siteRes = await siteService.getSites();
            if (siteRes.data !== undefined) {
                const len = siteRes.data.length;
                for (let index = 0; index < len; index++) {
                    const currentSiteId = siteRes.data[index].siteId;
                    const currentSiteName = siteRes.data[index].name;
                    const siteToAdd: ISite = {
                        siteId: currentSiteId,
                        siteName: currentSiteName,
                    };
                    sitesList.push(siteToAdd);
                }
            }
            setAllSites(sitesList);
        };
        redirect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log("allSites: ", allSites);

    return <div>UploadDropdown</div>;
}

export default UploadDropdown;
