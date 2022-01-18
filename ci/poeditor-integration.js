const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const AWS = require('aws-sdk');

const localeFolder = process.argv[2];
const tsFolder = './src/state/language/langs';

const config = {
    apiVersion: "2017-10-17",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID.replace(/\s/g, ''),
    accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY.replace(/\s/g, ''),
    region: "eu-west-1"
}

AWS.config.update(config);


let API_TOKEN;
let PROJECT_ID;
const PO_EDITOR_URL = 'https://api.poeditor.com/v2';


const updateLocalLanguage = async (language) => {
    const formData = new FormData();
    formData.append('api_token', API_TOKEN);
    formData.append('id', PROJECT_ID);
    formData.append('language', language);
    formData.append('type', 'key_value_json');
    const response = await axios.post(PO_EDITOR_URL + '/projects/export', formData, {
        headers: {
            ...formData.getHeaders()
        }
    });
    console.log('Getting json file -> ', response.data);
    if(response.data.result.url) {
        const file = await axios.get(response.data.result.url, {responseType: 'stream'});
        const jsonChunks = [];
        await new Promise((resolve, reject) => {
            file.data.on('end', () => {
                console.log('Get language ' +  language + ' success');
                const json = JSON.parse(Buffer.concat(jsonChunks).toString('utf8'));
                fs.writeFileSync(tsFolder + '/' + language + '.ts', objectToTsConst(language, json));
                resolve()
            })
            file.data.on('data', (chunk) => {
                jsonChunks.push(Buffer.from(chunk));
            })
            file.data.on('error', (error) => {
                console.log('Get language ' +  language + ' error');
                reject(error)
            })
        });
    }
}

const getCurrentLanguageCodes = async () => {
    const formData = new FormData();
    formData.append('api_token', API_TOKEN);
    formData.append('id', PROJECT_ID);
    const response = await axios.post(PO_EDITOR_URL + '/languages/list', formData, {
        headers: {
            ...formData.getHeaders()
        }
    });
    console.log(response.data);
    return response.data.result.languages.map(item => item.code);
};


const updateTerms = async () => {
    const formData = new FormData();
    formData.append('api_token', API_TOKEN);
    formData.append('id', PROJECT_ID);
    formData.append('updating', 'terms_translations');
    formData.append('language', 'en');
    formData.append('read_from_source', 1);
    formData.append('overwrite', 0);
    formData.append('file', fs.createReadStream(localeFolder + '/en.json'));
    console.log('Uploading terms definitions');
    const response = await axios.post(PO_EDITOR_URL + '/projects/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...formData.getHeaders()
        }
    });
    console.log('Upload finish', response.data);
};

function objectToTsConst(constName, obj) {
    return `export const ${constName}=${JSON.stringify(obj)};`;
}


(async () => {
    const secret = await new AWS.SecretsManager(config).getSecretValue({SecretId: 'arn:aws:secretsmanager:eu-west-1:682060008544:secret:poeditor-PIFC7v'}).promise();
    const secretObj = JSON.parse(secret.SecretString);
    API_TOKEN = secretObj.api_token;
    PROJECT_ID = secretObj.project;
    const languages = await getCurrentLanguageCodes();
    console.log('LANGUAGE founds: ' + languages.join(', '));
    try{
        await Promise.all(languages.map(async (lang) => await updateLocalLanguage(lang)));
    }catch (e) {
        console.error(e);
    }
    await updateTerms();
})()
