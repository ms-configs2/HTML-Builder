const path = require('path');
const fs = require('fs');

const sourceDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

function copyDir() {
  fs.mkdir(destDir, { recursive: true }, (err) => {
    if (err) {
      console.log('Make dir', err);
      return;
    }
  });
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.log('Read dir', err);
      return;
    }
    files.forEach((file) => {
      const sourceFilePath = path.join(sourceDir, file);
      const destFilePath = path.join(destDir, file);
      fs.stat(sourceFilePath, (err, stats) => {
        if (err) {
          console.log('Get stats', err);
          return;
        }
        if (stats.isFile()) {
          fs.copyFile(sourceFilePath, destFilePath, (err) => {
            if (err) {
              console.log('Copy err', err);
              return;
            }
          });
        }
      });
    });
  });
}
copyDir();
