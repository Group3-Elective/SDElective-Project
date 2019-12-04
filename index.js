const app = require('express')();
const express = require('express');
const http = require('http').createServer(app);
const port = process.env.PORT || 3000;
const addTemperature = require('./temperature/add')
const retrieveTemperatures = require('./temperature/retrieve')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/pn_comlab', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected")
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('scripts'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/temperature', (req, res) => {
  console.log(req.body.temperature)
    addTemperature.add(req, res);
})

app.get('/temperature', (req, res) => {
    retrieveTemperatures.retrieve(req, res);
})

http.listen(port, function () {
    console.log('listening on *: ' + port);
});