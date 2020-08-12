const csrf = require("csurf");
module.exports = function (app) {
  const csrfProtection = csrf({ cookie: true });
  app.pageRoute({
    path: "/",
    middleware: [csrfProtection],
    renderPath: "/index",
    async getProps(req, res, next) {
      res.cookie('name', 'homepages', {
        sameSite: 'lax',
        secure: true
      })
      return {
        csrfToken: req.csrfToken(),
        pageCheck: 'user',
        statusCode: res.statusCode,
        classPages:'default-index'
      };
    },
  });


  app.pageRoute({
    path: "/users",
    renderPath: "/users",
    async getProps(req, res, next) {
      return {
        statusCode: res.statusCode,
      };
    },
  });

  app.pageRoute({
    path: "/admin",
    middleware: [csrfProtection],
    renderPath: "/admin",
    async getProps(req, res, next) {
      res.cookie('name', 'admin', {
        sameSite: 'lax',
        secure: true
      })
      return {
        csrfToken: req.csrfToken(),
        pageCheck: 'admin',
        classPages:'default-admin'
      };
    },
  });

  app.pageRoute({
    path: "/admin/login",
    middleware: [csrfProtection],
    renderPath: "/admin/login",
    async getProps(req, res, next) {
      res.cookie('name', 'adminlogin', {
        sameSite: 'lax',
        secure: true
      })
      return {
        csrfToken: req.csrfToken(),
        pageCheck: 'admin',
        classPages:'bg-gradient-primary'
      };
    },
  });

};
