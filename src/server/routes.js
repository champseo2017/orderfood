module.exports = function (app) {
  app.get("/", (req, res) => {
    app.render(req, res, "/index");
  });
};
