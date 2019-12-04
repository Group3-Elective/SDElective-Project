const Temperature = require('../models/temperature')

const retrieve = (req, res) => {
    const test = async function () {
		const elements = await Temperature.getTemperatures();
        res.send(elements)
    }
    test();
}

module.exports = {retrieve}