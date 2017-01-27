require('dotenv').config({
    path: `${__dirname}/../../.env`
});
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const git = require(`${__dirname}/../../modules/git`);
describe("Git Module", () => {
    it('should return the file when calling github api for a particular file', () => {
        return git.getFile("matteo-hertel", "blog", "master", "README.md").then((file) => {
            expect(file).not.toBeFalsy();
        });
    });

    it('should throw an error if an error occurres while getting a file', () => {
        expect(git.getFile("matteo-hertel", "blog", "does-not-exists", "README.md")).toThrow();
    });

    it('should return an array of files if a folder path is passed', () => {
        return git.getFolder("matteo-hertel", "blog", "master", "posts")
        .then((files) => {
            expect(files.length).toBeTruthy();
        });
    });

    it('should throw an error if an error occurres while getting a folder', () => {
        expect(git.getFolder("matteo-hertel", "blog", "does-not-exists", "error")).toThrow();
    });
});
