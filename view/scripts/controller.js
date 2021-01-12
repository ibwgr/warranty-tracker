export default class Controller {

    constructor(view, data) {
        this.view = view;
        this.data = data;
    }

    async postWarrantyEntry(warrantyEntry) {
        try {
            await this.data.addWarrantyEntry(warrantyEntry);
        } catch (e) {
            console.log(e);
        }
    }

    async loadAndRender() {
        try {
            const lastTwelveMonths = this.getLastTwelveMonths();
            this.view.updateTrend(lastTwelveMonths, [1, 12, 5, 46, 5, 6, 7, 8, 9, 10, 11, 12])

            const warrantyEntriesCurrentMonth = await this.data.getWarrantyEntriesOfCurrentMonth();
            this.formatAndSort(warrantyEntriesCurrentMonth)
            this.view.renderList(warrantyEntriesCurrentMonth);

        } catch (e) {
            this.view.renderError(e.message);
        }
    }

    formatAndSort(warrantyEntries) {
        warrantyEntries
            .sort(this.sortByDate())
            .forEach(entry => entry.date_ = this.formatDate(entry.date_));
    }

    getLastTwelveMonths() {
        const date = new Date();
        let lastTwelveMonths = [];
        const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

        for(let i = 0; i < 12; i++) {
            lastTwelveMonths.push(monthNames[date.getMonth()] + " " + date.getFullYear());
            date.setMonth(date.getMonth() - 1);
        }

        return lastTwelveMonths.reverse();
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