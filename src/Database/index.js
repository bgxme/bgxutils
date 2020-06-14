const AWS = require("aws-sdk");
const mysql = require("mysql");
const SecretManager = require("../SecretManager");

const environment = process.env.ENVIRONMENT || 'production';
AWS.config.region = process.env.AWS_REGION;

const STAGE = environment === "development" ? "dev" : "prod";
console.log('Database running on env stage: ', STAGE, process.env.ENVIRONMENT);

const DBControl = {
    connect: async (type) => {
        const secretID = type === "enterprise" ? `${STAGE}/bgxent/mysql` : `${STAGE}/bgx/mysql`;
        const secret = await SecretManager.getSecret(secretID);
        const connection = await mysql.createConnection({
            host: secret.host,
            database: secret.database,
            user: secret.username,
            password: secret.password,
            port: secret.port,
            multipleStatements: true,
            nestTables: true
        });
        return connection;
    },

    disconnect: (connection) => (
        new Promise((resolve) => {
            connection.end((err) => {
                if (err) {
                    console.log('\nDB Connection End ERROR: ', err);
                    connection.destroy();
                }
                resolve();
            });
        })
    ),

    query: async (type, query, values) => {
        const connection = await DBControl.connect(type);
        return new Promise((resolve, reject) => {
            try {
                const resource = connection.query(query, values, (error, results) => {
                    if (error) {
                        console.log('\nDB_ERROR: ', JSON.stringify(error));
                        DBControl.disconnect(connection).then(() => reject(error));
                    } else {
                        DBControl.disconnect(connection).then(() => resolve(results));
                        resolve(results);
                    }
                });
                console.log('\nDB_QUERY:\n', resource.sql);
            } catch (error) {
                console.log('\nDB_ERROR_2: ', error);
                connection.destroy();
                reject(error);
            }
        });
    }
};

module.exports = DBControl;
