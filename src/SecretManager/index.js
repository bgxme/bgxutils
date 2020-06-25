const AWS = require("aws-sdk");

AWS.config.region = process.env.AWS_REGION;

const SecretManager = {
    secretId: undefined,
    currentSecret: undefined,
    secretParams: undefined,

    getSecret: async (
        secretParams,
        endpoint = "https://secretsmanager.eu-west-1.amazonaws.com",
        region = "eu-west-1"
    ) => {
        if (
            this.secretId
            && this.currentSecret
            && secretParams.SecretId === this.secretId
        ) return this.currentSecret;

        this.secretId = secretParams.SecretId;
        this.currentSecret = undefined;

        // Create a Secrets Manager client
        const secretsmanager = new AWS.SecretsManager({
            endpoint: endpoint,
            region: region
        });

        const data = await secretsmanager
            .getSecretValue(secretParams).promise();
        const secrets = JSON.parse(data.SecretString);
        this.currentSecret = secrets;

        return this.currentSecret;
    }
};

module.exports = SecretManager;
