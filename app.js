
const request = require('request');
const yargs = require('yargs');
const weatherKey = '89876ac9a533afd52b821d3368b92f60';

const geoCode = require('./geoCode/geoCode');
const weather = require('./weather/weather');
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'address to be fatch information',
            string: true

        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const address = argv.address;
geoCode.geoCode(address, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(`Address: ${result.address}`);
        console.log(`Latitude: ${result.lat}`);
        console.log(`Longitude: ${result.lng}`);
        weather.getWeather(weatherKey, result, (errorMessage, weatherResult) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`Temperature: ${weatherResult.temperature}`);
            }
        });
    }
});
