const insta = require('./insta');

(async () => {

    const USER_NAME = 'dbrno';
    const PASSWORD = 'brenobrl';
    await insta.initialize();
    await insta.login(USER_NAME, PASSWORD);

})();