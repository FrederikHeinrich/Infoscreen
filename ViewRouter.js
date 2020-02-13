class ViewRouter {
  constructor(app, db) {
    this.exists(app, db);
    this.getdata(app, db);
    this.viewItem(app, db);
    this.uploadItem(app, db);
  }

  exists(app, db) {
    app.post("/view/exists", (req, res) => {
      if (req.session.viewid) {
        let cols = [req.session.viewid];
        db.query(
          "SELECT * FROM views WHERE viewid = ? LIMIT 1",
          cols,
          (err, data, fields) => {
            if (data && data.length === 1) {
              res.json({
                success: true,
                viewid,
                location: data[0].location,
                name: data[0].name,
                token: data[0].token
              });
            } else {
              res.json({ success: false, msg: "View nicht mehr vorhanden!" });
            }
          }
        );
      } else {
        res.json({ success: false });
      }
    });
  }
  getdata(app, db) {
    //TODO
    app.get("/view/getdata", (req, res) => {
      if (req.session.viewid) {
        let cols = [req.session.viewid];
        db.query(
          "SELECT * FROM views WHERE viewid = ? LIMIT 1",
          cols,
          (err, data, fields) => {
            if (data && data.length === 1) {
            }
          }
        );
      }
    });
  }
  viewItem(app, db) {}
  uploadItem(app, db) {}
}

module.exports = ViewRouter;
