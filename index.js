const Auth = require('./src/Auth');
const SecretManager = require('./src/SecretManager');
const Database = require('./src/Database');
const Miscellaneous = require('./src/Misc');

const printDebugInfo = () => {
    console.log('Process Environment', process.env);
}
module.exports = {
    Auth,
    Database,
    SecretManager,
    printDebugInfo,
    Miscellaneous
};
