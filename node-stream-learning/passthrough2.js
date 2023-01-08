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
  console.log('Writing Done!!!', data.toString());
})

const readStream = pass.end(Buffer.from("I'm a buffer"))

readStream.on('data', (chunk) => {
  data.push(chunk)
  console.log('Receiving Data', chunk.toString());
})
readStream.on('end', () => {
  console.log('Writing Done!!!', data.toString());
});