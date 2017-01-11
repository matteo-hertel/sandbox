const recursiveReader = require('recursive-readdir');
const path = require("path");

const ignoreFunc = (file, stats)  => {
  // `file` is the absolute path to the file, and `stats` is an `fs.Stats`
  // object returned from `fs.lstat()`.

  return !stats.isDirectory() && path.extname(file) !== '.md';
};

const recursive = (folder) => {

return new Promise(function (resolve, reject){
    recursiveReader(folder, [ignoreFunc], function(err, files) {
        if(err){
            reject(err);
            return;
        }
        resolve(files);
    });
  });

};

module.exports = {
    recursive
};
