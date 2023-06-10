const express = require('express');
const PORT = 8080;
const routes = require('./routes');

class Server{
    constructor(){
        this.app = express();
        this.routes();
    }


    routes(){
        routes(this.app);
    }

    listen(){
        this.app.listen(PORT,() => {console.log(`http://localhost:${PORT}`)});
    }
}


module.exports = new Server();


