const express = require("express");
const app = express();
const login = require("./routers/login")
const register = require("./routers/register")
const notes = require("./routers/notes")
const asignatures = require("./routers/asignatures")
const moduls = require("./routers/moduls")
const fs = require("fs");
const https = require("https");
const bodyParser = require("body-parser");
const port = 1234;

// quitar 
/*
const middleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
        if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            // afegim a la petició les dades que venien en el jwt user
            req.user = user;
            // s'executa la segïuent funció, un cop s'ha fet el middleware
            next();
        });
    } else {
        res.sendStatus(401); // error 401(unauthorized);
    }
};
*/
https
    .createServer(
        {
            key: fs.readFileSync("certs/my_cert.key"),
            cert: fs.readFileSync("certs/my_cert.crt"),
        },
        app
    )
    .listen(port, () => console.log("Escuchando en puerto: ", port));


app.use(bodyParser.json()); // se necesita realmente?
/*
app.get("/users", middleware, (req, res) => {
    console.log("in post")
    const { username, password } = req.body;
    if(checkUser(username,password).admin) {
        res.status(200)
        res.send(users)
    }
    else {
        res.sendStatus(401)
    }
});
app.get("/", (req, res) => {
    res.send("aaaa");
});*/

app.use("/login", login.router)
app.use("/register", register.router)
app.use("/notes", notes.router)
app.use("/asignatures",asignatures.router)
app.use("/moduls",moduls.router)


exports.port = port