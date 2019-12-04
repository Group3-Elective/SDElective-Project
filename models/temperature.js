const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
    time_stamp: { type: String, required: true},
    temperature: { type: String, required: true },
    status: { type: String, required: true }
});

Schema.statics.addTemperature = async function (temperature) {
    var Temperature = new this(temperature);
    var result = await Temperature.save(temperature);
    return result;
}

Schema.statics.getTemperatures = async function () {
    return await this.find().sort({ _id: -1 });
}

Schema.statics.getLastTemperature = async function () {
    return await this.findOne().sort({ _id: -1 }).limit(1);
}

module.exports = mongoose.model('temperature', Schema);