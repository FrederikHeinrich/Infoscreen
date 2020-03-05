class ViewRouter {
  constructor(app, db) {
    this.view(app, db);
  }

  view(app, db) {
    app.get("/view", (req, res) => {
      var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      res.json(ip);
    });
  }
}

module.exports = ViewRouter;
