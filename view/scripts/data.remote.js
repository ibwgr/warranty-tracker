export default class Data {

    constructor(serverUrl) {
        this.serverUrl = serverUrl;
    }

    async getWarrantyEntriesOfLastTwelveMonths() {
        let url = new URL(this.serverUrl + "/warranty/last-12-month")

        return fetch(url.toString(), {
            headers: new Headers({
                'Accept': 'application/json',
            })
        }).then(response => {
            if (response.ok){
                return response.json()
            }else{
                return Promise.reject(response)
            }
        })
    }

    async getWarrantyEntriesOfCurrentMonth() {
        let url = new URL(this.serverUrl + "/warranty/current-month")

        return fetch(url.toString(), {
            headers: new Headers({
                'Accept': 'application/json',
            })
        }).then(response => {
            if (response.ok){
                return response.json()
            }else{
                return Promise.reject(response)
            }
        })
    }

    async addWarrantyEntry(entryData) {
        let url = new URL(this.serverUrl + "/warranty/add-entry");

        return fetch(url.toString(),  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entryData)
        }).then(response => {
            if (response.ok){
                return response.json()
            }else{
                return Promise.reject(response)
            }
        })
    }

}