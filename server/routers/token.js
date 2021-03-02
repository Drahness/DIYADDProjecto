const express = require("express")
const bodyParser = require("body-parser");
const token = require("./../middle/token")
const router = express.Router();
router.use(bodyParser.json()) // middleware

router.post("/", (request, response) => {
    if ( request.body.token ) {
        token.refreshToken(request.body.token)
            .then((result) => {
                console.log(result)
                response.status(200)
                response.json({
                    ok:true,
                    data: result
                })
            })
            .catch((error) => {
                response.sendStatus(403)
            })
    } else {
        response.sendStatus(403)
    }
})

exports.router = router