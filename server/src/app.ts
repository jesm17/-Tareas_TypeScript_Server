import express, { Application } from 'express';
// import indexRoutes from './routes/usuarios/indexRoutes'; 
import usuarioRoutes from './routes/usuarios/usuarioRoutes';
import morgan from "morgan";
import cors from "cors";

import categoriasRoutes from './routes/categorias/categoriasRoutes';
import routesEstados from './routes/estados/routesEstados';

class Server {
    public app: Application // import app from express
    constructor() {
        this.app = express(); // initialize express instance
        this.config(); // initialize config instance
        this.route(); // initialize route instance
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000); // set default port to 3000 if not specified
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use(express.json())
    }
    
    route(): void {
        this.app.use(usuarioRoutes);
        this.app.use(categoriasRoutes)
        this.app.use(routesEstados)// ruda de esatdos
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`listening on port `, this.app.get('port'));
        });
    }
}


const server = new Server(); // server instance
server.start(); // start server