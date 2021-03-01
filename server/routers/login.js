const express = require("express")
const bodyParser = require("body-parser");
const token = require("./../middle/token")
const UsersModel = require("./../db/models/Users")
const ProfeModel = require("./../db/models/Profes")
const MD5 = require('md5');
const { response } = require("express");
const Alumnes = require("../db/models/Alumnes");

const daoInstanceUser = new UsersModel.DAO()
const daoInstanceProfe = new ProfeModel.DAO()
const router = express.Router();

router.use(bodyParser.json()) // middleware

//router.get("/")

router.post("/",(req,res) => { // It works
    const { username, password } = req.body;
    console.log(req.body, 'login');
    const encryptedPassword = MD5(password)
    let userTrying;
    daoInstanceUser.check_user(username,encryptedPassword)
    .then((exists) => { // change to promise chaining
        if(exists) {
            return daoInstanceUser.getByUsername(username)
        } else {
            res.status(200)
            res.send({
                ok:false,
                data: "Username or password incorrect"
            })
        }
    })
    .then((user) => { 
        if(user) {
            userTrying = user
            return daoInstanceProfe.is(username)
        } else {
            res.status(500)
            res.send(
                {
                    ok: false,
                    data: "User not found idont know what, error of server"
                }
            )
        }
    })
    .then((isProfe) => {
        const accessToken = token.tokenEmitter({ 
            username: userTrying.username,
            user_id: userTrying.id,
            role: isProfe ? ProfeModel.ROLE : Alumnes.ROLE,
        });
        res.status(200)
        res.json({
            ok:true,
            data:
            {
                accessToken,
                avatar:userTrying.avatar
            }
        });
    })
    .catch((err) => {
        console.log(err)
        if(!response.headersSent) {
            res.status(500)
            res.send({
                ok:false,
                data:"Internal Server Error"
            })
        }
    });
})

//router.put("/")

//router.del("/")

//router.delete("/")

exports.router = router