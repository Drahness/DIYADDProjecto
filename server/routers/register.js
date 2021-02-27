const express = require("express");
const bodyParser = require("body-parser");
const md5 = require('md5')
const token = require("./../middle/token");
const UsersModel = require("./../db/models/Users");
const ProfeModel = require("./../db/models/Profes");
const AlumneModel = require("./../db/models/Alumnes");

const router = express.Router();
const daoInstanceUser = new UsersModel.DAO();
const daoInstanceProfe = new ProfeModel.DAO();
const daoInstanceAlumne = new AlumneModel.DAO();
const emitter = token.tokenEmitter;

router.use(bodyParser.json()); // middleware

//router.get("/")

router.post("/", (req, res) => {
  // It works
  const { dni, username, password, full_name, avatar } = req.body;
  let role;
  if (
    !(username === "" || username == undefined) &&
    !(password === "" || password == undefined)
  ) {
    const encriptedPassword = md5(password)
    daoInstanceUser
      .getByUsername(username)
      .then((exists) => {
        if (!exists) {
          // not exists
          return daoInstanceProfe.checkDNI(dni);
        } else {
          res.status(400);
          res.send({
            ok: false,
            data: "User already exists"
          });
        }
      })
      .then((isProfe) => {
        //console.log(isProfe)
        if (isProfe) {
          role = "profe";
          return daoInstanceProfe.insert({
            username: username,
            password: encriptedPassword,
            full_name: full_name,
            avatar: avatar,
          });
        } else {
          role = "alumne";
          return daoInstanceAlumne.insert({
            username: username,
            password: encriptedPassword,
            full_name: full_name,
            avatar: avatar,
          });
        }
      }) // dni checked
      .then((insertionResult) => {
        const accessToken = emitter({
          username: username,
          user_id: insertionResult.insertId,
          role: role,
        });
        res.status(200);
        res.json({
          ok: true,
          data: {
            accessToken,
            avatar: avatar,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.send({
          ok: false,
          data: {
            msg: "Internal Server Error",
          },
        });
      });
  } else {
    res.status(400);
    console.log(req.body)
    res.send({
      ok: false,
      data: {
        msg: "Bad Request",
      },
    });
  }
});

//router.put("/")

//router.del("/")

//router.delete("/")

exports.router = router;
