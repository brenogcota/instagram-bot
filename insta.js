const puppeteer = require('puppeteer');

const BASE_URL = "https://instagram.com/";

const instagram = {
    browser: null,
    page: null,

    initialize: async () => {
        instagram.browser = await puppeteer.launch({
            headless: false
        });

        instagram.page = await instagram.browser.newPage();
    },

    login: async(username, password) => {
        

        try {

            await instagram.page.goto(BASE_URL, {waitUntil: 'domcontentloaded'} );

            /*await instagram.page.waitFor(1000);

            let loginButton = await instagram.page.$x('//a[contains(text(), "Log in")]');
            await loginButton[0].click(); */

            //await instagram.page.waitForNavigation({ waitUntil: 'networkidle2'});

            await instagram.page.waitForSelector('input[name="username"]');
            await instagram.page.type('input[name="username"]', username, {delay: 50});

            await instagram.page.waitForSelector('input[name="password"]');
            await instagram.page.type('input[name="password"]', password, {delay: 50});

            /*let bntLogin = await instagram.page.$x('//div[contains(text(), "Log In")]');
            await bntLogin[0].click(); */

        }
        catch(e) {
            console.log(e);
        }

    }
}

module.exports = instagram;