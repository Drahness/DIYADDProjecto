const jwt = require("jsonwebtoken");


const accessTokenSecret = "laParaulaSecretaDelServidor";
const refreshTokenSecret = "laParaulaSecretaDelServidorDeRefrescosCocacolaloco"
const refreshers = []

const tokenChecker = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user; // afegim a la petició les dades que venien en el jwt user
            next(); // next middleware
        });
    } else {
        res.sendStatus(401); // 401(unauthorized);
    }
};
/**
 * Returns a map of token and refreshToken
 * @param {*} payload the JSON of the things inside the token
 */

const tokenEmitter = (payload) => {
    const token = jwt.sign(
        payload,
        accessTokenSecret,
        { expiresIn: '20m' }
    );
    const refreshToken = jwt.sign(
        payload,
        refreshTokenSecret
    );
    refreshers.push(refreshToken);
    return {token,refreshToken};
}
const refreshCheck = (tokenRefresher) => {
    return refreshers.findIndex((obj) => obj === tokenRefresher) != -1 
}

/**
 * Returns a new token of the refresher
 */
const refreshToken = (tokenRefresher) {
    return new Promise((resolve, reject) => {
        if(this.refreshCheck(tokenRefresher)) {
            jwt.verify(refreshToken, this.refreshSecret, (err, payload) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(jwt.sign(   payload,
                                        accessTokenSecret,
                                        { expiresIn: '20m' }))
                }
            })
        } else {
            reject("Not autorized") // idont know what to put here
        }
    })
}

const onlyProfes = (req, res, next) => {
    const requirement = require("../db/models/Profes")
    const DAO = new requirement.DAO()
    DAO.is(req.user.username)
        .then((is) => {
            if(is) {
                console.log("profe next")
                next()
            } else {
                console.log("forbidden")
                res.status(401)
                res.send({
                    ok: false,
                    err: "Acceso no autorizado"
                })
            }
        })
}

const onlyAlumnes = (req, res, next) => {
    const requirement = require("../db/models/Alumnes")
    const DAO = new requirement.DAO()
    DAO.is(req.user.username)
        .then((is) => {
            if(is) {
                console.log("alumne next")
                next()
            } else {
                console.log("forbidden")
                res.status(401)
                res.send({
                    ok: false,
                    err: "Acceso no autorizado"
                })
            }
        })
}

exports.sign = jwt.sign
exports.tokenCheck = tokenChecker
exports.tokenEmitter = tokenEmitter
exports.secret = accessTokenSecret
exports.refreshSecret = refreshTokenSecret
exports.refreshToken = refreshToken
exports.refreshCheck = refreshCheck
exports.onlyProfes = onlyProfes
exports.onlyAlumnes = onlyAlumnes