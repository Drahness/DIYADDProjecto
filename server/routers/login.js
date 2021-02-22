const express = require("express")
const bodyParser = require("body-parser");
const router = express.Router();
const token = require("./../middle/token")
const UsersModel = require("./../db/models/Users")
const ProfeModel = require("./../db/models/Profes")
const daoInstanceUser = new UsersModel.DAO()
const daoInstanceProfe = new ProfeModel.DAO()

const accessTokenSecret = token.secret
const refresherTokenSecret = token.refreshSecret
const emitter = token.tokenEmitter

router.use(bodyParser.json()) // middleware

//router.get("/")

router.post("/",(req,res) => { // It works
//    console.log("in post");
    const { username, password } = req.body;
//    console.log(req.body);
    daoInstanceUser.check_user(username,password)
        .then((result) => { // change to promise chaining
            if(result) {
                daoInstanceUser.getByUsername(username)
                    .then((result) => { 
                        daoInstanceProfe.isProfe(username).then((isProfe) => {
                            const accessToken = emitter({ 
                                username: result.username,
                                user_id: result.id,
                                role: isProfe ? "profe" : "alumne",
                            });
                            res.status(200)
                            res.json({
                                ok:true,
                                data:
                                { 
                                    accessToken,
                                    avatar:result.avatar
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
                    })
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
        .catch((err) => {
            console.log(err)
            res.status(500)
            res.send({
                ok:false,
                err:
                { 
                    msg:"Internal Server Error"
                }
            });
        });
})

//router.put("/")

//router.del("/")

//router.delete("/")

exports.router = router