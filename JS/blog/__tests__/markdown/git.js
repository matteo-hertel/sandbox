require('dotenv').config({
    path: `${__dirname}/../../.env`
});
const git = require(`${__dirname}/../../modules/git`);

test('calling github api for a particular file should return the file', () => {
    git.getFile("matteo-hertel", "blog", "master", "Readme.md").then((file) => {
        console.log(file);
        //expect(file).not().toBeFalsy();
    });
});
