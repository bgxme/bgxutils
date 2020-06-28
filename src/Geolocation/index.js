const coordStrToJson = (coordString) => {
    const objCoordinates = coordString.replace(/\s/g, "").split(',');

    return {
        'latitude': Number(objCoordinates[0]),
        'longitude': Number(objCoordinates[1])
    };
};

const makeCoordString = (coordinates) => {
    const latitude = coordinates["latitude"] || coordinates["lat"];
    const longitude = coordinates["longitude"] || coordinates["lng"];

    return `${latitude},${longitude}`;
}

module.exports = {
    coordStrToJson,
    makeCoordString
};