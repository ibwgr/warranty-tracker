import { eventHandler, event_delete_entry } from './event.js'

export default class View {

    constructor(actionBarRootSelector, warrantyTableRootSelector, graph, popup) {
        this.popup = popup;
        this.graph = graph;
        this.graph.createTrend();
        this.table = document.querySelector(warrantyTableRootSelector + ' .warranty-table');
        this.tableTitles = document.querySelector(warrantyTableRootSelector + ' thead');
        this.tableTitles.appendChild(this.renderColumnTitles());
    }

    updateTrend(months, workingHoursPerMonths) {
       this.graph.updateTrend(months, workingHoursPerMonths);
    }

    renderList(warrantyEntries) {
        while (this.table.firstChild) {
            this.table.removeChild(this.table.firstChild);
        }
        warrantyEntries.map(entry => this.table.appendChild(this.renderWarrantyEntry(entry)));
        this.addEventListenerToDeleteButtons();
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
        const deleteEntry = this.renderEntry('<button id="delete-entry">&#215;</button>');

        entry.innerHTML = date + customer + contact + machine + issue + employee + spendTime + deleteEntry;
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
        const deleteTitle = this.renderTitle("");

        titles.innerHTML = dateTitle + customerTitle + contactTitle + machineTitle + issueTitle + employeeTitle + timeTitle + deleteTitle;
        titles.className = "column-titles";
        return titles;
    }

    renderTitle(title) {
        return `<th>${title}</th>`;
    }

    renderEntry(entry) {
        return `<td>${entry}</td>`;
    }

    addEventListenerToDeleteButtons() {
        document.querySelectorAll('#delete-entry').forEach(button => {
            button.addEventListener('click', () => {
                eventHandler.fireEvent(event_delete_entry, { id: '1' });
            });
        });
    }

    renderError(errorMessage) {
        window.alert(errorMessage);
    }

}