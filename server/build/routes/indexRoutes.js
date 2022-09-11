"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = __importDefault(require("../controllers/usuarios/usuariosController"));
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/api/usuarios", usuariosController_1.default.getUser);
        this.router.get("/api/categorias", usuariosController_1.default.getCategorias);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
