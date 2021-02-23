const express = require("express")
const bodyParser = require("body-parser");
const token = require("./../middle/token")
const daoprofes = require("./../db/models/Profes")
const daoasignatura = require("./../db/models/Asignatures")
const daoalumnes = require("./../db/models/Alumnes")
const router = express.Router();
router.use(bodyParser.json()) // middleware

router.get("/", token.tokenCheck,token.onlyProfes, (request,response) => {
    const DAO = new daoprofes.DAO()
    DAO.getAsignatures(request.user.user_id).then((res) => {
        const moduls = []
        res.forEach((object) => { // filtramos
            moduls.push({
                id_assig: object.id_assig,
                cod_assig: object.cod_assig,
                nom_assig: object.nom_assig,
                modul: object.modul,
                curs: object.curs,
                hores: object.hores
            })
        })
        response.send({ok:true,
                    data: moduls})

    }).catch((err) => {
        console.log(err)
        response.status(500)
        response.send({ok:false, err: "Internal server error"})
    })
})

router.get("/:id", token.tokenCheck ,token.onlyProfes, (request,response) => { // id asignatura
    console.log("get modules.js")
    let idModule = request.params.id
    let modulos;
    const DAO = new daoprofes.DAO()
    const DAOAlumnes = new daoalumnes.DAO()
    DAO.getAsignatures(request.user.user_id)
    .then((res) => {
       modulos = res.filter((json) => idModule == json.id_assig)
       // TODO
    })
    .catch((err) => {
        console.log(err)
        response.status(500)
        response.send({ok:false, err: "Internal server error"})
    })
    
})

exports.router = router