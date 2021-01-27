export default class Controller {

    constructor(view, data) {
        this.view = view;
        this.data = data;

        view.registerRefreshHandler((fromDate, toDate) => {
            return this.getValuesByFromAndToDate(fromDate,toDate);
        })
    }

    async getValuesByFromAndToDate(fromDate, toDate) {
        const isValidDateTime = this.validateDateAndTime(fromDate, toDate);
        if (isValidDateTime) {
            fromDate.setDate(fromDate.getDate() - 1);
            toDate.setDate(toDate.getDate() + 1);
            const warrantyEntriesCurrentMonth = await this.data.getWarrantyEntriesByDateSelection(fromDate.toISOString(),toDate.toISOString());

            if (warrantyEntriesCurrentMonth.length === 0 || warrantyEntriesCurrentMonth.length === undefined) {
                return {
                    message: "No entries found"
                }
            } else {
                this.formatAndSort(warrantyEntriesCurrentMonth);
                this.view.renderList(warrantyEntriesCurrentMonth);
                return {
                    message: ""
                }
            }
        } else {
            return {
             message: "invalid date selection"
            }
        }
    }

    validateDateAndTime(fromDate, toDate){
        if (    (fromDate === undefined)
            ||  !(fromDate instanceof Date)){
            return false;

        } else return !((toDate === undefined)
            || !(toDate instanceof Date));
    }

    async postWarrantyEntry(warrantyEntry) {
        try {
            await this.data.addWarrantyEntry(warrantyEntry);
        } catch (e) {
            if ( e.msg ){
                this.view.renderError(e.msg);
            } else {
                console.log(e);
            }
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
            if ( e.msg ){
                this.view.renderError(e.msg);
            } else {
                console.log(e);
            }
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