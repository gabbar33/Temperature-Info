
const request = require('request');

const getWeather = (key, location, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${key}/${location.lat},${location.lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('error during fetching temprature');
        } else if (response.statusCode === 400) {
            callback('server error 400');
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature
            });
        }
    });
}

module.exports = {
    getWeather
}