const insta = require('./insta');

(async () => {

    await insta.initialize();
    await insta.login('', '');

})();