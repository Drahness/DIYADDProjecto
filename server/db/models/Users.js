const Connector = require("../connector");


class DAOUsers {
    constructor() {
        this.mydb = new Connector.Connector()
    }

    getByID(id) {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = "SELECT * FROM docencia.users where id = ?";
            conn.query(sql,[id], function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results, fields);
                }
            })
        })
    }
    getAll() {
        return new Promise((resolve, reject) => {
            let conn = this.mydb.getConnection();
            let sql = "SELECT * from users";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results, fields);
                }
            })
        });
    }
    update(id,json) {
        return new Promise((resolve ,reject ) => {
            let conn = this.mydb.getConnection();
            let sql =   "UPDATE users WHERE id = ?" + 
                            " SET username = ?, "+
                            " password = ?,"+
                            " full_name = ?,"+
                            " avatar = ?"
            conn.query(sql,[id, json.username, json.password, json.full_name, json.avatar], function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results, fields);
                }
            })
        });
    }
    delete(id) {
        return new Promise((resolve ,reject ) => {
            let conn = this.mydb.getConnection();
            let sql =   "DELETE FROM users WHERE id = ?" + 
            conn.query(sql,[id], function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results, fields);
                }
            })
        });
    }
    insert(json) {
        return new Promise((resolve ,reject ) => {
            let conn = this.mydb.getConnection();
            let sql = "INSERT INTO users (username,password,full_name,avatar) VALUES (?,?,?,?,?)";
            conn.query(sql,[json.username,json.password,json.full_name,json.avatar], function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                else {
                    conn.end();
                    resolve(results, fields);
                }
            })
        });
    }
    check_user(user,password) {
        return new Promise((resolve ,reject ) => {
            let conn = this.mydb.getConnection();
            let sql = "SELECT count(*) FROM users where username = ? AND password = ?";
            conn.query(sql,[user,password], function (err, results, fields) {
                if (err) {
                    reject(err);
                }
                else if(results[0]["count(*)"] == 1) {
                    conn.end();
                    resolve(true);
                }
                else {
                    reject(false)
                }
            })
        });
    }
}

module.exports = {
    DAO: DAOUsers
}

const DAO = new DAOUsers()

/*DAO.check_user("Pepe","e10adc3949ba59abbe56e057f20f883e")
    .then((res) => console.log(res))
    .catch((err) => console.log(err))*/
/*
DAO.check_user("Pepe","e10adc3949ba59abbe56e057f20fs883e")
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    */