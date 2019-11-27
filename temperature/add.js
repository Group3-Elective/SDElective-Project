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
    const temperature = req.body;
    const test = async function () {
        await Temperature.addTemperature(temperature);
        res.json({
            data : await Temperature.getLastTemperature()
        })
    }
}

module.exports = {add}