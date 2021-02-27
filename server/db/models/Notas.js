const Connector = require("../connector");

/**
 * You need to pass all the parameters in the query. Watch out
 */
class DAONotes {
    constructor() {
        this.mydb = new Connector.Connector()
    }

    getAll() {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = " SELECT * FROM docencia.notes ";
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
    getByID(id_alumne,id_profe,id_assig) {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = " SELECT * FROM docencia.notes where id_alumne = ? AND id_profe = ? AND id_assig = ? ";
            conn.query(sql, [id_alumne,id_profe,id_assig], function (err, results) {
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
    update(id_alumne,id_profe,id_assig, json) {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();    
            let sql = "UPDATE docencia.notes SET nota = ? WHERE id_alumne = ? AND id_profe = ? AND id_assig = ?"
            conn.query(sql, [json.nota, id_alumne, id_profe, id_assig], function (err, results) {
                if (err) {
                    console.log(results)
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results);
                }
            })
        })
    }
    insert(json) {
        return new Promise((resolve,reject) => {
            let conn = this.mydb.getConnection();
            let sql = "INSERT INTO docencia.notes (id_alumne,id_profe,id_assig,nota) VALUES (?,?,?,?)"
            conn.query(sql, [json.id_alumne,json.id_profe,json.id_assig,json.nota], function (err, results) {
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
}
/*

const DAO = new DAOAsignatures()

DAO.insert({cod_assig: "123", nom_assig:"asd", modul:"asda", curs:3, hores:4,id_assig:7}).then((res) => console.log(res)).catch((err) => console.log(err))
DAO.getByID(1).then((res) => console.log(res))
*/

module.exports = {
    DAO: DAONotes
}