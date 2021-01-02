export default class View {

    constructor(actionBarRootSelector, warrantyTableRootSelector, graph) {
        this.graph = graph;
        this.graph.createTrend(0);
        this.table = document.querySelector(warrantyTableRootSelector + ' .warranty-table');
        this.tableTitles = document.querySelector(warrantyTableRootSelector + ' thead');
    }

    createTrend(warrantyEntries) {
        this.charts.createTrend(warrantyEntries);
    }

    renderList(warrantyEntries) {
        this.tableTitles.appendChild(this.renderColumnTitles());
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
        const customerTitle = this.renderTitle("Costumer");
        const dateTitle = this.renderTitle("Date");
        const contactTitle = this.renderTitle("Customer Contact");
        const machineTitle = this.renderTitle("Machine Nr.");
        const issueTitle = this.renderTitle("Issue");
        const employeeTitle = this.renderTitle("Employee");
        const timeTitle = this.renderTitle("Spend Time");

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

    updateTrend(warrantyEntries) {
        this.charts.updateTrend(warrantyEntries);
    }
}