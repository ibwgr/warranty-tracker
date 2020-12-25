import webdriver from 'selenium-webdriver'
const {By} = webdriver

export default class Index{
    constructor(driver, url){
        this.driver = driver
        this.url = url
    }

    gotoIndex(){
        return this.driver.navigate().to(this.url)
    }

    getPageTitle(){
        return this.driver.getTitle()
    }

    contentTitleSelector(){
        return By.css('.title')
    }
}
