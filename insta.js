const puppeteer = require('puppeteer');

const BASE_URL = 'https://instagram.com/';

const instagram = {
    browser: null,
    page: null,

    initialize: async () => {
        instagram.browser = await puppeteer.launch({
            headless: false
        });

        instagram.page = await instagram.browser.newPage();
    },

    bot: async(username, password, POST_URL, comment) => {
        

        try {

            await instagram.page.goto(BASE_URL, {waitUntil: 'domcontentloaded'} );

            await instagram.page.waitForSelector('input[name="username"]');
            await instagram.page.type('input[name="username"]', username, {delay: 50});
            
            await instagram.page.waitForSelector('input[name="password"]');
            await instagram.page.type('input[name="password"]', password, {delay: 50});

            await instagram.page.waitFor(1000);
            await instagram.page.keyboard.press('Enter');
            

            await instagram.page.waitForNavigation({ waitUntil: 'domcontentloaded'});
            await instagram.page.goto(POST_URL, {waitUntil: 'load'});



            await instagram.page.$x('//*[@id="react-root"]/section/main/div/div[1]/article/div[1]/div/div/div[2]');
            const elements = await instagram.page.$x('//*[@id="react-root"]/section/main/div/div[1]/article/div[1]/div/div/div[2]');
            await elements[0].click({ clickCount: 2 });

            var x = 0;
            
            for(var i = 0; i < 30; i++) {
                for(var j = 0; j < 4; j++){
                    await instagram.page.waitForSelector('#react-root > section > main > div > div.ltEKP > article > div.eo2As > section.sH9wk._JgwE > div > form > textarea');
                    await instagram.page.type('#react-root > section > main > div > div.ltEKP > article > div.eo2As > section.sH9wk._JgwE > div > form > textarea', comment, {delay: 50});
                    await instagram.page.waitFor(1000);
                    await instagram.page.keyboard.press('Enter');

                    await instagram.page.waitFor(1000);
                    await instagram.page.waitForSelector('#react-root > section > main > div > div.ltEKP > article > div.eo2As > section.sH9wk._JgwE > div > form > button');
                    await instagram.page.click('#react-root > section > main > div > div.ltEKP > article > div.eo2As > section.sH9wk._JgwE > div > form > button' , {clickCount: 1});
                    
                    await instagram.page.waitFor(3000);
                    x++;
                }
                await instagram.page.reload([{timeout: 0}, {waitUntil: 'load'}])
                console.log( x + ' comments');
                await instagram.page.waitFor(2000 * 60);
            }
            
            instagram.page.close();

        }
        catch(e) {
            console.log(e);
        }

    },

}

module.exports = instagram;