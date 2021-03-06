import webdriver from 'selenium-webdriver';
const {By} = webdriver;

export default class Index {

    constructor(driver, url) {
        this.driver = driver;
        this.url = url;
    }

    gotoIndex() {
        return this.driver.navigate().to(this.url);
    }

    getCurrentUrl() {
        return this.driver.getCurrentUrl();
    }

    getPageTitle() {
        return this.driver.getTitle();
    }

    contentTitleSelector() {
        return By.css('.title');
    }

    navigateToIndexPage() {
        return this.driver.findElement(this.navigateToIndexPageSelector());
    }

    navigateToIndexPageSelector() {
        return By.id('linkToIndexPage');
    }

    buttonCreateEntrySelector() {
        return By.css('#create-entry');
    }

    popupSelector() {
        return By.id('popup');
    }

    planeSelector() {
        return By.id('plane');
    }

    machineEntrySelector() {
        return By.id('machine');
    }

    customerEntrySelector() {
        return By.id('customer');
    }

    contactEntrySelector() {
        return By.id('contact');
    }

    issueEntrySelector() {
        return By.id('issue');
    }

    employeeEntrySelector() {
        return By.id('employee');
    }

    dateEntrySelector() {
        return By.id('choose-date');
    }

    calendarDaySelector() {
        return By.css(`.today`);
    }

    timeEntrySelector() {
        return By.id('time-spend');
    }

    timeOptionSelector(optionSelector) {
        return By.css(`#time-spend > option:nth-child(${optionSelector})`);
    }

    buttonExitSelector() {
        return By.id('exit');
    }

    buttonConfirmSelector() {
        return By.id('confirm');
    }

    warrantyTableEntrySelector() {
        return By.css('.table-entry');
    }

    fromDateEntrySelector() {
        return By.id('fromDate');
    }

    toDateEntrySelector() {
        return By.id('toDate');
    }

    datepickerMonthSelector() {
        return By.css('span.cur-month');
    }
        
    warrantyTableDeleteButtonSelector() {
        return By.css('.delete-entry');
    }

}
