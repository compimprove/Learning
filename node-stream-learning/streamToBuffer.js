const fs = require('fs');
const { PassThrough, Writable } = require('stream');


function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const buffers = [];
    stream.on('data', (data) => {
      buffers.push(data);
    });
    stream.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
    stream.on('error', (err) => {
      reject(err);
    });
  })
};

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

const readableStream = fs.createReadStream('./files/file1.txt');

const pass = new PassThrough();
pass.end('hello world and everyone').pipe(writable)