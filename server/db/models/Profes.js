const Connector = require("../connector");
const DAOUsers = require('./Users').DAO
/**
 * You need to pass all the parameters in the query. Watch out
 */
class DAOProfes extends DAOUsers {
    getAll() {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = " SELECT * FROM docencia.users " +
                " right join docencia.professor on users.id = professor.id_professor ";
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
            let sql = "SELECT * FROM docencia.users " +
                " right join docencia.professor on users.id = professor.id_professor " +
                " where id_professor = ? ";
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
                " right join docencia.professor on users.id = professor.id_professor " +
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
                    let sql = "UPDATE professor SET departament = ? WHERE id_professor = ?"
                    conn.query(sql, [json.departament, id], function (err, results) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            conn.end();
                            resolve(results);
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
                    console.log("pollas",result)
                    const id = result.insertId
                    let sql = "INSERT INTO professor (id_professor,departament) VALUES (?,?)"
                    conn.query(sql, [id,json.departament], function (err, results) {
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

    is(username) {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = "SELECT count(*) FROM docencia.professor dp left join docencia.users du on du.id = dp.id_professor where username = ?"
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

    getAsignatures(id) {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = "SELECT * FROM docencia.professor profes "+
            " right join docencia.notes notes on notes.id_profe = profes.id_professor "+
            " left join docencia.assignatura asig on  asig.id_assig = notes.id_assig where id_professor = ? "
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


module.exports = {
    DAO: DAOProfes
}


//const DAO = new DAOProfes()

//DAO.getAsignatures(2).then((a) => console.log(a))

/*
DAO.insert({username:"Pepasddaaasadasdasde", password:"e10adc3949ba59abbe56e057f20f883e"})
    .then((res) => console.log("bbbbbbbbbbbbbbbbbbb",res))
    .catch((err) => console.log(err))
DAO.insert({username:"Pssdadsaaaasdde", password:"e10adc3949ba59abbe56e057f20fs883e"})
    .then((res) => console.log("aaaaaaaaaaaaaaaaaaa",res))
    .catch((err) => console.log(err))
DAO.getByUsername("Pepe")
    .then((res) => { console.log(res) })    
*/