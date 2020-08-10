module.exports = function (app) {
  
  app.pageRoute({
    path: "/",
    renderPath: "/index",
    async getProps(req, res, next) {
      return {
        statusCode: res.statusCode,
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
    renderPath: "/admin",
    async getProps(req, res, next) {
      return {
        pageCheck: 'admin',
      };
    },
  });

};
