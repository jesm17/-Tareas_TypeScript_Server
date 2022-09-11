import {Router} from "express"
import usuariosController from "../../controllers/usuarios/usuariosController"



class UsuarioRoutes {
     router:Router= Router()
    constructor() {
        this.config()
    }
    config():void {
        this.router.get("/api/usuarios", usuariosController.getUsers)
        this.router.get("/api/usuarios/:id", usuariosController.getUser)
        this.router.post("/api/usuarios/add", usuariosController.createUsuario)
        this.router.delete("/api/usuarios/:id", usuariosController.deleteUser)
        this.router.post("/api/usuario/add/tarea", usuariosController.asignarTarea)
        this.router.put("/api/usuario/update", usuariosController.updateUser)
        this.router.delete("/api/usuario/delete/tarea/:id_tarea", usuariosController.deleteTarea)
        this.router.put("/api/usuario/update/tarea", usuariosController.updateTarea)
        // this.router.get("/api/categorias", usuariosController.getCategorias)
    }
}
const usuarioRoutes= new UsuarioRoutes()
export default usuarioRoutes.router