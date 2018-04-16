const request = require('request');

var geocode = (address) => {
    return new Promise((resolve, reject) => {
		request({
		    url: 'http://maps.googleapis.com/maps/api/geocode/json' +
		        '?address=' + encodeURIComponent(address),
		    json: true
		}, (error, response, body) => {
			if (error){
				reject('Cannot connect to Google Maps');
			}else if (body.status == 'ZERO_RESULTS'){
				reject('Cannot find requested address');
			}else if (body.status == 'OK'){
				resolve({
					lat: body.results[0].geometry.location.lat,
					lng: body.results[0].geometry.location.lng
				})
			}
		});
	});
};

var weather = (lat, lng) => {
	return new Promise((resolve, reject)=> {
		request({
		    url: 'https://api.darksky.net/forecast/9d015d5408f7f127b8c6f0fce720d189/'+lat+','+lng,
		    json: true
		}, (error, response, body) => {
			if (error){
				reject('Cannot connect to Darksky.net');
				//console.log('Cannot connnect to Google Maps');
			}else if(body.code == 400){
				reject('Cannot find weather from the address');
				//console.log('Cannot find requested address');
			}else{
				resolve({
					icon: `${body.currently.icon}`,
					summary: `${body.currently.summary}`,
					temperature: `${body.currently.temperature}`,
					pressure: `${body.currently.pressure}`
				});
			}
		});
	});
};

module.exports = {
	geocode,
	weather
}