const app = require('express')();
const express = require('express');
const http = require('http').createServer(app);
const port = process.env.PORT || 3000;
const addTemperature = require('./temperature/add')
const retrieveTemperatures = require('./temperature/retrieve')
const mongoose = require('mongoose');

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

app.use(express.static('../index'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/educator.html');
});
app.get('/educator', function (req, res) {
    res.sendFile(__dirname + '/educator.html');
});
app.get('/student', function (req, res) {
    res.sendFile(__dirname + '/student.html');
});

app.post('/temperature', (req, res) => {
    addTemperature.add(req, res);
})

app.get('/temperature', (req, res) => {
    retrieveTemperatures.retrieve(req, res);
})

http.listen(port, function () {
    console.log('listening on *: ' + port);
});