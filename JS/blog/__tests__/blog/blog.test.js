require('dotenv').config({
    path: `${__dirname}/../../.env`
});
const blog = require(`${__dirname}/../../modules/blog`);

describe("Blog", () => {
    it('should return a storable payload for a given file', () => {
        return blog.getStorable("test/2017-01-27_test-post-seo.md")
        .then((payload) => {
            expect(payoad.name).toBeDefined();
            expect(payoad.seo).toBeDefined();
            expect(payoad.body).toBeDefined();
            expect(payoad.createdDate).toBeDefined();
            expect(payoad.updatedDate).toBeDefined();
        });
    });
});
