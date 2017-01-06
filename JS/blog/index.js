var Git = require("nodegit");
var recursive = require('recursive-readdir');
var fs = require('fs');

function read(){
    recursive('./tmp/up & going', function(err, files) {
        // Files is an array of filename
        files.forEach((file, index) => {
            fs.readFile(file, 'utf8', function(err, data) {
                if (err) throw err;
                console.log(data);
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
        read();
    })
    .catch(function(err) {
        console.log(err);
    });
