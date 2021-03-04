const express = require("express");
const bodyParser = require("body-parser");
const token = require("./../middle/token")
const daoprofes = require("./../db/models/Profes")
const daonotes = require("./../db/models/Notas")
const router = express.Router();
router.use(bodyParser.json())

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
        response.send({ok:false, data: "Internal server error"})
    })
})

router.get("/:id", token.tokenCheck ,token.onlyProfes, (request,response) => { // id asignatura
    const idModule = request.params.id
    const DAO = new daoprofes.DAO()
    DAO.getAsignaturaDetalls(request.user.user_id,idModule)
    .then((res) => {
        let object = []
        res.forEach((instance) => {
            console.log(instance)
            object.push({
                id_alumne: instance.id_alumne,
                full_name: instance.full_name,
                id_assig: instance.id_assig,
                cod_assig: instance.cod_assig,
                nota: instance.nota,
                link: {
                    assig:"GET https://"+request.socket.localAddress+":"+request.socket.localPort+"/asignatures/"+instance.id_assig,
                    alumne:"GET https://"+request.socket.localAddress+":"+request.socket.localPort+"/alumne/"+instance.id_alumne,
                    nota: "PUT https://"+request.socket.localAddress+":"+request.socket.localPort+"/moduls/"+instance.id_assig+"/"+instance.id_alumne
                }
            })
        })
        if(object) {
            response.status(200)
            response.send({
                ok:true, 
                data:object
            })
        }
        else {
            response.status(404)
            response.send({ok:false,data:"Not found"})
        }
    })
    .catch((err) => {
        console.log(err)
        response.status(500)
        response.send({ok:false, data: "Internal server error"})
    })
    .catch((err) => {
      console.log(err);
      response.status(500);
      response.send({ ok: false, data: "Internal server error" });
    });
});

router.put("/:id_modul/:id_alumne", token.tokenCheck, token.onlyProfes, (request,response) => {
    console.log("put modules.js ")
    const id_modul = request.params.id_modul
    const id_alumne = request.params.id_alumne
    const id_profe = request.user.user_id
    const nota = request.body.nota
    const DAO = new daonotes.DAO()
    console.log(id_modul,id_profe,id_alumne)
    DAO.getByID(id_alumne,id_profe,id_modul)
    .then((result) => {
        console.log("result",result)
        if(result) { // existe
            return DAO.update(id_alumne,id_profe,id_modul,{nota:nota})
        } else {
            response.status(400)
            response.send({ok:false, data: "Asignatura, profe o alumne inexistent."})
        }
    })
    .then((updateResult) => {
        response.status(200)
        response.send({ok:true,data: updateResult})
    })
    .catch((error) => {
        console.log(error)
        response.status(400)
        response.send({ok:false, data: error})
    })
}) 


exports.router = router
