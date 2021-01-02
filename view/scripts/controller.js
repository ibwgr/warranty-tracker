export default class Controller {

    constructor(view, data) {
        this.view = view;
        this.data = data;
    }

    async loadAndRender(){
        try{
            const warrantyEntries = await this.data.getWarrantyEntriesOfCurrentMonth();
            this.formatAndSort(warrantyEntries)
            this.view.renderList(warrantyEntries);
        } catch (e) {
            console.log(e);
        }
    }


    updateTrend(warrantyEntries) {
        this.view.updateTrend(
            (warrantyEntries.map(values => [Date.parse(values.date_), values.time_])));
    }


    formatAndSort(warrantyEntries){
        warrantyEntries
            .sort(this.sortByDate())
            .forEach(entry => entry.date_ = this.formatDate(entry.date_));
    }

    sortByDate(){
        const date = "date_";
        const sortOrder = 1;

        return function (a,b){
            const result = (a[date] < b[date]) ? -1 : (a[date] > b[date]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    formatDate(date){
        return new Date(date).toLocaleDateString().split(",")[0];
    }

}