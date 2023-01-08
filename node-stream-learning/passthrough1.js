const fs = require('fs');
const { PassThrough, Writable } = require("stream");

const pass = new PassThrough();

const readableStream = fs.createReadStream('./files/file1.txt');

const myWritableStream = (data) => {
  return new Writable({
    write(chunk, enc, next) {
      data.push(chunk);
      next();
    }
  })
}

const data = [];
const writable = myWritableStream(data);

writable.on('finish', () => {
  console.log('Writing Done!!!', data);
})

pass.pipe(readableStream).pipe(writable);