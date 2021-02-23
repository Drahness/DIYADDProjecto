const Connector = require("../connector");
const DAOUsers = require('./Users').DAO

/**
 * You need to pass all the parameters in the query. Watch out
 */
class DAOAlumnes extends DAOUsers {
    getAll() {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = " SELECT * FROM docencia.users " +
                " right join docencia.alumne on users.id = alumne.id_alumne ";
            conn.query(sql, [id], function (err, results) {
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
            let sql = "SELECT * FROM docencia.users " +
                " right join docencia.alumne on users.id = alumne.id_alumne " +
                " where id_alumne = ? ";
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
    getByUsername(username) {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = "SELECT * FROM docencia.users " +
                " right join docencia.alumne on users.id = alumne.id_alumne " +
                " where username = ? ";
            conn.query(sql, [username], function (err, results) {
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
            return super.update(id, json)
                .then((result) => {
                    let sql = "UPDATE alumne SET repetidor = ?, curs = ? WHERE id_alumne = ?"
                    conn.query(sql, [json.departament ,json.curs , id], function (err, results) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            conn.end();
                            resolve(results[0]);
                        }
                    })
                })
                .catch((err) => reject(err));
        })
    }
    insert(json) {
        return new Promise((resolve,reject) => {
        let conn = this.mydb.getConnection();
        return super.insert(json)
            .then((result) => {
                const id = result.insertId
                let sql = "INSERT INTO alumne (id_alumne ,repetidor ,curs) VALUES (?,?,?)"
                conn.query(sql, [id,json.repetidor,json.curs], function (err, results) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        conn.end();
                        results.insertId = id
                        resolve(results);
                    }
                })
            })
            .catch((err) => reject(err));
        })
    }

    is(username) { // works
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = "SELECT count(*) FROM docencia.alumne dp left join docencia.users du on du.id = dp.id_alumne where username = ?"
            conn.query(sql,[username], function (err,results) {
                if(err) {
                    reject(err)
                }
                else {
                    conn.end();
                    resolve(results[0]["count(*)"] == 1)
                }
            })
        })
    }
}


//let DA = new DAOAlumnes()
/*
DA.isAlumne("Ambros").then((res) => console.log(res)).catch((err) => console.log(err))
DA.insert({username:"Alumne1",password:"asdas",full_name:"Alumnes1Full",repetidor:true,curs:1}).then((res) => console.log(res)).catch((err) => console.log(err))
DA.insert({username:"Alumne1",password:"asdas",full_name:"Alumnes1Full",repetidor:false,curs:1}).then((res) => console.log(res)).catch((err) => console.log(err))*/
module.exports = {
    DAO: DAOAlumnes
}