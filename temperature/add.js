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
    const data  = {
        time_stamp : req.body.time_stamp,
        temperature : req.body.temperature + " degrees C",
        status : req.body.status
    };
    const test = async function () {
        await Temperature.addTemperature(data);
        res.send(await Temperature.getTemperatures())
    }
    test();
}

module.exports = {add}