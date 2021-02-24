const Connector = require("../connector");
const DAOUsers = require('./Users').DAO

/**
 * You need to pass all the parameters in the query. Watch out
 */
class DAOAsignatures {

    getAll() {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = " SELECT * FROM docencia.assignatura ";
            conn.query(sql, function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results);
                }
            })
        })
    }

    getByID(id) {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = "SELECT * FROM docencia.assignatura where id_assig = ?";
            conn.query(sql, [id], function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results[0]);
                }
            })
        })
    }

    update(id, json) {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();    
            let sql = "UPDATE docencia.assignatura SET cod_assig = ?, nom_assig = ?, modul = ?, curs = ?, hores = ? WHERE id_assig = ?;"
            conn.query(sql, [json.cod_assig ,json.nom_assig , json.modul, json.curs, json.hores, id], function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results[0]);
                }
            })
        })
    }
    
    insert(json) {
        return new Promise((resolve,reject) => {
            let conn = this.mydb.getConnection();
            let sql = "INSERT INTO docencia.assignatura (id_assig, cod_assig, nom_assig, modul, curs, hores) VALUES (?,?,?,?,?,?)"
            conn.query(sql, [json.id_assig,json.cod_assig,json.nom_assig,json.modul,json.curs, json.hores], function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results);
                }
            })
        })
    }

    getNotes(id) {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = " SELECT count(*) FROM docencia.notes WHERE id_assig = ? "
            conn.query(sql,[id], function (err,results) {
                if(err) {
                    reject(err)
                }
                else {
                    conn.end();
                    resolve(results)
                }
            })
        })
    }
}
/*

const DAO = new DAOAsignatures()

DAO.insert({cod_assig: "123", nom_assig:"asd", modul:"asda", curs:3, hores:4,id_assig:7}).then((res) => console.log(res)).catch((err) => console.log(err))
DAO.getByID(1).then((res) => console.log(res))
*/

module.exports = {
    DAO: DAOAsignatures
}