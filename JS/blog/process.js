require('dotenv').config({path: `${__dirname}/.env`});

const git= require("./modules/git");
const markdown = require("./modules/markDownProcessor");

modules.exports.process = (event, context, callback) => {
    callback(null, {
        statusCode:200,
        body : JSON.stringify({
            process : "completed"
        })
    });
};
