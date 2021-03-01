const express = require("express")
const bodyParser = require("body-parser");
const token = require("./../middle/token")
const profeDao = require("./../db/models/Profes")
const alumneDao = require("./../db/models/Alumnes")
const router = express.Router();
router.use(bodyParser.json()) // middleware


router.get("/", token.tokenCheck, (request,response) => {
    let DAO; 
    if(request.user.role == profeDao.ROLE) {
        DAO = new profeDao.DAO()
    } else {
        DAO = new alumneDao.DAO()
    }
    DAO.getAsignatures(request.user.user_id)
    .then((asignatures) => {
        const array = []
        asignatures.forEach((object) => {
            array.push({
                id_assig: object.id_assig ,
                cod_assig: object.cod_assig ,
                nom_assig: object.nom_assig ,
                modul: object.modul ,
                curs: object.curs ,
                hores: object.hores
            })
        })
        response.status(200)
        response.send(
            {
                ok: true,
                data: array    
            }
        )
    })
    .catch((err) => {
        console.log(err)
        response.status(500)
        response.send({ok: false, data:"Internal server error"})
    })
})

router.get("/:id", token.tokenCheck , (request,response) => {
    let DAO; 
    const id_assignatura = request.params.id
    if(request.user.role == profeDao.ROLE) {
        DAO = new profeDao.DAO()
    } else {
        DAO = new alumneDao.DAO()
    }
    DAO.getAsignatures(request.user.user_id)
    .then((asignatures) => {
        const array = []
        asignatures.forEach((object) => {
            array.push({
                id_assig: object.id_assig,
                cod_assig: object.cod_assig,
                nom_assig: object.nom_assig,
                modul: object.modul,
                curs: object.curs,
                hores: object.hores
            })
        })
        let asignatura = array.filter((object) => object.id_assig == id_assignatura)[0]
        if(asignatura) {
            response.status(200)
            response.send(
                {
                    ok: true,
                    data: asignatura  
                }
            )
        }
        else {
            response.status(404)
            response.send(
                {
                    ok: false,
                    data: "Not found"   
                }
            )
        }
    })
    .catch((err) => {
        console.log(err)
        response.status(500)
        response.send({ok: false, data: "Not found"})
    })
})
exports.router = router