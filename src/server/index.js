require("dotenv").config();
const express = require("express");
const next = require("next");
const socketIO = require('socket.io');
const frameguard = require("frameguard");
const bodyParser = require("body-parser");
const nocache = require("nocache");
const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev,poweredByHeader: false });
const handle = app.getRequestHandler();
const nextExpress = require("next-express/server")(app).injectInto(express);

app.prepare().then(() => {
  const server = nextExpress();
  server.use(nocache());
  server.use(frameguard({ action: "deny" }));
  server.disable("x-powered-by");
  // parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: true }));
  // parse application/json
  server.use(bodyParser.json());

  //const http = require("http").Server(server);

  server.all("*", (req, res) => {
    handle(req, res);
  });


  const app = server.listen(port, function (err, result) {
    console.log('running in port http://localhost:' + port)
})

const io = socketIO.listen(app);
// รอการ connect จาก client
io.on('connection', client => {
    console.log('user connected')
  
    // เมื่อ Client ตัดการเชื่อมต่อ
    client.on('disconnect', () => {
        console.log('user disconnected')
    })

    // ส่งข้อมูลไปยัง Client ทุกตัวที่เขื่อมต่อแบบ Realtime
    client.on('sent-message', function (message) {
        io.sockets.emit('new-message', message)
    })
})

  // http.listen(port, (err) => {
  //   if (err) throw err;
  //   console.log(`> Ready on http://localhost:${port}`);
  // });
});
