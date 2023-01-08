const { Readable } = require('stream');
const fs = require('fs')


const myReadbleStream = () => {
  const data = [
    "This is the stream data 1\n",
    "This is the stream data 2\n",
    "This is the stream data 3\n",
    "This is the stream data 4\n",
    "This is the stream data 5\n"
  ];

  return new Readable({
    read() {
      if (data.length === 0) {
        this.push(null);
      } else {
        this.push(data.shift());
      }
    }
  })
}

const readableStream = myReadbleStream();
const writeableStream = fs.createWriteStream('./files/out1.txt');
readableStream.pipe(writeableStream)