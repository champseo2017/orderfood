require("dotenv").config();
const express = require("express");
const next = require("next");
const cors = require("cors");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const socketIO = require("socket.io");
const frameguard = require("frameguard");
const bodyParser = require("body-parser");
const nocache = require("nocache");
const routePages = require("./pages/routes");
const routeApi = require("./api/routes");
const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, poweredByHeader: false });
const handle = app.getRequestHandler();
const https = require('https')
const httpsLocalhost = require("https-localhost")()
const nextExpress = require("next-express/server")(app).injectInto(express);

app.prepare().then(() => {
  const server = nextExpress();
  server.use(nocache());
  server.use(frameguard({ action: "deny" }));
  server.disable("x-powered-by");
  server.use(cors());
  // parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: true }));
  // parse application/json
  server.use(bodyParser.json());

  routePages(server);
  routeApi(server)

  server.all("*", (req, res) => {
    handle(req, res);
  });

  // const app = server.listen(port, function (err, result) {
  //   console.log("running in port http://localhost:" + port);
  // });
 
  // test noti
  server.listen(port, function (err, result) {
    console.log("running in port http://localhost:" + port);
  });

  //PORT | https
// const funcHttpsLocal = async() => {
//   const certs = await httpsLocalhost.getCerts()
//   return https.createServer(certs, server).listen(port, () => {
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
