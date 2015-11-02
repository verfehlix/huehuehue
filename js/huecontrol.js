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

	getLightStatus: function(lightNumber, callback) {
		api.lightStatus(lightNumber, function(err, result) {
			if (err) throw err;
			callback(result);
		});
	},

	turnOnLight: function(lightNumber) {
		var huecontrol = this;
		api.setLightState(lightNumber, state.on())
			.then(huecontrol.display)
			.fail(huecontrol.display)
			.done();
	},

	turnOffLight: function(lightNumber) {
		var huecontrol = this;
		api.setLightState(lightNumber, state.off())
			.then(huecontrol.display)
			.fail(huecontrol.display)
			.done();
	},

	setBrightness: function(brightness) {
		var huecontrol = this;
		api.setLightState(1, state.brightness(brightness))
			.then(huecontrol.display)
			.fail(huecontrol.display)
			.done();
		api.setLightState(2, state.brightness(brightness))
			.then(huecontrol.display)
			.fail(huecontrol.display)
			.done();
		api.setLightState(3, state.brightness(brightness))
			.then(huecontrol.display)
			.fail(huecontrol.display)
			.done();
	}
}