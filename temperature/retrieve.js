const Temperature = require('../models/temperature')

const retrieve = (req, res) => {
    const test = async function () {
        res.json({
            data : await Temperature.getTemperatures()
        })
    }
    test();
}

module.exports = {retrieve}