import { Router } from "express";
import categoriasController from "../../controllers/categorias/categoriasController";

class CategoriaRouter{
    router:Router=Router()
    constructor(){
        this.config()
    }
    config():void{
        this.router.get("/api/categorias", categoriasController.getCategorias)
        this.router.delete("/api/categorias/:id",categoriasController.deleteCategoria)
        this.router.put("/api/categorias/update",categoriasController.updateCategoria)
        this.router.post("/api/categorias/add",categoriasController.agregarCategorias)
    }
}

const categoriaRoutes=new CategoriaRouter();
export default categoriaRoutes.router;
