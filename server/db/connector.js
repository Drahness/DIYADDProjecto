var mysql=require('mysql');

class Connector{
    constructor(){}

    getConnection(){
        // Retorna una connexió a la BD MySQL
        return mysql.createConnection(
            {
            insecureAuth : true, 
            host     : '127.0.0.1',
            port     : '3306',
            user     : 'node',
            password : 'nodenode',
            database : 'docencia'
          }); 
    }
}

module.exports = {
    Connector:Connector
}