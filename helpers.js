export function calculateDistance(startCountry, destCountry) {
    return calcDistance(startCountry.center.latitude, startCountry.center.longitude, destCountry.center.latitude, destCountry.center.longitude);
}

function calcDistance(startLat, startLng, destLat, destLng) {
    var R = 6371; // km
    var dLat = toRadians(destLat - startLat);
    var dLon = toRadians(destLng - startLng);
    var startLat = toRadians(startLat);
    var destLat = toRadians(destLat);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(startLat) * Math.cos(destLat);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
};

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

export function calculateBearing(startCountry, destCountry) {
    return calcBearing(startCountry.center.latitude, startCountry.center.longitude, destCountry.center.latitude, destCountry.center.longitude);
}

function calcBearing(startLat, startLng, destLat, destLng) {
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);

    const y = Math.sin(destLng - startLng) * Math.cos(destLat);
    const x = Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let brng = Math.atan2(y, x);
    brng = toDegrees(brng);
    return (brng + 360) % 360;
}

// todo: limit to N S E W NW SW NE SE
export function toCompass(degrees) {
    if (degrees < 0 || degrees > 360)
        return "";
    if (degrees >= 0 && degrees <= 11.25)
        return "N";
    if (degrees > 348.75 && degrees <= 360)
        return "N";
    if (degrees > 11.25 && degrees <= 33.75)
        return "NNE";
    if (degrees > 33.75 && degrees <= 56.25)
        return "NE";
    if (degrees > 56.25 && degrees <= 78.75)
        return "ENE";
    if (degrees > 78.75 && degrees <= 101.25)
        return "E";
    if (degrees > 101.25 && degrees <= 123.75)
        return "ESE";
    if (degrees > 123.75 && degrees <= 146.25)
        return "SE";
    if (degrees > 146.25 && degrees <= 168.75)
        return "SSE";
    if (degrees > 168.75 && degrees <= 191.25)
        return "S";
    if (degrees > 191.25 && degrees <= 213.75)
        return "SSW";
    if (degrees > 213.75 && degrees <= 236.25)
        return "SW";
    if (degrees > 236.25 && degrees <= 258.75)
        return "WSW";
    if (degrees > 258.75 && degrees <= 281.25)
        return "W";
    if (degrees > 281.25 && degrees <= 303.75)
        return "WNW";
    if (degrees > 303.75 && degrees <= 326.25)
        return "NW";
    if (degrees > 326.25 && degrees <= 348.75)
        return "NNW";
}