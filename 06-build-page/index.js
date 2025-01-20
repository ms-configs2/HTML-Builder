const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');
const template = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');
const assets = path.join(__dirname, 'assets');
const styles = path.join(__dirname, 'styles');

fs.mkdir(projectDist, { recursive: true }, (err) => {
  if (err) {
    console.error('Folder err:', err);
    return;
  }
  fs.readFile(template, 'utf-8', (err, templateData) => {
    if (err) {
      console.error('Template err:', err);
      return;
    }
    fs.readdir(components, (err, componentFiles) => {
      if (err) {
        console.error('Componenets err:', err);
        return;
      }
      componentFiles.forEach((file) => {
        if (path.extname(file) === '.html') {
          const componentName = path.basename(file, '.html');
          const componentTag = `{{${componentName}}}`;
          const componentPath = path.join(components, file);

          fs.readFile(componentPath, 'utf-8', (err, componentData) => {
            if (err) {
              console.error(`${componentName} err:`, err);
              return;
            }
            templateData = templateData.replace(componentTag, componentData);

            if (componentFiles.indexOf(file) === componentFiles.length - 1) {
              fs.writeFile(
                path.join(projectDist, 'index.html'),
                templateData,
                (err) => {
                  if (err) {
                    console.error('Write err:', err);
                  }
                },
              );
            }
          });
        }
      });
    });
  });

  fs.readdir(styles, (err, styleFiles) => {
    if (err) {
      console.error('Styles err ', err);
      return;
    }

    let combinedStyles = '';

    styleFiles.forEach((file, index) => {
      if (path.extname(file) === '.css') {
        const styleFilePath = path.join(styles, file);

        fs.readFile(styleFilePath, 'utf-8', (err, styleData) => {
          if (err) {
            console.error(`${file} err `, err);
            return;
          }
          combinedStyles += styleData + '\n';
          if (index === styleFiles.length - 1) {
            fs.writeFile(
              path.join(projectDist, 'style.css'),
              combinedStyles,
              (err) => {
                if (err) {
                  console.error('Styles err ', err);
                }
              },
            );
          }
        });
      }
    });
  });

  const copyAssets = (sourceDir, destDir) => {
    fs.mkdir(destDir, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory ${destDir}:`, err);
        return;
      }

      fs.readdir(sourceDir, (err, files) => {
        if (err) {
          console.error(`Error reading directory ${sourceDir}:`, err);
          return;
        }

        files.forEach((file) => {
          const sourceFilePath = path.join(sourceDir, file);
          const destFilePath = path.join(destDir, file);

          fs.stat(sourceFilePath, (err, stats) => {
            if (err) {
              console.error(`${sourceFilePath} err `, err);
              return;
            }
            if (stats.isDirectory()) {
              copyAssets(sourceFilePath, destFilePath);
            } else {
              fs.copyFile(sourceFilePath, destFilePath, (err) => {
                if (err) {
                  console.error('Copy file err ', err);
                }
              });
            }
          });
        });
      });
    });
  };

  copyAssets(assets, path.join(projectDist, 'assets'));
});