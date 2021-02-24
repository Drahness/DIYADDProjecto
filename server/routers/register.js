const express = require("express");
const bodyParser = require("body-parser");
const token = require("./../middle/token");
const UsersModel = require("./../db/models/Users");
const ProfeModel = require("./../db/models/Profes");
const AlumneModel = require("./../db/models/Alumnes");

const router = express.Router();
const daoInstanceUser = new UsersModel.DAO();
const daoInstanceProfe = new ProfeModel.DAO();
const daoInstanceAlumne = new AlumneModel.DAO();
const accessTokenSecret = token.secret;
const refresherTokenSecret = token.refreshSecret;
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
    daoInstanceUser
      .getByUsername(username)
      .then((exists) => {
        if (!exists) {
          // not exists
          return daoInstanceProfe.checkDNI(dni);
        } else {
          res.status(401);
          res.send({
            ok: false,
            err: {
              msg: "User already exists",
            },
          });
        }
      })
      .then((isProfe) => {
        //console.log(isProfe)
        if (isProfe) {
          role = "profe";
          return daoInstanceProfe.insert({
            username: username,
            password: password,
            full_name: full_name,
            avatar: avatar,
          });
        } else {
          role = "alumne";
          return daoInstanceAlumne.insert({
            username: username,
            password: password,
            full_name: full_name,
            avatar: avatar,
          });
        }
      }) // dni checked
      .then((insertionResult) => {
        //console.log(insertionResult)
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
          err: {
            msg: "Internal Server Error",
          },
        });
      });
  } else {
    res.status(400);
    res.send({
      ok: false,
      err: {
        msg: "Bad Request",
      },
    });
  }
});

//router.put("/")

//router.del("/")

//router.delete("/")

exports.router = router;
