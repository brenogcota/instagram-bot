const puppeteer = require('puppeteer');

const BASE_URL = "https://instagram.com/";
const POST_URL = "https://www.instagram.com/p/CBEytiJFJhj/";

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

            await instagram.page.waitForSelector('input[name="username"]');
            await instagram.page.type('input[name="username"]', username, {delay: 50});
            
            await instagram.page.waitForSelector('input[name="password"]');
            await instagram.page.type('input[name="password"]', password, {delay: 50});

            await instagram.page.waitFor(1000);
            await instagram.page.keyboard.press('Enter');
            

            await instagram.page.waitForNavigation({ waitUntil: 'networkidle2'});
            await instagram.page.goto(POST_URL, {waitUntil: 'load'});


            await instagram.page.waitForSelector('#react-root > section > main > div > div.ltEKP > article > div._97aPb.wKWK0 > div > div > div.KL4Bh > img');
            await instagram.page.click('#react-root > section > main > div > div.ltEKP > article > div._97aPb.wKWK0 > div > div > div.KL4Bh > img' , {clickCount: 2});
            
            const comment = '@gc_karol @je_goncalvees @jeansousa7 ';
            await instagram.page.waitForSelector('#react-root > section > main > div > div.ltEKP > article > div.eo2As > section.sH9wk._JgwE > div > form > textarea');

            for(var i = 0; i < 10; i++) {
                for(var j = 0; j < 4; j++){
                    await instagram.page.type('#react-root > section > main > div > div.ltEKP > article > div.eo2As > section.sH9wk._JgwE > div > form > textarea', comment, {delay: 50});
                    await instagram.page.waitFor(500);
                    await instagram.page.keyboard.press('Enter');
    
                    await instagram.page.waitFor(3000);
                }
                await instagram.page.reload([{timeout: 0}, {waitUntil: 'load'}])
                await instagram.page.waitFor(3000 * 60);
            }
            
            instagram.page.close();

        }
        catch(e) {
            console.log(e);
        }

    },

}

module.exports = instagram;