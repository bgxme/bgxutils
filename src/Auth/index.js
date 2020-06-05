const AWS = require("aws-sdk");

AWS.config.region = process.env.AWS_REGION;
const Cognito = new AWS.CognitoIdentityServiceProvider();

const verifyUser = async (accessToken, userId) => {
    try {
        const userData = await Cognito.getUser({ AccessToken: accessToken }).promise();
        console.log('User data', userData);
        const constUserIDArray = userData.UserAttributes.filter((attr) => attr.Name === "custom:userId");
        const actualUserId = parseInt(constUserIDArray[0].Value, 10);

        console.log("Actual User ID", actualUserId);
        console.log("Received User ID", userId);
        if (userId === actualUserId) {
            console.log("User identified and authorized");
            return true;
        }
        throw new Error("User not authorized");
    } catch (error) {
        console.log('Error @ auth', error);
        throw error;
    }
};

module.exports = {
    verifyUser
};
