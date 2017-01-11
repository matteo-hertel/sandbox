var Git = require("nodegit");

// Clone a given repository into the `./tmp` folder.
const clone = (repo, distFolder) => {
    return Git.Clone(repo, distFolder);

};


module.exports = {
    clone
};
