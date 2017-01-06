var Git = require("nodegit");
var recursive = require('recursive-readdir');


// Clone a given repository into the `./tmp` folder.
Git.Clone("https://github.com/getify/You-Dont-Know-JS.git", "./tmp")
  // Look up this known commit.
  .then(function(repo) {
    // Use a known commit sha from this repository.
    recursive('./tmp', function (err, files) {
      // Files is an array of filename
      console.log(files);
    });
  })
  .catch(function(err) { console.log(err); });
