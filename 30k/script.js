const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const cheerio = require("cheerio");
let options = new chrome.Options();
options.addArguments('--headless'); // Run in headless mode
options.addArguments('--window-size=1200,800'); // Set the window size (viewport size)


let email = 'rudragupta810@gmail.com';
let username = "@Sun30337264";
let password = "!getGFby2022";
let responseArray = [];
async function fillInputField(driver, className, text) {
  let inputField = await driver.findElement(By.className(className));
  await inputField.sendKeys(text);
}

async function clickDiv(driver, className) {
  let div = await driver.findElement(By.className(className));
  await div.click();
}

(async function openChrome() {
  let service = new chrome.ServiceBuilder();
  let driver = new Builder().forBrowser('chrome').setChromeOptions(options).setChromeService(service).build();
  try {
    await driver.get('https://x.com/i/flow/login');

    // Maximize the browser window
    await driver.manage().window().maximize()

    // Wait for the email input field to be present and fill it
    await driver.wait(until.elementLocated(By.className('r-30o5oe')), 10000);
    await fillInputField(driver, 'r-30o5oe', email);
console.log("Filling Email Fields")
    // Wait for the next button to be clickable and click it
    await driver.wait(until.elementIsVisible(driver.findElement(By.className("css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-ywje51 r-184id4b r-13qz1uu r-2yi16 r-1qi8awa r-3pj75a r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"))), 10000);
    await clickDiv(driver, "css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-ywje51 r-184id4b r-13qz1uu r-2yi16 r-1qi8awa r-3pj75a r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l");
console.log("Authenticating you in the process")
    const inp = "r-30o5oe r-1dz5y72 r-13qz1uu r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-fdjqy7";
    await driver.wait(until.elementLocated(By.className(inp)), 10000);
    await fillInputField(driver, inp, username);
console.log("Authenticating you in the process")
    await driver.wait(until.elementIsVisible(driver.findElement(By.className("css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-19yznuf r-64el8z r-1fkl15p r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"))), 10000);
    await clickDiv(driver, "css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-19yznuf r-64el8z r-1fkl15p r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l");
console.log("Authenticating you in the process")
    await driver.wait(until.elementLocated(By.className("r-30o5oe r-1dz5y72 r-13qz1uu r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-fdjqy7")), 10000);
    await fillInputField(driver, "r-30o5oe r-1dz5y72 r-13qz1uu r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-fdjqy7", password);
console.log("Authenticating you in the process")

    await driver.wait(until.elementIsVisible(driver.findElement(By.className("css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-19yznuf r-64el8z r-1fkl15p r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"))), 10000);
    await clickDiv(driver, "css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-19yznuf r-64el8z r-1fkl15p r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l");
console.log("Authenticatiion Completed")
console.log("Fetching resources")
    while (responseArray.length != 5) {
      const pageSource = await driver.getPageSource();
      const $ = cheerio.load(pageSource);
      let count = 0;
    
      const targetClass = 'r-poiln3';
      const elements = $(`.${targetClass}`);
      
      elements.each(function (index, element) {
        console.log(responseArray)
        if (count === 1) {
          if (!responseArray.includes($(element).text().toString())) {
            responseArray.push($(element).text().toString());
          }

        }
        if (responseArray.length === 6) {
          return false;
        }
        if ($(element).text().includes("Trending")) {
          count++;
        } else {
          count = 0;
        }
      });  

    }
    console.log(responseArray)
    await driver.sleep(5000);
    await driver.sleep(100000);
  } finally {
    await driver.quit();
  }
})();
