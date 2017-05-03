#!/usr/bin/env nodejs
const app = require('express')();
const bodyParser = require('body-parser');

const config = require(__dirname + '/config');
const cors = require(__dirname + '/cors');
const errorHandler = require(__dirname + '/error/handler');

app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./router')(app);
app.use(errorHandler);

app.listen(config.get('port'), function () {
  console.log('The server is started at 127.0.0.1:' + config.get('port'));
});

if (config.get('socket:enabled')) {
  const io = require(__dirname + '/socket');
}
