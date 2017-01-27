test('markdown input should return HTML', () => {
    const markdownProcessor = require(`${__dirname}/../../modules/markDownProcessor`);
    let markdown = `# H1
## H2
### H3`;
    let html = `<h1>H1</h1>

<h2>H2</h2>

<h3>H3</h3>`;
    markdownProcessor.convert(markdown, html).then((converted) => {
        expect(converted).toBe(html);
    });

});
