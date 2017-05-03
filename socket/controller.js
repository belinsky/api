const url = require('url');
const config = require(__dirname + '/../config');
const querystring = require('querystring');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  make: make,
  update: update,
  remove: remove,
}

function make (data, callback) {
  try {
    const Collection = require(__dirname + '/../model/' + data.collection);
  } catch (err) {
    return new Error(501);
  }
  const method = typeof data.data === 'Array' ? 'insertMany' : 'insertOne';

  Collection[method](data.data, function (err, doc){
    return callback(err || doc);
  });
}

function update (data, callback) {
  try {
    const Collection = require(__dirname + '/../model/' + data.collection);
  } catch (err) {
    return new Error(501);
  }
  if (data.condition.id) data.condition._id = ObjectId(data.condition.id);
  delete data.condition.id;
  const condition = data.condition;
  const data = { "$set": data.data };
  const options = data.options || {
    "safe": false,
    "upsert": true,
    "multi": true,
    "runValidators": true,
    "setDefaultsOnInsert": true,
    "strict": false
  };

  Collection.update(condition, data, options, function (err, doc){
    return callback(err || doc);
  });
}

function remove (data, callback) {
  try {
    const Collection = require(__dirname + '/../model/' + data.collection);
  } catch (err) {
    return new Error(501);
  }
  if (data.condition.id) data.condition._id = ObjectId(data.condition.id);
  delete data.condition.id;
  const condition = data.condition;

  Collection.deleteMany(condition, function (err, result){
    return callback(err || result);
  });
}
