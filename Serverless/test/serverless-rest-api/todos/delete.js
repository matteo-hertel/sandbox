'use strict';

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
    const params = {
        TableName : "todos",
        Key: {
            id : event.pathParameters.id
        }
    };
    dynamoDb.delete(params, (error, result)=>{
        if(error){
            console.log(error);
            callback(new Error("Can't fetch the todo"));
            return;
        }

        const response= {
            statusCode : 200,
            body: JSON.stringify({
                status : "deleted"
            })
        };

        callback(null, response);
    });
};
