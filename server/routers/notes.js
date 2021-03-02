const express = require("express");
const bodyParser = require("body-parser");
const token = require("./../middle/token");
const daoAlumne = require("./../db/models/Alumnes")
const router = express.Router();
router.use(bodyParser.json()); // middleware

router.get("/", token.tokenCheck, token.onlyAlumnes, (request, response) => {
  const DAO = new daoAlumne.DAO()
  DAO.getNotes(request.user.user_id).then((res) => {
      const moduls = []
      res.forEach((object) => { // filtramos
          moduls.push({
              id_assig: object.id_assig,
              cod_assig: object.cod_assig,
              nota: object.nota,
              link: {
                  get:"GET https://"+request.socket.localAddress+":"+request.socket.localPort+"/assignatura/"+object.id_assig
              }
          })
      })
      response.send({ok:true,
                  data: moduls})

  }).catch((err) => {
      console.log(err)
      response.status(500)
      response.send({ok:false, data: "Internal server error"})
  })
});

router.get("/:id", token.tokenCheck, token.onlyAlumnes, (request, response) => {
  const DAO = new daoAlumne.DAO()
  DAO.getNotes(request.user.user_id).then((res) => {
      let result = res[request.params.id]
      let notaConcreta = {} 
      notaConcreta.id_assig = result.id_assig,
      notaConcreta.cod_assig = result.cod_assig,
      notaConcreta.nom_assig = result.nota,
      notaConcreta.link = {
          get:"GET https://"+request.socket.localAddress+":"+request.socket.localPort+"/assignatura/"+result.id_assig
      }
      response.send({ok:true,
                  data: notaConcreta})

  }).catch((err) => {
      console.log(err)
      response.status(500)
      response.send({ok:false, data: "Internal server error"})
  })
});

exports.router = router;
