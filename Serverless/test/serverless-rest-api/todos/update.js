'use strict';

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    if (typeof data.text !== "string" || typeof data.checked !== "boolean") {
        console.log("Validation failed");
        callback(new Error("Can't update todo item, validation failed"));
    }
    const params = {
        TableName: "todos",
        Item: {
            id: event.pathParameters.id,
            text: data.text,
            checked: data.checked,
            updatedAt: timestamp
        }
    };
    dynamoDb.put(params, (error, result) => {
        if (error) {
            console.log(error);
            callback(new Error("Can't update the todo"));
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                status : "updated"
            })
        };

        callback(null, response);
    });
};
