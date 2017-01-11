const git= require("./modules/git");
const fileReader = require("./modules/fileReader");
const markdown = require("./modules/markDownProcessor");

//read();
return;

git.clone("https://github.com/getify/You-Dont-Know-JS.git", "./tmp")
.then((repo) => {
    read();
})
.catch((err) =>  {
    console.log(err);
});

function read(){
    fileReader.recursive('./tmp/')
    .then((files)=>{
        markdown.process(files, './out/');
    })
    .catch((err) =>  {
        console.log(err);
    });
}
