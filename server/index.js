const express = require("express");
const app = express();
const login = require("./routers/login")
const register = require("./routers/register")
const notes = require("./routers/notes")
const asignatures = require("./routers/asignatures")
const moduls = require("./routers/moduls")
const fs = require("fs");
const https = require("https");
const cors = require('cors')
const port = 1234;

/*app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  }); */
 app.use(cors())
https
    .createServer(
        {
            key: fs.readFileSync("certs/my_cert.key"),
            cert: fs.readFileSync("certs/my_cert.crt"),
        },
        app
    )
    .listen(port, () => console.log("Escuchando en puerto: ", port));

app.use("/login", login.router)
app.use("/register", register.router)
app.use("/notes", notes.router)
app.use("/asignatures",asignatures.router)
app.use("/moduls",moduls.router)