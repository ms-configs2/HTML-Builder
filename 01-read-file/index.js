const fs = require('fs');
const stream = fs.createReadStream('./01-read-file/text.txt', 'utf-8');
stream.on('data', (chunk) => console.log(chunk));
stream.on('end', () => console.log('File was read'));
stream.on('error', (err) => console.log('ERROR ', err));
