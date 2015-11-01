document.addEventListener("DOMContentLoaded", function(event) {
	
	var display = function(result) {
		console.log(JSON.stringify(result, null, 4));
	}

	var getLightStatus = function(number, callback) {
		api.lightStatus(number, function(err, result) {
			if (err) throw err;
			callback(result);
		});
	}

	var turnOnLight = function(number) {
		api.setLightState(number, state.on())
			.then(display)
			.fail(display)
			.done();
	}

	var turnOffLight = function(number) {
		api.setLightState(number, state.off())
			.then(display)
			.fail(display)
			.done();
	}


	var checkbox1 = document.querySelector('input[name=onoffswitch1]');
	checkbox1.addEventListener('change', function(event) {
		if (checkbox1.checked) {
			turnOnLight(1);
		} else {
			turnOffLight(1);
		}
	});

	var checkbox2 = document.querySelector('input[name=onoffswitch2]');
	checkbox2.addEventListener('change', function(event) {
		if (checkbox2.checked) {
			turnOnLight(2);
		} else {
			turnOffLight(2);
		}
	});

	var checkbox3 = document.querySelector('input[name=onoffswitch3]');
	checkbox3.addEventListener('change', function(event) {
		if (checkbox3.checked) {
			turnOnLight(3);
		} else {
			turnOffLight(3);
		}
	});


});