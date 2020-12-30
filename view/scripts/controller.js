export default class Controller {

    constructor(view, data) {
        this.view = view;
        this.data = data;
    }

    async loadAndRender(){
        try{
            const warrantyEntries = await this.getWarrantyEntriesOfLastTwelveMonths()
            this.view.renderList(warrantyEntries);
        } catch (e) {
            console.log(e);
        }
    }

    async getWarrantyEntriesOfLastTwelveMonths() {
        return await this.data.getWarrantyEntriesOfLastTwelveMonths();
    }

    updateTrend(warrantyEntries) {
        this.view.updateTrend(
            (warrantyEntries.map(values => [Date.parse(values.date_), values.time_])));
    }

}