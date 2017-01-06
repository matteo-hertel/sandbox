var Git = require("nodegit");
var recursive = require('recursive-readdir');
var fs = require('fs');
var markdown = require( "markdown" ).markdown;
var path = require("path");
var mkpath = require('mkpath');
function ignoreFunc(file, stats) {
  // `file` is the absolute path to the file, and `stats` is an `fs.Stats`
  // object returned from `fs.lstat()`.
  console.log(path.extname(file));

  return !stats.isDirectory() && path.extname(file) !== '.md';
}

function read(){
    recursive('./tmp/', [ignoreFunc], function(err, files) {
        // Files is an array of filename
        files.forEach((file, index) => {
            console.log(file);
            fs.readFile(file, 'utf8', function(err, data) {
                if (err) throw err;
                var html;
                try {
                    html = markdown.toHTML(data);
                } catch (e) {
                    html = "error";
                } finally {

                }
                mkpath.sync(`./out/${path.dirname(file)}`.replace(/ /g, "-"), 0700);

                fs.writeFile(`./out/${file}.html`.replace(/ /g, "-"),  html, function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    console.log("The file was saved!");
                });
            });
        });
    });
}
read();
return;
// Clone a given repository into the `./tmp` folder.
Git.Clone("https://github.com/getify/You-Dont-Know-JS.git", "./tmp")
    // Look up this known commit.
    .then(function(repo) {
        // Use a known commit sha from this repository.
        //read();
    })
    .catch(function(err) {
        console.log(err);
    });
