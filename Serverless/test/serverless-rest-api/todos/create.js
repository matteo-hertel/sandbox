'use strict';

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid");

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    if (typeof data.text !== "string") {
        console.log("Validation failed");
        callback(new Error("Can't create todo item, validation failed"));
    }

    const params = {
        TableName: "todos",
        Item: {
            id: uuid.v1(),
            text: data.text,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    };
    dynamoDb.put(params, (error, result) => {
        if (error) {
            console.log(error);
            callback(new Error("Can't create todo item, failed to write"));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                status : "created"
            })
        };
        callback(null, response);
    });
};
