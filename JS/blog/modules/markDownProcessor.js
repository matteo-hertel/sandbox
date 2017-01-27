const markdown = require( "markdown" ).markdown;

const convert = (file, index) => {
    return new Promise((resolve, reject) => {
        resolve(file);
    })
    .then((data) => {
            return markdown.toHTML(data);
    });
};

module.exports = {
    convert
};
