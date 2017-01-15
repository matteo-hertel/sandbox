const git= require("./modules/git");
const fileReader = require("./modules/fileReader");
const markdown = require("./modules/markDownProcessor");

modules.exports.process = (event, context, callback) => {
git.clone("https://github.com/matteo-hertel/blog.git", "/tmp/blog")
.then((repo) => {
    read();
})
.catch((err) =>  {
    console.log(err);
});

function read(){
    fileReader.recursive('/tmp/blog')
    .then((files)=>{
        return markdown.process(files);
    }).
    then(() => {
        callback(null, {
            statusCode:200,
            body : JSON.stringify({
                process : "completed"
            })
        });
    })
    .catch((err) =>  {
        console.log(err);
        callback(new Error("Canno complete the process, please have a look at the logs"));
    });
}

};
