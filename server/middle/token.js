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

const tokenEmitter = (json) => {
    const token = jwt.sign(
        json,
        accessTokenSecret,
        { expiresIn: '20m' }
    );
    const refreshToken = jwt.sign(
        json,
        refreshTokenSecret
    );
    refreshers.push(refreshToken);
    return {token,refreshToken};
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
    DAO.isAlumne(req.user.username)
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
exports.onlyProfes = onlyProfes
exports.onlyAlumnes = onlyAlumnes