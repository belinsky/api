const mongoose = require('mongoose');
const config = require(__dirname + '/config');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

module.exports = mongoose;
