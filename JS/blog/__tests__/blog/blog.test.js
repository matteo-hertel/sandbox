require('dotenv').config({
    path: `${__dirname}/../../.env`
});
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
const blog = require(`${__dirname}/../../modules/blog`);

describe("Blog Module", () => {
    it("should return a list of storable payloads on re-index", ()=>{
        return blog.reIndexPosts()
        .then((data) => {
            expect(data).toMatchSnapshot();

        });
    });
    it('should return a storable payload for a given file', () => {
        return blog.getStorable("test/posts/2017-01-27_test-post-seo.md")
        .then((data) => {
            expect(data).toMatchSnapshot();
        });
    });
    it('should execute the catch if the file does not exists', () => {
        return blog.getStorable("does/not/exists")
        .catch((exc) => {
            expect(exc).toBeDefined();
        });
    });
});
