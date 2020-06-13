const insta = require('./insta');
const reader = require('readline-sync'); //npm install readline-sync

(async () => {

    let username = reader.question('Username: ');
    const password = reader.question('Password: ',{ hideEchoBack: true });

    let url = reader.question('Url post: ');
    let comments = reader.question('Tag friends: Ex @user ');
    
    await insta.initialize();
    await insta.bot(username, password, url, comments);

})();