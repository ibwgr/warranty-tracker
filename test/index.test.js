import {until,Key} from 'selenium-webdriver'
import {describe, it, beforeEach, after} from 'mocha'


import init from './selenium.helper'
const {driver, config, assert} = init()

import Index from './index.po'
const page = new Index(driver, config.target)

describe('Index', () => {

    beforeEach(async () => {
        await page.gotoIndex()
    })

    after(async () => {
        await driver.quit()
    })

    xit('should show content title', async () => {
        await driver.wait(until.elementLocated(page.contentTitleSelector()))
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
            await driver.wait(until.elementLocated(page.navigateToIndexPageSelector()));

            const url = await page.getCurrentUrl()
            const current = url.split('/').pop()

            await assert.equal(current, 'index.html');
        })

        it('link to index page should be active class', async () => {
            await driver.wait(until.elementLocated(page.navigateToIndexPageSelector()));

            const actualClass = await driver.findElement(page.navigateToIndexPageSelector()).getAttribute('class')

            await assert.equal(actualClass, 'active');
        })
    })
})
