export default class View {

    constructor(actionBarRootSelector, warrantyTableRootSelector, graph, popup) {
        this.popup = popup;
        this.graph = graph;
        this.graph.createTrend();
        this.configureDatepicker(actionBarRootSelector);
        this.table = document.querySelector(warrantyTableRootSelector + ' .warranty-table');
        this.tableTitles = document.querySelector(warrantyTableRootSelector + ' thead');
        this.tableTitles.appendChild(this.renderColumnTitles());
        this.addRefreshEventListener(document.querySelector("#update-table"));
    }

    configureDatepicker(rootSelector) {
        let datePickerFrom = flatpickr(rootSelector + " #fromDate", {
            enableTime: true,
            time_24hr: true,
            "maxDate": new Date().fp_incr(0),
            dateFormat: "d.m.Y",
            onClose: (selectedDates, dateStr, instance) => {
                datePickerTo.set('minDate', dateStr)
                this.dateFrom = selectedDates[0]
            }
        });

        let datePickerTo = flatpickr(rootSelector + " #toDate", {
            enableTime: true,
            "maxDate": new Date().fp_incr(0),
            time_24hr: true,
            dateFormat: "d.m.Y",
            onClose: (selectedDates, dateStr, instance) => {
                datePickerFrom.set('maxDate', dateStr)
                this.dateTo = selectedDates[0]
            }
        });
    }

    addRefreshEventListener(button) {
        button.addEventListener('click', async (evt) => {
            const result = await this.onRefreshHandler(this.dateFrom, this.dateTo);
            if (result.message !== "") {
                alert(result.message);
            }
        })
    }

    registerRefreshHandler(onRefreshHandler) {
        this.onRefreshHandler = onRefreshHandler;
    }

    updateTrend(months, workingHoursPerMonths) {
       this.graph.updateTrend(months, workingHoursPerMonths);
    }

    renderList(warrantyEntries) {
        while (this.table.firstChild) {
            this.table.removeChild(this.table.firstChild);
        }
        warrantyEntries.map(entry => this.table.appendChild(this.renderWarrantyEntry(entry)));
    }

    renderWarrantyEntry(warrantyEntry) {
        const entry = document.createElement("tr");
        const date = this.renderEntry(warrantyEntry.date_);
        const customer = this.renderEntry(warrantyEntry.customer);
        const contact = this.renderEntry(warrantyEntry.contact);
        const machine = this.renderEntry(warrantyEntry.machine);
        const issue = this.renderEntry(warrantyEntry.issue);
        const employee = this.renderEntry(warrantyEntry.employee);
        const spendTime = this.renderEntry(warrantyEntry.time_);

        entry.innerHTML = date + customer + contact + machine + issue + employee + spendTime;
        entry.className = "table-entry";
        return entry;
    }

    renderColumnTitles() {
        const titles = document.createElement("tr");
        const customerTitle = this.renderTitle("Customer");
        const dateTitle = this.renderTitle("Date");
        const contactTitle = this.renderTitle("Customer Contact");
        const machineTitle = this.renderTitle("Machine No.");
        const issueTitle = this.renderTitle("Issue");
        const employeeTitle = this.renderTitle("Employee");
        const timeTitle = this.renderTitle("Time Spent");

        titles.innerHTML = dateTitle + customerTitle + contactTitle + machineTitle + issueTitle + employeeTitle + timeTitle;
        titles.className = "column-titles";
        return titles;
    }

    renderTitle(title) {
        return `<th>${title}</th>`;
    }

    renderEntry(entry) {
        return `<td>${entry}</td>`;
    }

    renderError(errorMessage){
        window.alert(errorMessage);
    }
}