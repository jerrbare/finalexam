const express = require('express');
const request = require('request');
const fs = require('fs');
const bodyParser = require('body-parser');
const weather_file = require('./weather.js');
const port = process.env.PORT || 8080;


var app = express();
var weather = ''; //variable to hold the weather info

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/',(request, response) =>{
	response.sendFile(`${__dirname}/views/index.html`);
});




app.post('/api/data', function(request,response){
	const place = request.body.location;
	weather_file.geocode(place).then((result) => {
		return weather_file.weather(result.lat, result.lng);
	}).then((result)=>{
		weather = result;
		response.send(weather);
	}).catch((error)=>{
		console.log(error)
	})
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
    
});