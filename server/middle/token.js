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

exports.sign = jwt.sign
exports.tokenCheck = tokenChecker
exports.tokenEmitter = tokenEmitter
exports.secret = accessTokenSecret
exports.refreshSecret = refreshTokenSecret