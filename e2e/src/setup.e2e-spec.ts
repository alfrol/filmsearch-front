import {browser} from 'protractor';
beforeEach(() => {
  browser.waitForAngularEnabled();
  browser.driver.manage().window().maximize();
});
