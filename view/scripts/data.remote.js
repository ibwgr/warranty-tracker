export default class Data {

    constructor(serverUrl) {
        this.serverUrl = serverUrl;
    }

    getWarrantyEntriesOfLastTwelveMonths() {
        let url = new URL(this.serverUrl + "/warranty/last-12-month")

        return fetch(url.toString(), {
            headers: new Headers({
                'Accept': 'application/json',
            })
        }).then(response => {
            if (response.ok) {
                return Promise.resolve(response.json());
            }else{
                return response.json().then(json => Promise.reject(json));
            }
        });
    }

    getWarrantyEntriesOfCurrentMonth() {
        let url = new URL(this.serverUrl + "/warranty/current-month")

        return fetch(url.toString(), {
            headers: new Headers({
                'Accept': 'application/json',
            })
        }).then(response => {
            if ( response.ok) {
                return Promise.resolve(response.json());
            } else {
                return response.json().then(json => Promise.reject(json));
            }
        });
    }

    getWarrantyEntriesByDateSelection(fromDate, toDate) {
        let url = new URL(this.serverUrl + "/warranty/date-selection");

        const params = {from:fromDate, to:toDate};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        return fetch(url.toString(), {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
        }).then(response => {
            if ( response.ok) {
                return Promise.resolve(response.json());
            } else {
                return response.json().then(json => Promise.reject(json));
            }
        });
    }

    async addWarrantyEntry(warrantyEntry) {
        let url = new URL(this.serverUrl + "/warranty/add-entry");

        return fetch(url.toString(),  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(warrantyEntry)
        }).then(response => {
            if (response.ok){
                return Promise.resolve(response.json());
            }else{
                return response.json().then(json => Promise.reject(json));
            }
        });
    }

    async deleteWarrantyEntry(warrantyEntryID) {
        let url = new URL(this.serverUrl + "/warranty/delete-entry");

        return fetch(url.toString(),  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(warrantyEntryID)
        });
    }

}
