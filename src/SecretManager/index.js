const AWS = require("aws-sdk");

AWS.config.region = process.env.AWS_REGION;

const SecretManager = {
    secretId: undefined,
    currentSecret: undefined,

    getSecret: async (
        secretId,
        endpoint = "https://secretsmanager.eu-west-1.amazonaws.com",
        region = "eu-west-1"
    ) => {
        if (
            this.secretId
            && this.currentSecret
            && secretId === this.secretId
        ) return this.currentSecret;

        this.secretId = secretId;
        this.currentSecret = undefined;

        // Create a Secrets Manager client
        const secretsmanager = new AWS.SecretsManager({
            endpoint: endpoint,
            region: region
        });

        const data = await secretsmanager
            .getSecretValue({ SecretId: this.secretId }).promise();
        const secrets = JSON.parse(data.SecretString);
        this.currentSecret = secrets;

        return this.currentSecret;
    }
};

module.exports = SecretManager;
