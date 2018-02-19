
const request = require('request');

const encodedAddress = (address) => encodeURIComponent(address);

const geoCode = (address, callback) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress(address)}`,
        json: true,

    }, (error, response, body) => {
        if (error) {
            callback('error during fatching geo location');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to fatch geo location')
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            })
        }
    });
}

module.exports = {
    geoCode
}