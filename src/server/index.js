require("dotenv").config();
const express = require("express");
const next = require("next");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const socketIO = require("socket.io");
const frameguard = require("frameguard");
const bodyParser = require("body-parser");
const nocache = require("nocache");
const routePages = require("./pages/routes");
const routeApi = require("./api/routes");
const port = process.env.PORT || 8000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, poweredByHeader: false });
const handle = app.getRequestHandler();
const https = require("https");
const httpsLocalhost = require("https-localhost")();
const nextExpress = require("next-express/server")(app).injectInto(express);
const async = require("async");

app.prepare().then(() => {
  const server = nextExpress();
  const dbOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.PORT,
    database: process.env.DATABASE,
  };

  server.use(myConnection(mysql, dbOptions, "pool"));
  server.use(nocache());
  const csrfProtection = csrf({ cookie: true });
  server.use(frameguard({ action: "deny" }));
  server.disable("x-powered-by");
  server.use(cors());
  server.use(cookieParser());
  // parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: true }));
  // parse application/json
  server.use(bodyParser.json());

  routeApi(server);
  routePages(server);

  server.all("*", (req, res) => {
    handle(req, res);
  });
  // error handler
  server.use(function (err, req, res, next) {
    if (err.code !== "EBADCSRFTOKEN") return next(err);
    // handle CSRF token errors here
    res.status(403);
    res.send("No, you can t do this");
  });

  // const app = server.listen(port, function (err, result) {
  //   console.log("running in port http://localhost:" + port);
  // });

  // test noti port
  server.listen(8000, function (err, result) {
    console.log("running in port http://localhost:" + "8000");
  });

  /* Learn node js
  Examples
 Waterfall : dependent mono-tasking
  async.waterfall(tasks, afterTasksCallback) will execute a set of tasks. Each task are executed
after another, and the result of a task is passed to the next task. As async.series(), if a task
fails, async stop the execution and call immediately the main callback.
When tasks are finished successfully, async call the "master" callback with all errors and all results
of tasks.

  
  */
  function getUserRequest(callback) {
    setTimeout(() => {
      const userResult = {
        name: "Aamu",
      };
      callback(null, userResult);
    }, 500);
  }

  function getUserFriendsRequest(user, callback) {
    setTimeout(() => {
      let friendResult = [];
      if (user.name === "Aamu") {
        friendResult = [
          {
            name: "Alice",
          },
          {
            name: "Bod",
          },
        ];
      }
      callback(null, friendResult);
    }, 500);
  }

  async.waterfall([getUserRequest, getUserFriendsRequest], (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(JSON.stringify(results));
  });

  //PORT | https
  // const funcHttpsLocal = async() => {
  //   const certs = await httpsLocalhost.getCerts()
  //   return https.createServer(certs, server).listen(8000, () => {
  //     console.log('done');
  //   })
  // }

  // funcHttpsLocal()

  // const io = socketIO.listen(app);
  // // รอการ connect จาก client
  // io.on("connection", async (client) => {
  //   console.log("user connected gggww");

  //   // เมื่อ Client ตัดการเชื่อมต่อ
  //   client.on("disconnect", () => {
  //     console.log("user disconnected");
  //   });

  //   // ส่งข้อมูลไปยัง Client ทุกตัวที่เขื่อมต่อแบบ Realtime
  //   client.on("sent-message", function (message) {
  //     io.sockets.emit("new-message", message);
  //   });
  // });
});
