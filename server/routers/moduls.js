const express = require("express")
const bodyParser = require("body-parser");
const token = require("./../middle/token")

const router = express.Router();
router.use(bodyParser.json()) // middleware

router.get("/", token.tokenCheck,token.onlyProfes, (request,response) => {
    console.log("get modules.js")
    response.send("OK")
})


exports.router = router