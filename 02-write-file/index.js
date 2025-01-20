const { stdin, stdout } = process;
const fs = require('fs');
const stream = fs.createWriteStream('./02-write-file/text.txt');

stdout.write('Type something: ');
stdin.on('data', (data) => {
  const result = data.toString().trim();
  if (result === 'exit') {
    process.exit();
  } else {
    stream.write(result + '\n');
  }
});

process.on('exit', () => {
  console.log('Farawell!');
});
process.on('error', (err) => {
  console.log('ERROR ', err);
});
process.on('SIGINT', () => {
  process.exit();
});
