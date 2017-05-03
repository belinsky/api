const url = require('url');
const config = require(__dirname + '/../config');
const querystring = require('querystring');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  make: make,
  update: update,
  updateOne: updateOne,
  get: get,
  getOne: getOne,
  remove: remove,
  removeOne: removeOne,
}

function make (req, res, next) {
  try {
    const Collection = require(__dirname + '/../model/' + req.params.collection);
  } catch (err) {
    return next(new Error(501));
  }
  const method = typeof req.body.data === 'Array' ? 'insertMany' : 'insertOne';

  Collection[method](req.body.data, function (err, doc){
    if (err) return next(err);
    res.json(doc);
  });
}

function get (req, res, next) {
  try {
    const Collection = require(__dirname + '/../model/' + req.params.collection);
  } catch (err) {
    return next(new Error(501));
  }
  const query = querystring.parse(url.parse(req.baseUrl).query);
  const limit = query.limit || config.get('mongoose:limit');
  const orderBy = query.orderby || config.get('mongoose:orderBy');
  var result = [];
  delete query.limit;
  delete query.orderby;
  delete query._id;

  var cursor = Collection
    .find(query)
    .limit(limit)
    .sort(order)
    .cursor();

  cursor.on('data', function (doc){
    result.push(doc);
  });
  cursor.on('close', function (){
    res.json(result);
  });
  cursor.on('error', function (err){
    next(err);
  });
}

function getOne (req, res, next) {
  try {
    const Collection = require(__dirname + '/../model/' + req.params.collection);
  } catch (err) {
    return next(new Error(501));
  }

  Collection.findOne({'_id': ObjectId(req.params.id)}, function (err, doc){
    if (err) return next(err);
    res.json(doc);
  });
}

function update (req, res, next) {
  try {
    const Collection = require(__dirname + '/../model/' + req.params.collection);
  } catch (err) {
    return next(new Error(501));
  }
  const condition = req.body.condition;
  const data = { "$set": req.body.data };
  const options = req.body.options || {
    "safe": false,
    "upsert": true,
    "multi": true,
    "runValidators": true,
    "setDefaultsOnInsert": true,
    "strict": false
  };

  Collection.update(condition, data, options, function (err, doc){
    if (err) return next(err);
    res.json(doc);
  });
}

function updateOne (req, res, next) {
  try {
    const Collection = require(__dirname + '/../model/' + req.params.collection);
  } catch (err) {
    return next(new Error(501));
  }
  const condition = { "_id": ObjectId(req.params.id) };
  const data = { "$set": req.body.data };
  const options = req.body.options || {
    "safe": false,
    "upsert": true,
    "multi": false,
    "runValidators": true,
    "setDefaultsOnInsert": true,
    "strict": false
  };

  Collection.update(condition, data, options, function (err, doc){
    if (err) return next(err);
    res.json(doc);
  });
}

function remove (req, res, next) {
  try {
    const Collection = require(__dirname + '/../model/' + req.params.collection);
  } catch (err) {
    return next(new Error(501));
  }
  const condition = req.body.condition;
  Collection.deleteMany(condition, function (err, result){
    if (err) return next(err);
    res.json(result);
  });
}

function removeOne (req, res, next) {
  try {
    const Collection = require(__dirname + '/../model/' + req.params.collection);
  } catch (err) {
    return next(new Error(501));
  }
  const condition = { "_id": ObjectId(req.params.id) };
  Collection.deleteOne(condition, function (err, result){
    if (err) return next(err);
    res.json(result);
  });
}
