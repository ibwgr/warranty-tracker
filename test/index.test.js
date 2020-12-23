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
            const pageTitle = await page.getPageTitle()
            await assert.equal(pageTitle, 'Warranty-Tracker')
        })
    })
})
