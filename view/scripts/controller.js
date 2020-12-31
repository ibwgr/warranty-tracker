export default class Controller {

    constructor(view, data) {
        this.view = view;
        this.data = data;
    }

    async loadAndRender(){
        try{
            const warrantyEntries = await this.data.getWarrantyEntriesOfCurrentMonth();
            this.view.renderList(warrantyEntries);
        } catch (e) {
            console.log(e);
        }
    }


    updateTrend(warrantyEntries) {
        this.view.updateTrend(
            (warrantyEntries.map(values => [Date.parse(values.date_), values.time_])));
    }

}