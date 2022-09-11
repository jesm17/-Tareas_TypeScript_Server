"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import indexRoutes from './routes/usuarios/indexRoutes'; 
const usuarioRoutes_1 = __importDefault(require("./routes/usuarios/usuarioRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const categoriasRoutes_1 = __importDefault(require("./routes/categorias/categoriasRoutes"));
const routesEstados_1 = __importDefault(require("./routes/estados/routesEstados"));
class Server {
    constructor() {
        this.app = (0, express_1.default)(); // initialize express instance
        this.config(); // initialize config instance
        this.route(); // initialize route instance
    }
    config() {
        this.app.set('port', process.env.PORT || 3000); // set default port to 3000 if not specified
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    route() {
        this.app.use(usuarioRoutes_1.default);
        this.app.use(categoriasRoutes_1.default);
        this.app.use(routesEstados_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`listening on port `, this.app.get('port'));
        });
    }
}
const server = new Server(); // server instance
server.start(); // start server
