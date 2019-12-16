// basic functionalities

$(document).ready(function () {
	$(".alert").hide()
	retrieve();
	function addRow(element) {
		if (element.temperature >= 25) {
			$("tbody").append("<tr class='danger'><td>" + element.time_stamp + "<td>" + element.temperature + "	</tr>")
		}
		else {
			$("tbody").append("<tr class='primary'><td>" + element.time_stamp + "<td>" + element.temperature + " </tr>")
		}
	}

	function retrieve() {
		$.ajax({
			type: "get",
			url: "/temperature",
			success: function (response) {
				response.forEach(function (element) {
					addRow(element);
				})
			},
			error: function (error) {
				console.log("error")
			}
		})
	}

	client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");
	client.on("connect", function () {
		console.log("Successfully connected");
	})
	client.subscribe('aspire/device');
	client.on("message", function (topic, payload) {
		$(".alert").show()

		console.log("Received { topic:" + topic + "; payload: " + payload + " }");
		if (topic == "aspire/device") {
			payload = JSON.parse(payload)
			var temperature = payload.temperature
			var time_stamp = payload.timestamp
			$("#current").text(temperature)
			console.log(temperature, time_stamp)
			$.ajax({
				type: "post",
				url: "/temperature",
				data: { "time_stamp": time_stamp, "temperature": temperature + " &#x2103;", "status": "hot" },
				success: function (response) {
					console.log("success")
					$('tbody tr').remove()
					retrieve();
				},
				error: function (error) {
					console.log("error")
				}
			})
		}
	})

})