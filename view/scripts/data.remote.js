export default class Data {

    constructor(serverUrl) {
        this.serverUrl = serverUrl;
    }

    getWarrantyEntriesOfLastTwelveMonths() {
        let url = new URL(this.serverUrl + "/warranty/last-12-month");

        return fetch(url.toString(), {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        }).then(response => {
            if (response.ok) {
                return Promise.resolve(response.json());
            } else {
                return response.json().then(json => Promise.reject(json));
            }
        }).catch(error => console.log('Error message:', error));
    }

    getWarrantyEntriesOfCurrentMonth() {
        let url = new URL(this.serverUrl + "/warranty/current-month")

        return fetch(url.toString(), {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        }).then(response => {
            if (response.ok) {
                return Promise.resolve(response.json());
            } else {
                return response.json().then(json => Promise.reject(json));
            }
        }).catch(error => console.log('Error message:', error));
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
            if (response.ok) {
                return Promise.resolve(response.json());
            } else {
                return response.json().then(json => Promise.reject(json));
            }
        }).catch(error => console.log('Error message:', error));
    }

    async addWarrantyEntry(warrantyEntry) {
        let url = new URL(this.serverUrl + "/warranty/add-entry");

        return fetch(url.toString(),  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(warrantyEntry)
        }).then(response => {
            if (response.ok) {
                return Promise.resolve(response.json());
            } else {
                return response.json().then(json => Promise.reject(json));
            }
        }).catch(error => console.log('Error message:', error));
    }

    async deleteWarrantyEntry(warrantyEntryID) {
        let url = new URL(this.serverUrl + "/warranty/delete-entry");

        return fetch(url.toString(),  {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(warrantyEntryID)
        }).then(response => {
            if (response.ok){
                return Promise.resolve(response.json());
            } else {
                return response.json().then(json => Promise.reject(json));
            }
        }).catch(error => console.log('Error message:', error));
    }

}
