// basic functionalities

$(document).ready(function () {
	$(".alert").hide()
	retrieve();
	function addRow(element) {
		if (element.status == "cool") {
			$("tbody").append("<tr class='info'><td>" + element.time_stamp + "<td>" + element.temperature + "	</tr>")
		}
		else {
			$("tbody").append("<tr class='danger'><td>" + element.time_stamp + "<td>" + element.temperature + " </tr>")
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

		// console.log("Received { topic:" + topic + "; payload: " + payload + " }");
		if (topic == "aspire/device") {
			payload = JSON.parse(payload)
			var temperature = payload.temperature
			var time_stamp = payload.timestamp
			var status;
			$("#current").text(temperature)
			console.log(temperature, time_stamp)
			if (temperature >= 25) {
				$('#status').text("Comlab Temperature is Hot!")
				$('.alert').addClass("alert-danger")
				status = "hot";
			}
			else {
				$('#status').text("Comlab Temperature is Cool!")
				$('.alert').addClass("alert-primary")
				status = "cool";
			}
			$.ajax({
				type: "post",
				url: "/temperature",
				data: { "time_stamp": time_stamp, "temperature": temperature + " &#x2103;", "status": status },
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