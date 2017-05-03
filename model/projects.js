var crypto = require('crypto'),
    mongoose = require(__dirname + '/../mongoose.js'),
    Schema = mongoose.Schema,
    async = require('async'),
    path = require('path'),
    util = require('util'),
    http = require('http'),

var schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    enum: [
      'web',
      'desktop',
      'mobile',
      'console',
      'design',
      'sample'
    ],
    default: 'sample'
  },
  created: {
    type: Date,
    default: new Date()
  }
}, {
  autoIndex: true,
  strict: false
});

async.each(Object.keys(mongoose.models),
    function (modelName, callback){
        mongoose.models[modelName].ensureIndexes(callback);
    });


module.exports = mongoose.model('projects', schema);
