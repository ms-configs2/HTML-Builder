const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const outputFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.mkdir(path.dirname(outputFile), { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating directory:', err);
    return;
  }

  fs.writeFile(outputFile, '', (err) => {
    if (err) {
      console.error('Write Error:', err);
      return;
    }

    fs.readdir(stylesDir, (err, files) => {
      if (err) {
        console.error('Styles read err:', err);
        return;
      }

      files
        .filter((file) => path.extname(file) === '.css')
        .forEach((file) => {
          const filePath = path.join(stylesDir, file);

          fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
              console.error('Reading err:', err);
              return;
            }
            fs.appendFile(outputFile, data + '\n', (err) => {
              if (err) {
                console.error('Writing err:', err);
              }
            });
          });
        });
    });
  });
});
