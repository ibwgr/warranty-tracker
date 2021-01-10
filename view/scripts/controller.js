export default class Controller {

    constructor(view, data) {
        this.view = view;
        this.data = data;
    }

    async loadAndRender() {
        try{
            const warrantyEntries = await this.data.getWarrantyEntriesOfCurrentMonth();
            this.formatAndSort(warrantyEntries);
            this.view.renderList(warrantyEntries);
        } catch (e) {
            this.view.renderError(e.message);
        }
    }

    updateTrend(warrantyEntries) {
        this.view.updateTrend(
            (warrantyEntries.map(values => [Date.parse(values.date_), values.time_])));
    }

    formatAndSort(warrantyEntries) {
        warrantyEntries
            .sort(this.sortByDate())
            .forEach(entry => entry.date_ = this.formatDate(entry.date_));
    }

    sortByDate() {
        const date = "date_";

        return function (a,b){
            return new Date(b[date]) - new Date(a[date]);
        }
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString().split(",")[0];
    }

}