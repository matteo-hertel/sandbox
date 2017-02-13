require('dotenv').config({
    path: `${__dirname}/../../.env`
});
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const webhook = require(`${__dirname}/../../modules/webhook`);
const git = require(`${__dirname}/../../modules/git`);

describe("Webhook Module", () => {
    it('should contain the pull request object', () => {
        return webhook.acceptValidPRs(require(`${__dirname}/../../mocks/webhooks/mergedPR.json`))
        .then((pr) => {
            expect(pr.id).toBeDefined();
        });
    });
    it('should return false if the pr object does not exitsts ', () => {
        return webhook.acceptValidPRs({})
        .catch((err)=>{
            expect(err).toBeFalsy();
        });
    });
});
