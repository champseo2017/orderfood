const users = require('../controllers/Users')
const csrf = require("csurf");
module.exports = function (app) {
  const csrfProtection = csrf({ cookie: true });
  app.post('/api/users/store', users.storeCreate)
};
