import { eventHandler, event_create_entry } from './event.js';

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
        this.time = document.querySelector('#time-spend');
        this.date = '';

        flatpickr( '#choose-date', {
            enableTime: false,
            time_24hr: false,
            "maxDate": new Date().fp_incr(0),
            dateFormat: "d.m.Y",
            onClose: (selectedDates) => {
                this.date = selectedDates[0];
            }
        })

        this.createEntryButton.addEventListener('click', () => {
            this.displayPopupAndPlane();
        })

        this.exitButton.addEventListener('click', () => {
            this.displayPopupAndPlane();
        })

        this.confirmButton.addEventListener('click', () => {
            const insufficientEntry = this.validateEntryData();
            if (insufficientEntry) {
                alert('At least machine, employee, date and time inputs must be made');
                return;
            }
            eventHandler.fireEvent(event_create_entry, this.getWarrantyEntry());
            this.displayPopupAndPlane();
        })

        this.createTimeOptions();
    }

    displayPopupAndPlane() {
        this.popup.style.display === 'none' ? this.popup.style.display = 'grid' : this.popup.style.display = 'none';
        this.plane.style.display === 'none' ? this.plane.style.display = 'block' : this.plane.style.display = 'none';
    }

    createTimeOptions() {
        for (let hour = 0; hour <= 12; hour += 1) {
            for (let minute = 0; minute <= 45; minute += 15) {
                if (!(hour === 12 && minute >= 15)) {
                    const option = document.createElement('option');
                    minute !== 0 ? option.textContent = `${hour}h ${minute}min` : option.textContent = `${hour}h ${minute}0min`;
                    minute !== 0 ? option.value = `${hour}:${minute}` : option.value = `${hour}:${minute}0`;
                    this.time.appendChild(option);
                }
            }
        }
    }

    getWarrantyEntry() {
        this.addOneHourToUTCTimezone();
        return {
            date_: this.date.toISOString().split("T")[0],
            machine: this.machine.value,
            customer: this.customer.value,
            contact: this.contact.value,
            issue: this.issue.value,
            employee: this.employee.value,
            time_: this.time.value
        };
    }

    validateEntryData() {
        return ([this.machine.value, this.employee.value, this.date.value, this.time.value].includes(''));
    }

    addOneHourToUTCTimezone(){
         this.date.setHours(this.date.getHours() + 1);
    }

}

