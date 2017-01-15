const fs = require('fs');
const markdown = require( "markdown" ).markdown;
const mkpath = require('mkpath');
const path = require("path");

const process = (files) => {
    files.forEach(convert);
    return true;
};

const convert = (file, index) => {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) throw err;
        var html;
        try {
            html = markdown.toHTML(data);
        } catch (e) {
            html = "error";
        }
        publish(html, file);
    });
};

const publish= (html, file) => {
    console.log("The file was saved!");
};

module.exports = {
    process
};
