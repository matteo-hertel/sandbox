/* jshint esnext:true */
/* jshint node:true */
'use strict';

//Hapi reference
const Hapi = require("hapi");

//response object
const Boom = require("boom");

//Server object
const server = new Hapi.Server();
//set up connection
server.connection({
    port: 8080
});

//set up reporters
let goodOptions = {
    reporters: [{
        reporter: require("good-console"),
        events: {
            log: "*",
            response: "*"
        }
    }]
};

//register reporters
server.register({
    register: require("good"),
    options: goodOptions
}, err => {
    //return a string
    server.route({
        method: "GET",
        path: "/",
        handler: (request, reply) => {
            reply("hello hapi");
        }
    });
    //using parameters
    server.route({
        method: "GET",
        path: "/{name}",
        handler: (request, reply) => {
            server.log("error", "Papoi?");
            reply(`Hello, ${request.params.name}`);
        }
    });
    //using Boom object
    server.route({
        method: "GET",
        path: "/404",
        handler: (request, reply) => {
            reply(Boom.notFound());
        }
    });
    //an error will return a 500
    server.route({
        method: "GET",
        path: "/500",
        handler: (request, reply) => {
            reply(new Error("Nope!"));
        }
    });
    //using response object
    server.route({
        method: "GET",
        path: "/tea",
        handler: (request, reply) => {
            reply("Teapot")
                .type("text/plain")
                .code(418)
                .header("hello", "world")
                .state("test", "papoi");
        }
    });

    //start server
    server.start(() => console.log(`servet stated at ${server.info.uri}`));
});
