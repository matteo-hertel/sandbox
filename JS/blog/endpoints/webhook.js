require('dotenv').config({path: `${__dirname}/.env`});

modules.exports.process = (event, context, callback) => {
    callback(null, {
        statusCode:200,
        body : JSON.stringify({
            process : "completed"
        })
    });
};
