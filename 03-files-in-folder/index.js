const path = require('path');
const fs = require('fs');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(
  './03-files-in-folder/secret-folder',
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.log('Error', err);
      return;
    }
    files
      .filter((file) => file.isFile())
      .map((item) => {
        const filePath = path.join(folderPath, item.name);
        const [basename, extension] = item.name.split('.');
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.log('ERROR ', err);
            return;
          }
          const fileSize = stats.size / 1024;
          console.log(`${basename} - ${extension} - ${fileSize.toFixed(3)}kb`);
        });
      });
  },
);
