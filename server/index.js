const express = require("express");
const app = express();

const fs = require("fs");
const https = require("https");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const port = 1234;

const middleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("in middleware")
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
        // no està. contestem directament al client amb un error 401(unauthorized);
        res.sendStatus(401);
    }
};

users = [
    {
        username: "Joan",
        password: "1234",
        admin: true,
    },
    {
        username: "user",
        password: "1234",
        admin: false,
    },
];

const checkUser = (username, password) => {
    const user = users.find((u) => {
        return u.username === username && u.password === password;
    });
    return user
}
https
    .createServer(
        {
            key: fs.readFileSync("certs/my_cert.key"),
            cert: fs.readFileSync("certs/my_cert.crt"),
        },
        app
    )
    .listen(port, () => console.log("Escuchando en puerto: ", port));

const accessTokenSecret = "laParaulaSecretaDelServidor";

app.use(bodyParser.json());
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
});

app.post("/login", (req, res) => {
    // procesamos request
    // Llegim username and password des del cos
    console.log("in post");
    const { username, password } = req.body;
    console.log(req.body);
    // Filtrem de l'array d'usuaris, i comprovem si existeix o no
    const user = users.find((u) => {
        return u.username === username && u.password === password;
    });
    if (user) {
        // Generarem el token
        const accessToken = jwt.sign(
            { username: user.username, role: user.role },
            accessTokenSecret
        );
        // carreguem el la resposta el jwt que hem generat
        res.json({
            accessToken,
        });
    } else {
        res.send("Username or password incorrect");
    }
});
