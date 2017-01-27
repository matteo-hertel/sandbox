require('dotenv').config({
    path: `${__dirname}/../../.env`
});
const blog = require(`${__dirname}/../../modules/blog`);

describe("Blog", () => {
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
