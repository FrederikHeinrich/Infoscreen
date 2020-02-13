const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const Router = require("./Router");
const ViewRouter = require("./ViewRouter");

// Serve the static files from the React app to the User
app.use(express.static(path.join(__dirname, "client/build")));

/**
Database
-users
+--------+----------+--------------------------------------------------------------+-------+
| userid | username | password                                                     | admin |
+--------+----------+--------------------------------------------------------------+-------+
|      1 | freddi   | $2b$09$Vll3ZZiSqfyC3roieEA/M.q.fJ6QhDItjDTZxrdVRBjHXWC6EvIVC |     1 |
|      2 | test     | $2b$09$Vll3ZZiSqfyC3roieEA/M.q.fJ6QhDItjDTZxrdVRBjHXWC6EvIVC |     0 |
+--------+----------+--------------------------------------------------------------+-------+
-log
+---------------------+--------+-----------------------+-----------+---------------+
| date                | action | info                  | ip        | client        |
+---------------------+--------+-----------------------+-----------+---------------+
| 2020-02-12 12:20:26 | demo   | Demo info Message.... | 127.0.0.1 | root - Freddi |
+---------------------+--------+-----------------------+-----------+---------------+
-views
+--------+----------+------------------+-----------+-------+
| viewid | location | name             | ip        | token |
+--------+----------+------------------+-----------+-------+
|    1   | @Freddi  | Freddi´s Test PI | 10.35.0.1 |       |
+--------+----------+------------------+-----------+-------+
-viewpermissions
+--------+--------+
| userid | viewid |
+--------+--------+
|      1 |    1   |
+--------+--------+
 */

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "infoscreen"
});

db.connect(function(err) {
  if (err) {
    console.log("MySQL Connection Failed!");
    throw err;
    return false;
  } else {
    console.log("MySQL conneted!");
  }
});

const sessionStore = new MySQLStore(
  {
    expiration: 1825 * 86400 * 1000,
    endConnectionOnClose: false
  },
  db
);

app.use(
  session({
    key: "jasnmdas",
    secret: "megassadas",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1825 * 86400 * 1000,
      httpOnly: false
    }
  })
);

new Router(app, db);
new ViewRouter(app, db);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("The App is listening on port " + port);
