const express = require("express")
const bodyParser = require("body-parser");
const token = require("./../middle/token")
const UsersModel = require("./../db/models/Users")
const ProfeModel = require("./../db/models/Profes")

const accessTokenSecret = token.secret
const refresherTokenSecret = token.refreshSecret
const emitter = token.tokenEmitter

const daoInstanceUser = new UsersModel.DAO()
const daoInstanceProfe = new ProfeModel.DAO()
const router = express.Router();

router.use(bodyParser.json()) // middleware

//router.get("/")

router.post("/",(req,res) => { // It works
//    console.log("in post");
    const { username, password } = req.body;
//    console.log(req.body);
    daoInstanceUser.check_user(username,password)
        .then((exists) => { // change to promise chaining
            if(exists) {
                return daoInstanceUser.getByUsername(username)
            } else {
                res.status(401)
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
            daoInstanceProfe.is(username).then((isProfe) => {
                const accessToken = emitter({ 
                    username: user.username,
                    user_id: user.id,
                    role: isProfe ? "profe" : "alumne",
                });
                res.status(200)
                res.json({
                    ok:true,
                    data:
                    { 
                        accessToken,
                        avatar:user.avatar
                    }
                });
            })
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