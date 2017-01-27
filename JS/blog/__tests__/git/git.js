require('dotenv').config({
    path: `${__dirname}/../../.env`
});
const git = require(`${__dirname}/../../modules/git`);
describe("Git Module", () => {
    it('should return the file when calling github api for a particular file', () => {
        return git.getFile("matteo-hertel", "blog", "master", "README.md").then((file) => {
            expect(file).not.toBeFalsy();
        });
    });
});
