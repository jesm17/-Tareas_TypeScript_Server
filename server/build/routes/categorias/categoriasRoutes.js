"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriasController_1 = __importDefault(require("../../controllers/categorias/categoriasController"));
class CategoriaRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/api/categorias", categoriasController_1.default.getCategorias);
        this.router.delete("/api/categorias/:id", categoriasController_1.default.deleteCategoria);
        this.router.put("/api/categorias/update", categoriasController_1.default.updateCategoria);
        this.router.post("/api/categorias/add", categoriasController_1.default.agregarCategorias);
    }
}
const categoriaRoutes = new CategoriaRouter();
exports.default = categoriaRoutes.router;
