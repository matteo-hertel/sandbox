const fs = require('fs');
const markdown = require( "markdown" ).markdown;
const mkpath = require('mkpath');
const path = require("path");

const process = (files, folder) => {
    this.folder = folder;
    files.forEach(convert);
};

const convert = (file, index) => {
    this.file = file;

    fs.readFile(this.file, 'utf8', function(err, data) {
        if (err) throw err;
        var html;
        try {
            html = markdown.toHTML(data);
        } catch (e) {
            html = "error";
        }
        publish(html);
    });
};

const publish= (html) => {
    mkpath.sync(`./${this.folder}/${path.dirname(this.file)}`.replace(/ /g, "-"), 0700);

    fs.writeFile(`./${this.folder}/${this.file}.html`.replace(/ /g, "-"),  html, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
};

module.exports = {
    process
};
