"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadosController_1 = __importDefault(require("../../controllers/estados/estadosController"));
class EstadoRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/api/estados', estadosController_1.default.getAllEstados);
        this.router.post('/api/estados/add', estadosController_1.default.createEstado);
        this.router.delete('/api/estados/delete/:id_estado', estadosController_1.default.deleteEstado);
        this.router.put('/api/estados/update/', estadosController_1.default.updateEstado);
    }
}
const estadosRouter = new EstadoRouter();
exports.default = estadosRouter.router;
