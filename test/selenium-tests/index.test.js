import {until,Key} from 'selenium-webdriver';
import {describe, it, beforeEach, after} from 'mocha';

import init from './selenium.helper';
const {driver, config, assert} = init();

import Index from './index.po';
const page = new Index(driver, config.target);

describe('Index', () => {

    beforeEach(async () => {
        await page.gotoIndex();
    })

    after(async () => {
        await driver.quit();
    })

    describe('page title', () => {

        it('should equal application title', async () => {
            await driver.wait(until.elementLocated(page.contentTitleSelector()));
            const pageTitle = await page.getPageTitle();
            await assert.equal(pageTitle, 'Warranty-Tracker');
        })
    })

    describe('navigation', () => {

        it('should open index page', async () => {
            await driver.wait(until.elementLocated(page.navigateToIndexPageSelector()));
            await page.navigateToIndexPage().sendKeys(Key.ENTER);

            const url = await page.getCurrentUrl();
            const current = url.split('/').pop();

            await assert.equal(current, '');
        })

        it('link to index page should be active class', async () => {
            await driver.wait(until.elementLocated(page.navigateToIndexPageSelector()));

            const actualClass = await driver.findElement(page.navigateToIndexPageSelector()).getAttribute('class');

            await assert.equal(actualClass, 'active');
        })
    })

    describe('popup', () => {

        it('should open popup and plane', async () => {
            await driver.wait(until.elementLocated(page.buttonCreateEntrySelector()));
            await driver.findElement(page.buttonCreateEntrySelector()).click();

            await driver.wait(until.elementLocated(page.popupSelector()));
            await driver.wait(until.elementLocated(page.planeSelector()));
            const popupDisplay = await driver.findElement(page.popupSelector()).getCssValue('display');
            const planeDisplay = await driver.findElement(page.planeSelector()).getCssValue('display');

            await assert.equal(popupDisplay, 'grid');
            await assert.equal(planeDisplay, 'block');
        })

        it('should exit popup and plane', async () => {
            await driver.wait(until.elementLocated(page.buttonCreateEntrySelector()));
            await driver.findElement(page.buttonCreateEntrySelector()).click();

            await driver.wait(until.elementLocated(page.buttonExitSelector()));
            await driver.wait(until.elementLocated(page.popupSelector()));
            await driver.wait(until.elementLocated(page.planeSelector()));

            await driver.findElement(page.buttonExitSelector()).click();
            const popupDisplay = await driver.findElement(page.popupSelector()).getCssValue('display');
            const planeDisplay = await driver.findElement(page.planeSelector()).getCssValue('display');

            await assert.equal(popupDisplay, 'none');
            await assert.equal(planeDisplay, 'none');
        })

        it('entry data on the left part should be taken over', async () => {
           await driver.wait(until.elementLocated(page.buttonCreateEntrySelector()));
           await driver.findElement(page.buttonCreateEntrySelector()).click();

           await driver.wait(until.elementLocated(page.machineEntrySelector()));
           await driver.wait(until.elementLocated(page.customerEntrySelector()));
           await driver.wait(until.elementLocated(page.contactEntrySelector()));
           await driver.wait(until.elementLocated(page.issueEntrySelector()));
           await driver.wait(until.elementLocated(page.employeeEntrySelector()));

           await driver.findElement(page.machineEntrySelector()).sendKeys('machine');
           await driver.findElement(page.customerEntrySelector()).sendKeys('customer');
           await driver.findElement(page.contactEntrySelector()).sendKeys('contact');
           await driver.findElement(page.issueEntrySelector()).sendKeys('issue');
           await driver.findElement(page.employeeEntrySelector()).sendKeys('employee');

           const machineEntry = await driver.findElement(page.machineEntrySelector()).getAttribute('value');
           const customerEntry = await driver.findElement(page.customerEntrySelector()).getAttribute('value');
           const contactEntry = await driver.findElement(page.contactEntrySelector()).getAttribute('value');
           const issueEntry = await driver.findElement(page.issueEntrySelector()).getAttribute('value');
           const employeeEntry = await driver.findElement(page.employeeEntrySelector()).getAttribute('value');

           assert.equal(machineEntry, 'machine');
           assert.equal(customerEntry, 'customer');
           assert.equal(contactEntry, 'contact');
           assert.equal(issueEntry, 'issue');
           assert.equal(employeeEntry, 'employee');
        })

        it('entry data on the right part should be taken over', async () => {
           await driver.wait(until.elementLocated(page.buttonCreateEntrySelector()));
           await driver.findElement(page.buttonCreateEntrySelector()).click();

           await driver.wait(until.elementLocated(page.dateEntrySelector()));
           await driver.wait(until.elementLocated(page.timeEntrySelector()));

            await driver.findElement(page.dateEntrySelector()).click();
            await driver.findElement(page.calendarDaySelector()).click();
            const dateEntry = await driver.findElement(page.dateEntrySelector()).getAttribute('value');

            await driver.findElement(page.timeOptionSelector(4)).click();
            const timeEntry = await driver.findElement(page.timeEntrySelector()).getAttribute('value');

            assert.notEqual(dateEntry, '');
            assert.equal(timeEntry, '0:45');
        })

        it('should alert if machine, employee, date or time is not entered', async () => {
            await driver.wait(until.elementLocated(page.buttonCreateEntrySelector()));
            await driver.findElement(page.buttonCreateEntrySelector()).click();

            await driver.wait(until.elementLocated(page.buttonConfirmSelector()));
            await driver.findElement(page.buttonConfirmSelector()).click();

            await driver.wait(until.alertIsPresent());
            const alertMessage = await driver.switchTo().alert().getText();
            await driver.switchTo().alert().accept();

            assert.equal(alertMessage, 'At least machine, employee, date and time inputs must be made');
        })

        it('entry data should be taken over to table after confirmation', async () => {
            // it's needed to add an entry in case of an empty table
            await driver.wait(until.elementLocated(page.buttonCreateEntrySelector()));
            await driver.findElement(page.buttonCreateEntrySelector()).click();

            await driver.wait(until.elementLocated(page.machineEntrySelector()));
            await driver.wait(until.elementLocated(page.employeeEntrySelector()));
            await driver.wait(until.elementLocated(page.dateEntrySelector()));
            await driver.wait(until.elementLocated(page.timeEntrySelector()));
            await driver.wait(until.elementLocated(page.buttonConfirmSelector()));

            await driver.findElement(page.machineEntrySelector()).sendKeys('machine');
            await driver.findElement(page.employeeEntrySelector()).sendKeys('employee');
            await driver.findElement(page.dateEntrySelector()).click();
            await driver.findElement(page.calendarDaySelector()).click();
            await driver.findElement(page.timeOptionSelector(5)).click();
            await driver.findElement(page.buttonConfirmSelector()).click();

            // wait for page to reload with added entry
            await sleep(500);

            let amountOfWarrantyEntriesBeforeEntry = 0;
            await driver.wait(until.elementLocated(page.warrantyTableEntrySelector()));
            await driver.findElements(page.warrantyTableEntrySelector()).then(elements => amountOfWarrantyEntriesBeforeEntry = elements.length);

            await driver.wait(until.elementLocated(page.buttonCreateEntrySelector()));
            await driver.findElement(page.buttonCreateEntrySelector()).click();

            await driver.wait(until.elementLocated(page.machineEntrySelector()));
            await driver.wait(until.elementLocated(page.employeeEntrySelector()));
            await driver.wait(until.elementLocated(page.dateEntrySelector()));
            await driver.wait(until.elementLocated(page.timeEntrySelector()));
            await driver.wait(until.elementLocated(page.buttonConfirmSelector()));

            await driver.findElement(page.machineEntrySelector()).sendKeys('machine');
            await driver.findElement(page.employeeEntrySelector()).sendKeys('employee');
            await driver.findElement(page.dateEntrySelector()).click();
            await driver.findElement(page.calendarDaySelector()).click();
            await driver.findElement(page.timeOptionSelector(5)).click();
            await driver.findElement(page.buttonConfirmSelector()).click();

            // wait for page to reload with added entry
            await sleep(500);

            let amountOfWarrantyEntriesAfterEntry = 0;
            await driver.findElements(page.warrantyTableEntrySelector()).then(elements => amountOfWarrantyEntriesAfterEntry = elements.length);

            // delete created test entry again
            await driver.findElement(page.warrantyTableDeleteButtonSelector()).click();

            assert.equal(amountOfWarrantyEntriesAfterEntry, amountOfWarrantyEntriesBeforeEntry + 1);
        })
    })

    describe('datepicker', () => {

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        it('should open datepicker for from date entry with current month', async () => {
            await driver.wait(until.elementLocated(page.fromDateEntrySelector()));

            const date = new Date();

            await driver.findElement(page.fromDateEntrySelector()).click();
            driver.wait(until.elementLocated(page.datepickerMonthSelector()));
            const datepickerMonth = await driver.findElement(page.datepickerMonthSelector()).getAttribute("innerHTML");

            await assert.equal(datepickerMonth.toString().trim(), monthNames[date.getMonth()]);
        })

        it('should open datepicker for to date entry with current month', async () => {
            await driver.wait(until.elementLocated(page.toDateEntrySelector()));

            const date = new Date();

            await driver.findElement(page.toDateEntrySelector()).click();
            driver.wait(until.elementLocated(page.datepickerMonthSelector()));
            const datepickerMonth = await driver.findElement(page.datepickerMonthSelector()).getAttribute("innerHTML");

            await assert.equal(datepickerMonth.toString().trim(), monthNames[date.getMonth()]);
        })
    })

    describe('table of current month entries', () => {

        it('should delete entry', async () => {
            // it's needed to add an entry in case of an empty table
            await driver.wait(until.elementLocated(page.buttonCreateEntrySelector()));
            await driver.findElement(page.buttonCreateEntrySelector()).click();

            await driver.wait(until.elementLocated(page.machineEntrySelector()));
            await driver.wait(until.elementLocated(page.employeeEntrySelector()));
            await driver.wait(until.elementLocated(page.dateEntrySelector()));
            await driver.wait(until.elementLocated(page.timeEntrySelector()));
            await driver.wait(until.elementLocated(page.buttonConfirmSelector()));

            await driver.findElement(page.machineEntrySelector()).sendKeys('machine');
            await driver.findElement(page.employeeEntrySelector()).sendKeys('employee');
            await driver.findElement(page.dateEntrySelector()).click();
            await driver.findElement(page.calendarDaySelector()).click();
            await driver.findElement(page.timeOptionSelector(5)).click();
            await driver.findElement(page.buttonConfirmSelector()).click();

            // wait for page to reload with added entry
            await sleep(500);

            let amountOfWarrantyEntriesBeforeDeletion = 0;
            await driver.findElements(page.warrantyTableEntrySelector()).then(elements => amountOfWarrantyEntriesBeforeDeletion = elements.length);

            await driver.wait(until.elementLocated(page.warrantyTableDeleteButtonSelector()));
            await driver.findElement(page.warrantyTableDeleteButtonSelector()).click();

            // wait for page to reload without deleted entry
            await sleep(500);

            let amountOfWarrantyEntriesAfterDeletion = 0;
            await driver.findElements(page.warrantyTableEntrySelector()).then(elements => amountOfWarrantyEntriesAfterDeletion = elements.length);

            await assert.equal(amountOfWarrantyEntriesAfterDeletion, ( amountOfWarrantyEntriesBeforeDeletion - 1));
        })
    })
})


const sleep = timeout => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timeout)
    })
}
