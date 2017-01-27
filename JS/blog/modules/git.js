var GitHubApi = require("github");

var github = new GitHubApi({
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    pathPrefix: "", // for some GHEs; none for GitHub
    headers: {
        "user-agent": "Blogs Bot" // GitHub is happy with a unique user agent
    },
    Promise: require('bluebird'),
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
});

github.authenticate({
    type: "oauth",
    token: process.env.GITHUB_TOKEN
});


const getFile = (author, repo, branch, path) => {
    return _get(author, repo, branch, path)
        .then((res) => {
            return Buffer.from(res.content, 'base64').toString();
        }).
    catch((err) => {
        throw Error(`Error while fetching info for ${author}, ${repo}, ${branch}. Error ${err}`);
    });
};
const getFolder = (author, repo, branch, path) => {
    return _get(author, repo, branch, path)
        .then(_extractFiles)
        .catch((err) => {
            throw Error(`Error while fetching info for ${author}, ${repo}, ${branch}. Error ${err}`);
        });
};
module.exports = {
    getFile,
    getFolder
};
const _get = (author, repo, branch, path) => {
    return github.repos.getContent({
        owner: author,
        repo: repo,
        path,
        ref: branch
    });
};

const _extractFiles = (list) => {
    return new Promise((resolve, reject) => {
        resolve(list);
    }).then((list) => {
        let files = list.filter((item)=>{
            return item.type === "file";
        });

        return  files.map((item) => {
            return {
                name: item.name,
                path: item.path
            };
        });
    });
};
