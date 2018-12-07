import { Transform } from "stream";

import { mkdir, readFile, writeFile } from "fs";

import { inherits, promisify } from "util";

export const asyncReadFile = promisify(readFile);
export const asyncWriteFile = promisify(writeFile);
export const asyncMkdir = promisify(mkdir);

export function Replacer(this: any, src: string, dest: string, options: {}) {
  this.source = src;
  this.destination = dest;
  Transform.call(this, options);
}

inherits(Replacer, Transform);

Replacer.prototype._transform = function(
  chunk: Buffer,
  enc: string, //tslint:disable-line
  cb: () => void
) {
  let data = chunk.toString();
  this.push(data.replace(this.source, this.destination));
  cb();
};
