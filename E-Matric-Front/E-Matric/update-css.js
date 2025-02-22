const fs = require('fs');
const path = require('path');

const cssContent = `
/* Título de la aplicación */
.app-title {
    text-align: center;
    margin-top: 50px;
    font-size: 2rem;
    color: #333;
    flex-grow: 1;
    padding-bottom: 50px;
}
`;

const htmlContent = `
<div class="app-title">
    <h1>{{ title.toUpperCase() }}</h1>
    <p>{{ subtitle}}</p>
  </div>
`;

const directoryPath = path.join(__dirname, './src/app'); // Ajusta la ruta aquí

function updateFiles(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach((file) => {
            const filePath = path.join(dir, file);
            fs.stat(filePath, (err, stat) => {
                if (err) {
                    return console.log('Unable to stat file: ' + err);
                }

                if (stat.isDirectory()) {
                    updateFiles(filePath);
                } else if (file.endsWith('.component.css')) {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            return console.log('Unable to read file: ' + err);
                        }
                        if (!data.includes(cssContent.trim())) {
                            fs.appendFile(filePath, cssContent, (err) => {
                                if (err) {
                                    return console.log('Unable to append to file: ' + err);
                                }
                                console.log(`Updated CSS in ${filePath}`);
                            });
                        }
                    });
                } else if (file.endsWith('.component.html') && !file.includes('app.component.html')) {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            return console.log('Unable to read file: ' + err);
                        }
                        if (!data.includes(htmlContent.trim())) {
                            fs.appendFile(filePath, htmlContent, (err) => {
                                if (err) {
                                    return console.log('Unable to append to file: ' + err);
                                }
                                console.log(`Updated HTML in ${filePath}`);
                            });
                        }
                    });
                }
            });
        });
    });
}

updateFiles(directoryPath);