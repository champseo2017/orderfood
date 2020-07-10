const users = require('../controllers/Users')
module.exports = function (app) {
  app.get('/api/users', users.testApi123)
};
