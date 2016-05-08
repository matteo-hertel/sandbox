/* jshint node:true */
/* jshint esnext:true */
const EventEmitter = require('events');
const util = require('util');
const screen = require("./modules/screenshot");


const emitter = new EventEmitter();
myEmitter.on('success', (payload) => {
    console.log(payload.message);
});

screen.setEmitter(emitter);
screen.screenshot("http://matteohertel.com", "./output/1920.png", "1920px*1080px");
screen.screenshot("http://matteohertel.com", "./output/720.png", "720px*480px");
