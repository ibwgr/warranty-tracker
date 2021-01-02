export default class View {

    constructor(actionBarRootSelector, warrantyTableRootSelector, graph) {
        this.tableRootSelector = warrantyTableRootSelector;
        this.graph = graph;
        this.graph.createTrend(0);
        this.table = document.querySelector(warrantyTableRootSelector + ' .warranty-table');
    }

    createTrend(warrantyEntries) {
        this.charts.createTrend(warrantyEntries);
    }

    renderList(warrantyEntries){
        warrantyEntries.map(entry => this.table.appendChild(this.renderWarrantyEntry(entry)));
        this.table.prepend(this.renderColumnTitles());
    }

    renderWarrantyEntry(warrantyEntry){
        const entry = document.createElement("tr");
        const date = this.renderColumn(warrantyEntry.date_);
        const customer = this.renderColumn(warrantyEntry.customer);
        const contact = this.renderColumn(warrantyEntry.contact);
        const machine = this.renderColumn(warrantyEntry.machine);
        const issue = this.renderColumn(warrantyEntry.issue);
        const employee = this.renderColumn(warrantyEntry.employee);
        const spendTime = this.renderColumn(warrantyEntry.time_);

        entry.innerHTML = date + customer + contact + machine + issue + employee + spendTime;
        entry.className = "table-entry";
        return entry;
    }

    renderColumnTitles(){
        const titles = document.createElement("tr");
        const customerTitle = this.renderColumn("Costumer");
        const dateTitle = this.renderColumn("Date");
        const contactTitle = this.renderColumn("Customer Contact");
        const machineTitle = this.renderColumn("Machine Nr.");
        const issueTitle = this.renderColumn("Issue");
        const employeeTitle = this.renderColumn("Employee");
        const timeTitle = this.renderColumn("Spend Time");

        titles.innerHTML = dateTitle + customerTitle + contactTitle + machineTitle + issueTitle + employeeTitle + timeTitle;
        titles.className = "column-titles";
        return titles;
    }

    renderColumn(entry){
        return `<td>${entry}</td>`;
    }

    updateTrend(warrantyEntries) {
        this.charts.updateTrend(warrantyEntries);
    }

}