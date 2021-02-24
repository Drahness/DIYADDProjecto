const express = require("express")
const bodyParser = require("body-parser");
const token = require("./../middle/token")

const router = express.Router();
router.use(bodyParser.json()) // middleware


router.get("/", token.tokenCheck,token.onlyAlumnes, (request,response) => {
    
})

router.get("/:id", token.tokenCheck ,token.onlyAlumnes, (request,response) => {
    console.log("get asignatures.js")

    response.send({msg:"OK",id:request.params.id})
})
exports.router = router