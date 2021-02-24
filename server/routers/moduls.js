const express = require("express");
const bodyParser = require("body-parser");
const token = require("./../middle/token");
const daoprofes = require("./../db/models/Profes");
const router = express.Router();
router.use(bodyParser.json()); // middleware

router.get("/", token.tokenCheck, token.onlyProfes, (request, response) => {
  const DAO = new daoprofes.DAO();
  DAO.getAsignatures(request.user.user_id)
    .then((res) => {
      const moduls = [];
      res.forEach((object) => {
        // filtramos
        moduls.push({
          id_assig: object.id_assig,
          cod_assig: object.cod_assig,
          nom_assig: object.nom_assig,
          modul: object.modul,
          curs: object.curs,
          hores: object.hores,
        });
      });
      response.status(200);
      response.send({ ok: true, data: moduls });
    })
    .catch((err) => {
      console.log(err);
      response.status(500);
      response.send({ ok: false, err: "Internal server error" });
    });
});

router.get("/:id", token.tokenCheck, token.onlyProfes, (request, response) => {
  // id asignatura
  console.log("get modules.js");
  let idAsignatura = request.params.id;
  let modulos;
  const DAOProfes = new daoprofes.DAO();
  
  DAOProfes.getAsignaturaDetalls(request.user.user_id,idAsignatura)
    .then((results) => {
      const moduls = []
      results.forEach((object) => {
          moduls.push({
            id_alumne: object.id_alumne,
            full_name: object.full_name,
            id_assig: object.id_assig,
            cod_assig: object.cod_assig,
            nota: object.nota,
            links: {
                "assig":"GET https://localhost:1234/assignatura/"+object.id_assig,
                "alumne":"GET https://localhost:1234/alumne/"+object.id_alumne,
                "nota": "PUT https://localhost:1234/moduls/"+object.id_assig+"/"+object.id_alumne
            },
          })
      })
      response.status(200);
      response.send({ ok: true, data: moduls })
    })
    .catch((err) => {
      console.log(err);
      response.status(500);
      response.send({ ok: false, err: "Internal server error" });
    });
});

exports.router = router;
