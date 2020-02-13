const bcrypt = require("bcrypt");

class Router {
  constructor(app, db) {
    this.login(app, db);
    this.isLoggedIn(app, db);
    this.logout(app, db);

    this.getViews(app, db);
  }
  login(app, db) {
    /**
     * gives username + password
     * return success true + username
     * or success false + msg
     */
    app.post("/login", (req, res) => {
      let username = req.body.username;
      let password = req.body.password;
      username = username.toLowerCase();
      console.log("username: " + username + " - password: " + password);
      if (username.lenght > 12 || password.lenght > 12) {
        res.json({
          success: false,
          msg: "Es ist ein Fehler aufgetreten bitte versuchen Sie es erneut!"
        });
        return;
      }
      let cols = [username];
      db.query(
        "SELECT * FROM users WHERE username = ? LIMIT 1",
        cols,
        (err, data, fields) => {
          if (err) {
            res.json({
              success: false,
              msg:
                "Es ist ein Datenbank Fehler aufgetreten... Bitte Versuchen Sie es erneut und sollte der Fehler häufiger auftreten setzen sie sich mit der IT in verbindung!"
            });
            return;
          }
          //Found 1 Data
          if (data && data.length === 1) {
            bcrypt.compare(
              password,
              data[0].password,
              (bcryptErr, verified) => {
                if (verified) {
                  req.session.userID = data[0].userid;
                  res.json({
                    success: true,
                    username: data[0].username
                  });
                  return;
                } else {
                  res.json({
                    success: false,
                    msg: "Falsches Password"
                  });
                  return;
                }
              }
            );
          } else {
            res.json({
              success: false,
              msg: "Der Benutzer ist uns nicht bekannt!"
            });
            return;
          }
        }
      );
    });
  }
  isLoggedIn(app, db) {
    /**
     * gives nothing
     * return success true
     * or success false + msg
     */
    app.post("/isLoggedIn", (req, res) => {
      if (req.session.userID) {
        let cols = [req.session.userID];
        db.query(
          "SELECT * FROM users WHERE userid = ? LIMIT 1",
          cols,
          (err, data, fields) => {
            if (data && data.length === 1) {
              res.json({ success: true, username: data[0].username });
              return true;
            } else {
              res.json({
                success: false,
                msg: "Benuzer existiert nicht mehr."
              });
            }
          }
        );
      } else {
        res.json({ success: false });
      }
    });
  }
  logout(app, db) {
    /**
     * gives nothing
     * return success true
     * or success false + msg
     */
    app.post("/logout", (req, res) => {
      if (req.session.userID) {
        req.session.destroy();
        res.json({ success: true });
        return true;
      } else {
        res.json({
          success: false
        });
        return false;
      }
    });
  }
  getViews(app, db) {
    app.post("/getViews", (req, res) => {
      if (req.session.userID) {
        let cols = [req.session.userID];
        db.query(
          "SELECT * FROM users WHERE userid = ? LIMIT 1",
          cols,
          (err, data, fields) => {
            if (data && data.length === 1) {
              let cols = [req.session.userID];
              db.query(
                "SELECT `views`.* FROM `views` LEFT JOIN `viewpermissions` ON `viewpermissions`.`viewid` = `views`.`viewid` LEFT JOIN `users` ON `viewpermissions`.`userid` = `users`.`userid` WHERE `users`.`userid` = ?",
                cols,
                (err, data, fields) => {
                  res.json(JSON.stringify(data));
                }
              );
            }
          }
        );
      }
    });
  }
}

module.exports = Router;
