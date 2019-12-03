const app = require('express')()
const bodyParser = require('body-parser')
const Temperature = require('../models/temperature')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

const add = (req, res) => {
    const data  = ({
        time_stamp = req.body.time_stamp,
        temperature = req.body.temperature,
        status = req.body.temperature
    });
    const test = async function () {
        await Temperature.addTemperature(data);
        res.json({
            data : await Temperature.getLastTemperature()
        })
    }
    test();
}

module.exports = {add}