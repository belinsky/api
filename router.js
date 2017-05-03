const controller = require('./controller');

module.exports = function(app) {
  app.post('/:collection', controller.make);

  app.get('/:collection', controller.get);
  app.get('/:collection/:id', controller.getOne);

  app.put('/:collection', controller.update);
  app.put('/:collection/:id', controller.updateOne);

  app.delete('/:collection', controller.remove);
  app.delete('/:collection/:id', controller.removeOne);
}
