const coordStrToJson = (coordString) => {
    const objCoordinates = coordString.replace(/\s/g, "").split(',');

    return {
        'latitude': Number(objCoordinates[0]),
        'longitude': Number(objCoordinates[1])
    };
};

module.exports = {
    coordStrToJson
};