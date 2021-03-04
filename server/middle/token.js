const jwt = require("jsonwebtoken");
const accessTokenSecret = "laParaulaSecretaDelServidor";
const refreshTokenSecret = "laParaulaSecretaDelServidorDeRefrescosCocacolaloco"
const refreshers = []
const expirationTime = '20m'
/**
 * @param {*} request 
 * @param {*} response 
 * @param {*} next next function
 */
const tokenChecker = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                console.log(authHeader,"error")
                return response.sendStatus(403);
            }
            request.user = user; // afegim a la petició les dades que venien en el jwt user
            next(); // next middleware
        });
    } else {
        response.sendStatus(401); // 401(unauthorized);
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
        { expiresIn: expirationTime }
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
const refreshToken = (tokenRefresher) => {
    return new Promise((resolve, reject) => {
        if(this.refreshCheck(tokenRefresher)) {
            jwt.verify(tokenRefresher, this.refreshSecret, (err, payload) => {
                delete payload.iat // Necesario, si no, devuelve siempre el mismo lol.
                if (err) {
                    reject(err)
                }
                else {
                    console.log('resolving')
                    resolve(jwt.sign(   payload,
                                        accessTokenSecret,
                                        { expiresIn: expirationTime }))
                }
            })
        } else {
            reject({ ok:true, data:"Not autorized" }) // idont know what to put here
        }
    })
}

const onlyProfes = (req, res, next) => {
    const requirement = require("../db/models/Profes")
    const DAO = new requirement.DAO()
    DAO.is(req.user.username)
        .then((is) => {
            if(is) {
                next()
            } else {
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
                next()
            } else {
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