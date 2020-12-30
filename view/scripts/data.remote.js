export default class Data {

    constructor(serverUrl) {
        this.serverUrl = serverUrl;
    }

    async getWarrantyEntriesOfLastTwelveMonths(){
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
}