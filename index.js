const Auth = require('./src/Auth');
const SecretManager = require('./src/SecretManager');
const Database = require('./src/Database');
const Geolocation = require('./src/Geolocation');
const String = require('./src/String');

const printDebugInfo = () => {
    console.log('Process Environment', process.env);
}
module.exports = {
    Auth,
    String,
    Database,
    SecretManager,
    printDebugInfo,
    Miscellaneous,
    Geolocation
};
