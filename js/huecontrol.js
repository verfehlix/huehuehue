var fs = require('fs');
var hue = require("node-hue-api");

var HueApi = hue.HueApi;
var lightState = hue.lightState;

var bridgeconfig = JSON.parse(fs.readFileSync('bridgeconfig.json', 'utf8'));
var hostname = bridgeconfig.ip;
var username = bridgeconfig.username;
var api = new HueApi(hostname, username);
var state = lightState.create();

module.exports = {

	display: function(result) {
		console.log(JSON.stringify(result, null, 4));
	},

	getLightStatus: function(number, callback) {
		api.lightStatus(number, function(err, result) {
			if (err) throw err;
			callback(result);
		});
	},

	turnOnLight: function(number) {
		var huecontrol = this;
		api.setLightState(number, state.on())
			.then(huecontrol.display)
			.fail(huecontrol.display)
			.done();
	},

	turnOffLight: function(number) {
		var huecontrol = this;
		api.setLightState(number, state.off())
			.then(huecontrol.display)
			.fail(huecontrol.display)
			.done();
	}
}