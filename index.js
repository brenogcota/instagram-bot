const insta = require('./insta');

(async () => {

    const USER_NAME = '';
    const PASSWORD = '';
    await insta.initialize();
    await insta.login(USER_NAME, PASSWORD);

})();