const express = require("express")
const bodyParser = require("body-parser");
const token = require("./../middle/token")
const UsersModel = require("./../db/models/Users")
const ProfeModel = require("./../db/models/Profes")
const MD5 = require('md5')

const accessTokenSecret = token.secret
const refresherTokenSecret = token.refreshSecret
const emitter = token.tokenEmitter

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
                    err:
                    { 
                        msg:"Username or password incorrect"
                    }
                })
            }
        })
        .then((user) => { 
            if(user) {
                userTrying = user
                return daoInstanceProfe.is(username)
            } else {
                res.status(200)
                res.json(
                    {
                        ok: false,
                        err: 
                        {
                            msg: "User not found idont know what, error of server"
                        }
                    }
                )
            }
        })
        .then((isProfe) => {
            const accessToken = emitter({ 
                username: userTrying.username,
                user_id: userTrying.id,
                role: isProfe ? "profe" : "alumne",
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
            res.status(500)
            res.send({
                ok:false,
                err:
                { 
                    msg:"Internal Server Error"
                }
            })
        });
})

//router.put("/")

//router.del("/")

//router.delete("/")

exports.router = router