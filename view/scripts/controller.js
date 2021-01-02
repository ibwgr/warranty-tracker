export default class Controller {

    constructor(view, data) {
        this.view = view;
        this.data = data;
    }

    async loadAndRender(){
        try{
            const warrantyEntries = await this.data.getWarrantyEntriesOfCurrentMonth();
            this.formatDate(warrantyEntries)
            this.view.renderList(warrantyEntries);
        } catch (e) {
            console.log(e);
        }
    }


    updateTrend(warrantyEntries) {
        this.view.updateTrend(
            (warrantyEntries.map(values => [Date.parse(values.date_), values.time_])));
    }


    formatDate(warrantyEntries){
        warrantyEntries.forEach(entry => entry.date_ = new Date(entry.date_).toLocaleDateString().split(",")[0])
    }

}