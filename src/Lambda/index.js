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

module.exports = {
    sendResponse
};