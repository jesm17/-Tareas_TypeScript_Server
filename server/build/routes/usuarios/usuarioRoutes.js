"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = __importDefault(require("../../controllers/usuarios/usuariosController"));
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/api/usuarios", usuariosController_1.default.getUsers);
        this.router.get("/api/usuarios/:id", usuariosController_1.default.getUser);
        this.router.post("/api/usuarios/add", usuariosController_1.default.createUsuario);
        this.router.delete("/api/usuarios/:id", usuariosController_1.default.deleteUser);
        this.router.post("/api/usuario/add/tarea", usuariosController_1.default.asignarTarea);
        this.router.put("/api/usuario/update", usuariosController_1.default.updateUser);
        this.router.delete("/api/usuario/delete/tarea/:id_tarea", usuariosController_1.default.deleteTarea);
        this.router.put("/api/usuario/update/tarea", usuariosController_1.default.updateTarea);
        // this.router.get("/api/categorias", usuariosController.getCategorias)
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
