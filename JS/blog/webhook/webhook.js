require('dotenv').config({path: `${__dirname}/.env`});

module.exports.process = (event, context, callback) => {
    const body = JSON.parse(event.body);
    console.log(JSON.stringify(body, null, 4));
    callback(null, {
        statusCode:200,
        body : JSON.stringify({
            process : "completed"
        })
    });
};
