var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
	console.log(JSON.stringify(result, null, 2));
};

var displayError = function(err) {
    console.error(err);
};

var fs = require('fs');
var bridgeconfig = JSON.parse(fs.readFileSync('../bridgeconfig.json', 'utf8'));

var hostname = bridgeconfig.ip;
var username = bridgeconfig.username;

var api = new HueApi(hostname, username);
var state = lightState.create();

api.lightStatus(1).then(displayResult).done();

api.lightStatus(2).then(displayResult).done();

api.lightStatus(3).then(displayResult).done();

api.setLightState(1, state.on())
	.then(displayResult)
	.fail(displayError)
	.done();

setTimeout(function() {
	api.setLightState(1, state.off())
		.then(displayResult)
		.fail(displayError)
		.done();
}, 2000);