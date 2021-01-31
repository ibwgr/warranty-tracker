import { eventHandler, event_create_entry, event_delete_entry } from './event.js'

export default class Controller {

    constructor(view, data) {
        this.view = view;
        this.data = data;

        view.registerRefreshHandler((fromDate, toDate) => {
            return this.getValuesByFromAndToDate(fromDate,toDate);
        })

        this.postWarrantyEntry = this.postWarrantyEntry.bind(this);
        this.deleteWarrantyEntry = this.deleteWarrantyEntry.bind(this);
        eventHandler.addEventListener(event_create_entry, this.postWarrantyEntry);
        eventHandler.addEventListener(event_delete_entry, this.deleteWarrantyEntry);
    }

    async getValuesByFromAndToDate(fromDate, toDate) {
        const isValidDateTime = this.validateDateAndTime(fromDate, toDate);
        if (isValidDateTime) {
            let from = new Date(fromDate);
            from.setHours(1);

            let to = new Date(toDate);
            to.setHours(24);

            const warrantyEntriesCurrentMonth = await this.data.getWarrantyEntriesByDateSelection(from.toISOString(),to.toISOString());

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
            await this.data.addWarrantyEntry(warrantyEntry.detail);
            await this.loadAndRender();
        } catch (e) {
            if ( e.msg ){
                this.view.renderError(e.msg);
            } else {
                console.log(e);
            }
        }
    }

    async deleteWarrantyEntry(warrantyEntryID) {
        try {
            await this.data.deleteWarrantyEntry(warrantyEntryID.detail);
            await this.loadAndRender();
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
        /*
        set day of the date to the middle of the month
        - this ensures to have a valid day for every month
        - date is only used to evaluate the names of the last twelve months
         */
        date.setDate(15);
        const workingHoursPerMonths = [];
        const lastTwelveMonths = [];

        for (let i = 0; i < 12; i++){
            lastTwelveMonths.push(this.getMonthNameAndYear(date));

            workingHoursPerMonths.push(entries
                .filter(entry => new Date(entry.date_).getMonth() === date.getMonth())
                .reduce((totalWorkingHours, entry) => {
                    const time = entry.time_.split(":");
                    const hours = parseInt(time[0]);
                    const minutes = parseInt(time[1]);
                    return totalWorkingHours+  ( hours + (minutes / 60));
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
