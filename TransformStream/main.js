const fs = require('fs');
const {Transform} = require('stream');

var util = require('util');

function Replacer(src, dest, options) {
  this.source = src;
  this.destination = dest;
  Transform.call(this, options);
}

util.inherits(Replacer, Transform);

Replacer.prototype._transform = function(chunk, enc, cb) {
  const {source, destination} = this;
  let data = chunk.toString();
  console.log(data.replace(source, destination), 'papoiiiii');
  this.push(data.replace(source, destination));
  cb();
};

fs.createReadStream('./source.js')
  .pipe(new Replacer('source', 'derp'))
  .pipe(fs.createWriteStream('./destination.js'));
