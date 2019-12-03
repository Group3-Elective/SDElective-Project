// basic functionalities

$(document).ready(function () {

	client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");
	client.on("connect", function () {
		console.log("Successfully connected");
	})
	client.subscribe('group3');
	client.on("message", function (topic, payload) {
		console.log("Received { topic:" + topic + "; payload: " + payload + " }");
		if (topic == "group3") {
			var temperature = payload.toString().substring(16, 18)
			var time_stamp = payload.toString().substring(35, 40)
			// console.log(payload.toString().substring(16, 18))
			if ( temperature >= 25) {
				$.ajax({
					type: "post",
					url: "/temperature",
					data : {"time_stamp" : time_stamp,"temperature" : temperature, "status" : "hot"},
					success: function (response) {
						console.log("success")
						Swal.fire({
							type: "error",
							title: 'ERROR',
							text: "Room temperature is too hot!"
						})
					},
					error: function (error) {
						console.log("error")
					}
				})
			}
			else if (temperature < 25){
				Swal.fire({
					type: "success",
					title: 'SUCCESS',
					text: "Room is in normal temperature."
				})
			}
		}
	})

})