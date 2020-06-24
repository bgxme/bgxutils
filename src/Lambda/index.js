// Send Response in the right format
const sendResponse = (status, body, cb) => {
    let statusCode = 200;

    if (status !== "ok") statusCode = 400;

    cb(null, {
        statusCode,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(body)
    });
};

const getQueryVar = (varName, event) => {
    let value = false;
    if (
        event.queryStringParameters
        && event.queryStringParameters[varName]
    ) {
        value = event.queryStringParameters[varName];
    }

    return value;
};

const getPostVar = (varName, event) => {
    if (event && event.body) {
        let value = false;
        const eventBody = JSON.parse(event.body);

        if (eventBody !== null && eventBody !== undefined) {
            if (eventBody[varName]) {
                value = eventBody[varName];
            }
        }

        return value;
    }

    return false;
};

module.exports = {
    sendResponse,
    getQueryVar,
    getPostVar
};