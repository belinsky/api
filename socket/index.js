const config = require(__dirname + '/../config');
const logger = require(__dirname + '/../logger');
const controller = require(__dirname + '/controller');
var io = require('socket.io')(config.get('socket:port'));


io.sockets.on('connection', function (socket) {
  logger.info(
    (new Date).toLocaleString(),
    socket.request.connection.remoteAddress,
    ' is connected.'
  );

  socket.on('make', function(data){
    controller.make(data, function(res){
      if (res instanceof Error) logger.error(res);
      io.emit('make', res);
    });
  });
  socket.on('update', function(data){
    controller.update(data, function(res){
      if (res instanceof Error) logger.error(res);
      io.emit('update', res);
    });
  });
  socket.on('remove', function(data){
    controller.remove(data, function(res){
      if (res instanceof Error) logger.error(res);
      io.emit('remove', res);
    });
  });

  socket.on('disconnect', function () {
    logger.info(
      (new Date).toLocaleString(),
      socket.request.connection.remoteAddress,
      ' is disconnected.'
    );
  });
});

module.exports = io;
