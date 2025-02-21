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

const directoryPath = path.join(__dirname, 'E-Matric/src/app');

function updateCSSFiles(dir) {
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
                    updateCSSFiles(filePath);
                } else if (file.endsWith('.component.css')) {
                    fs.appendFile(filePath, cssContent, (err) => {
                        if (err) {
                            return console.log('Unable to append to file: ' + err);
                        }
                        console.log(`Updated ${filePath}`);
                    });
                }
            });
        });
    });
}

updateCSSFiles(directoryPath);