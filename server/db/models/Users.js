const Connector = require("../connector");
/**
 * You need to pass all the parameters in the query. Watch out
 */
class DAOUsers {
    constructor() {
        this.mydb = new Connector.Connector()
    }

    getConnection() {
        return this.mydb
    }
    
    getByUsername(username) {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = "SELECT * FROM docencia.users where username = ?";
            conn.query(sql,[username], function (err, results) {
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

    getByID(id) {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = "SELECT * FROM docencia.users where id = ?";
            conn.query(sql,[id], function (err, results) {
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

    getAll() {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = "SELECT * from users";
            conn.query(sql, function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results);
                }
            })
        });
    }

    update(id,json) {
        return new Promise((resolve ,reject ) => {
            let conn = this.mydb.getConnection();
            let sql =   "UPDATE users" + 
                            " SET username = ?, "+
                            " password = ?,"+
                            " full_name = ?,"+
                            " avatar = ? " + 
                            " WHERE id = ? "
            conn.query(sql,[json.username, json.password, json.full_name, json.avatar,id], function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results);
                }
            })
        });
    }

    delete(id) {
        return new Promise((resolve ,reject) => {
            let conn = this.mydb.getConnection();
            let sql =   "DELETE FROM users WHERE id = ?" + 
            conn.query(sql,[id], function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results);
                }
            })
        });
    }

    insert(json) {
        return new Promise((resolve ,reject) => {
            let conn = this.mydb.getConnection();
            let sql = "INSERT INTO users (username,password,full_name,avatar) VALUES (?,?,?,?)";
            conn.query(sql,[json.username,json.password,json.full_name,json.avatar], function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results);
                }
            })
        });
    }
    check_user(user,password) {
        return new Promise((resolve ,reject ) => {
            let conn = this.mydb.getConnection();
            let sql = "SELECT count(*) FROM users WHERE UPPER(username) = UPPER(?) AND password = ?";
            conn.query(sql,[user,password], function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results[0]["count(*)"] == 1)
                }
            })
        });
    }
    checkDNI(dni) {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = "SELECT count(*) FROM docencia.dni_profe where dni = ?"
            conn.query(sql,[dni], function (err,results) {
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

module.exports = {
    DAO: DAOUsers
}
