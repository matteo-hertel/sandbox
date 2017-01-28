require('dotenv').config({
    path: `${__dirname}/../../.env`
});
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const git = require(`${__dirname}/../../modules/git`);
describe("Git Module", () => {
    it('should return the file when calling github api for a particular file', () => {
        jest.resetModules();
        return git.getFile("matteo-hertel", "blog", "master", "README.md").then((file) => {
            expect(file).not.toBeFalsy();
        });
    });

    it('should throw an error if an error occurres while getting a file', () => {
        jest.resetModules();
        git.getFile("matteo-hertel", "blog", "does-not-exists-file", "README.md")
            .catch((exc) => {
                expect(exc).toBeDefined();
            });
    });

    it('should return an array of files if a folder path is passed', () => {
        jest.resetModules();
        return git.getFolder("matteo-hertel", "blog", "master", "posts")
            .then((files) => {
                expect(files.length).toBeTruthy();
            });
    });

    it('should throw an error if an error occurres while getting a folder', () => {
        jest.resetModules();
        git.getFolder("matteo-hertel", "blog", "does-not-exists-folder", "error")
        .catch((exc) => {
            expect(exc).toBeDefined();
        });
    });
});
