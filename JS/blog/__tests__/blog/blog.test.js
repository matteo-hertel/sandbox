require('dotenv').config({
    path: `${__dirname}/../../.env`
});
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
const blog = require(`${__dirname}/../../modules/blog`);

describe("Blog Module", () => {
    it('should return a storable payload for a given file', () => {
        return blog.getStorable("test/2017-01-27_test-post-seo.md")
        .then((data) => {
            expect(data.name).toBeDefined();
            expect(data.seo).toBeDefined();
            expect(data.body).toBeDefined();
            expect(data.createdDate).toBeDefined();
            expect(data.updatedDate).toBeDefined();
        });
    });
});
