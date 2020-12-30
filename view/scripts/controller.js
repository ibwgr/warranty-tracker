export default class Controller {

    constructor(view, data) {
        this.view = view
        this.data = data
    }

    async getWarrantyEntriesOfLastTwelveMonths() {
        const warrantyEntries = await this.data.getWarrantyEntriesOfLastTwelveMonths();
            this.updateView(warrantyEntries);
    }


    updateView(warrantyEntries) {
        this.view.updateTrend(
            (warrantyEntries.map(values => [Date.parse(values.date_), values.time_])))
    }

}