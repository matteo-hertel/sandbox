const GitHubApi = require("github");
const PromisePolyfill = require('bluebird');
const getFile = (author, repo, branch, path) => {
    return _get(author, repo, branch, path)
        .then((res) => {
            res.content = Buffer.from(res.content, 'base64').toString();
            return {
                name: res.name,
                content: res.content
            };
        });
};
const getFolder = (author, repo, branch, path) => {
    return _get(author, repo, branch, path)
        .then((files) => {
            return _extractFiles(files);
        });
};
module.exports = {
    getFile,
    getFolder
};

const _extractFiles = (list) => {
    let files = list.filter((item) => {
        return item.type === "file";
    });

    return files.map((item) => {
        return {
            name: item.name,
            path: item.path
        };
    });
};

const _makeConfig = () => {

    var github = new GitHubApi({
        protocol: "https",
        host: "api.github.com", // should be api.github.com for GitHub
        pathPrefix: "", // for some GHEs; none for GitHub
        headers: {
            "user-agent": "Blogs Bot" // GitHub is happy with a unique user agent
        },
        Promise : PromisePolyfill,
        followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
        timeout: 15000
    });

    github.authenticate({
        type: "oauth",
        token: process.env.GITHUB_TOKEN
    });

    return github;
};
const github = _makeConfig();
const _get = (author, repo, branch, path) => {
    return github.repos.getContent({
        owner: author,
        repo: repo,
        path,
        ref: branch
    });
};
