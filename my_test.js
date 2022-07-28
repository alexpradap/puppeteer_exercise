const puppeteer = require('puppeteer');
var assert = require('assert');

var url = "https://devsavant.ai/";
var selector = "h2.uagb-heading-text";

(async () => {
    var browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    page.setViewport({width: 1280, height: 800, deviceScaleFactor: 1});
    await page.goto(url, {waitUntil: 'domcontentloaded'});

    var title = await page.evaluate(selector => {
        const element = document.querySelectorAll(selector)[0];
        if (!element)
            return null;

        return element.innerText
    }, selector);

    browser.close();

    assert(title == "WELCOME TO DEVSAVANT", "Incorrect title text");
})();