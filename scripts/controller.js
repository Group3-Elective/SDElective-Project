// basic functionalities

$(document).ready(function () {
	var rowNumber = 1;
	retrieve();
	function addRow(element) {
		rowNumber++;
		$("tbody").append("<tr class='danger'><td>" + element.time_stamp + "<td>" + element.temperature + "</tr>")
	}

	function retrieve() {
		$.ajax({
			type: "get",
			url: "/temperature",
			success : function(response) {
				response.forEach(function (element) {
					addRow(element);
				})
			},
			error : function (error) {
				console.log("error")
			}
		})
	}

	client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");
	client.on("connect", function () {
		console.log("Successfully connected");
	})
	client.subscribe('aspire/750');
	client.on("message", function (topic, payload) {
		console.log("Received { topic:" + topic + "; payload: " + payload + " }");
		if (topic == "aspire/750") {
			var temperature = payload.toString().substring(15, 19)
			var time_stamp = payload.toString().substring(34, 73)
			$('.btn').val(temperature)
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
						$('tbody tr').remove()
						rowNumber = 0;
						retrieve();
					},
					error: function (error) {
						console.log("error")
					}
				})
			}
			// else if (temperature < 25){
			// 	Swal.fire({
			// 		type: "success",
			// 		title: 'SUCCESS',
			// 		text: "Room is in normal temperature."
			// 	})
			// }
		}
	})

})