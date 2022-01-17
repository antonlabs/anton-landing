const root = './src/';
const fs = require('fs');

const destinationFolder = process.argv[2];

const regex = new RegExp(/(?<=translate\(')(.*)(?=\')/, "gm");


const translations = {};

const languages = ['en', 'it'];

function extractInFolder(path) {
    if(fs.existsSync(path)) {
        fs.readdirSync(path).forEach(file => {
            const filePath = path+file;
            if(fs.statSync(filePath).isDirectory()) {
                extractInFolder(filePath+'/');
            }else {
                const regexResult = fs.readFileSync(filePath).toString().match(regex);
                if(regexResult != null) {
                    regexResult.forEach((key) => translations[key] = "");
                }
            }
        });
    }
}

function writeLang(lang) {
    if(!fs.existsSync(destinationFolder+lang+'.json')) {
        fs.writeFileSync(destinationFolder+lang+'.json', '{}');
    }
    const i18n = JSON.parse(fs.readFileSync(destinationFolder+lang+'.json').toString());
    Object.keys(i18n).forEach(key => {
        if(Object.keys(translations).indexOf(key) === -1) {
            delete i18n[key];
        }
    });
    Object.keys(translations).forEach(item => {
        if(i18n[item] == null) {
            i18n[item] = "";
        }
    });
    fs.writeFileSync(destinationFolder+lang+'.json', JSON.stringify(i18n, null, 2));
}

(() => {
    extractInFolder(root);
    if(languages != null) {
        languages.forEach(lang => writeLang(lang));
    }
})()


