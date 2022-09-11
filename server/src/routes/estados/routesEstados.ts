import { Router } from "express";
import estadoController from "../../controllers/estados/estadosController";

class EstadoRouter {
    router:Router= Router()
    constructor() {
        this.config()
    }
    config():void {
        this.router.get('/api/estados', estadoController.getAllEstados)
        this.router.post('/api/estados/add', estadoController.createEstado)
        this.router.delete('/api/estados/delete/:id_estado', estadoController.deleteEstado)
        this.router.put('/api/estados/update/', estadoController.updateEstado)
    }
}
const estadosRouter = new EstadoRouter();
export default estadosRouter.router