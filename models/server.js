const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';
        //Llamada a conectarDB
        this.conectarDB();
        //Middelware
        this.middlewares();
        //Rutas de la aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }
    
    //aqui se define el metodo middleware que publicara la carpeta public
    middlewares(){
        //CORS --> Proteger el acceso a nuestra API
        this.app.use(cors());
        //lectura y parseo del body recibe lo que se envia
        this.app.use(express.json());
        //Directorio Publico
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.usuariosPath,require('../routes/usuarios'))
    }

    listen() {

        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto ',this.port)
        })
    }

}

module.exports = Server;
