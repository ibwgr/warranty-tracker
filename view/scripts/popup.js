export default class Popup {

    constructor() {
        this.createEntryButton = document.querySelector('#create-entry');
        this.confirmButton = document.querySelector('#confirm');
        this.exitButton = document.querySelector('#exit');
        this.popup = document.querySelector('#popup');
        this.plane = document.querySelector('#plane');
        this.machine = document.querySelector('#machine');
        this.customer = document.querySelector('#customer');
        this.contact = document.querySelector('#contact');
        this.issue = document.querySelector('#issue');
        this.employee = document.querySelector('#employee');
        this.time = document.querySelector('#time-spend')

        this.createTimeOptions();

        this.createEntryButton.addEventListener('click', () => {
            this.popup.style = 'display: grid';
            this.plane.style = 'display: block';
        });

        this.exitButton.addEventListener('click', () => {
            this.popup.style = 'display: none';
            this.plane.style = 'display: none';
        });

        this.confirmButton.addEventListener('click', () => {
            this.getEntryData();
        });

/*        let datePicker = flatpickr( '#choose-date', {
            enableTime: true,
            time_24hr: true,
            "maxDate": new Date().fp_incr(0),
            dateFormat: "d.m.Y H:i",
            onClose: (selectedDates, dateStr, instance) => {
                datePickerTo.set('minDate', dateStr)
                this.dateFrom = selectedDates[0]
            }
        });*/
    }

    getEntryData() {
        const entryData = {
            machine: this.machine.value,
            customer: this.customer.value,
            contact: this.contact.value,
            issue: this.issue.value,
            employee: this.employee.value
        };
        console.log(entryData);
        return entryData;
    }

    createTimeOptions() {
        for (let i = 0; i <= 12; i += 0.25) {
            const option = document.createElement('option');
            option.textContent = `${i} h`;
            option.value = `${i};`
            this.time.appendChild(option);
        }
    }

}

