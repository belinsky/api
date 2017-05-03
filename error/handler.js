const logger = require(__dirname + '/../logger');
const HttpError = require(__dirname).HttpError;

module.exports = function(err, req, res, next){
    if (typeof err == 'number') err = new HttpError(err);
    logger.error(err);
    res.status(err.status || 500);
    res.json(err);
}
