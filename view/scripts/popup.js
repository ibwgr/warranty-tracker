export default class Popup {

    constructor() {
        this.createEntryButton = document.getElementById('create-entry')
        this.popup = document.querySelector('#popup')
        this.plane = document.querySelector('#plane')
        this.createEntryButton.addEventListener('click', () => {
            this.popup.style = 'display: grid'
            this.plane.style = 'display: block'
        });
    }

}
/*
this.createEntryButton.addEventListener('click', () => {
    this.popup.style = 'display: flex'
});*/

