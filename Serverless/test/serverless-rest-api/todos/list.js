'use strict';

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName : "todos"
};
module.exports.list = (event, context, callback) => {
    dynamoDb.scan(params, (error, result)=>{
        if(error){
            console.log(error);
            callback(new Error("Can't fetch the todo list"));
            return;
        }

        const response= {
            statusCode : 200,
            body : JSON.stringify(result.Items)
        };

        callback(null, response);
    });
};
