const Auth = require('./src/Auth');
const SecretManager = require('./src/SecretManager');
const Database = require('./src/Database');
const Geolocation = require('./src/Geolocation');
const String = require('./src/String');
const Lambda = require('./src/Lambda');

const printDebugInfo = () => {
    console.log('Process Environment', process.env);
}

module.exports = {
    Auth,
    Lambda,
    String,
    Database,
    SecretManager,
    printDebugInfo,
    Geolocation
};
