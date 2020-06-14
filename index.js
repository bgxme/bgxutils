const Auth = require('./src/Auth');
const SecretManager = require('./src/SecretManager');
const Database = require('./src/Database');

const printDebugInfo = () => {
    console.log('Process Environment', process.env);
}
module.exports = {
    Auth,
    Database,
    SecretManager,
    printDebugInfo
};
