import { eventHandler, event_delete_entry } from './event.js';
import he from 'he';

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
            enableTime: false,
            time_24hr: false,
            "maxDate": new Date().fp_incr(0),
            dateFormat: "d.m.Y",
            onClose: (selectedDates, dateStr, instance) => {
                datePickerTo.set('minDate', dateStr)
                this.dateFrom = selectedDates[0]
            }
        });

        let datePickerTo = flatpickr(rootSelector + " #toDate", {
            enableTime: false,
            "maxDate": new Date().fp_incr(0),
            time_24hr: false,
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
        const deleteEntry = this.renderDeleteButton(warrantyEntry.id);

        entry.innerHTML = date + customer + contact + machine + issue + employee + spendTime + deleteEntry;
        entry.className = "table-entry";
        entry.id = "table-entry-" + warrantyEntry.id;
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
        return `<th>${he.encode(title)}</th>`;
    }

    renderEntry(entry) {
        return `<td>${he.encode(entry)}</td>`;
    }

    renderDeleteButton(id){
        return `<td>
                    <button id=${id} class="delete-entry">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>
                    </button>
                </td>`;
    }

    addEventListenerToDeleteButtons() {
        document.querySelectorAll('.delete-entry').forEach(button => {
            button.addEventListener('click', () => {
                eventHandler.fireEvent(event_delete_entry, { id: button.id });
            });
        });
    }

    renderError(errorMessage) {
        window.alert(errorMessage);
    }

    removeEntry(id){
        const entry = document.querySelector('#table-entry-' + id);
        this.table.removeChild(entry);
    }

}