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
            const warrantyEntriesRecentYear = await this.data.getWarrantyEntriesOfLastTwelveMonths();
            let workingHoursPerMonths = this.getWorkingHoursPerMonths(warrantyEntriesRecentYear);
            this.view.updateTrend(workingHoursPerMonths.months, workingHoursPerMonths.workingHours)

            const warrantyEntriesCurrentMonth = await this.data.getWarrantyEntriesOfCurrentMonth();
            this.formatAndSort(warrantyEntriesCurrentMonth)
            this.view.renderList(warrantyEntriesCurrentMonth);

        } catch (e) {
            this.view.renderError(e.message);
        }
    }

    getWorkingHoursPerMonths(entries) {
        const date = new Date();
        const workingHoursPerMonths = [];
        const lastTwelveMonths = [];

        for (let i = 0; i < 12; i++){
            lastTwelveMonths.push(this.getMonthNameAndYear(date));

            workingHoursPerMonths.push(entries
                .filter(entry => new Date(entry.date_).getMonth() === date.getMonth())
                .reduce((totalWorkingHours, entry) => {
                    const time = entry.time_.split(":");
                    const hours = parseInt(time[0]);
                    const decimalMinutes = parseInt(time[1]);
                    return totalWorkingHours+  ( hours + ( decimalMinutes/ 100));
                }, 0));

            date.setMonth(date.getMonth() - 1);
        }

        return {
            months: lastTwelveMonths.reverse(),
            workingHours: workingHoursPerMonths.reverse()
        };
    }

    getMonthNameAndYear(date) {
        const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        return monthNames[date.getMonth()] + " " + date.getFullYear();
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