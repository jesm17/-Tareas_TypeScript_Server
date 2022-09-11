"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
class EstadoController {
    getAllEstados(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let estados;
            database_1.default.query('SELECT * FROM estado', (err, rows) => {
                if (err) {
                    console.log(err);
                    next();
                }
                else {
                    estados = rows;
                    res.json(estados).status(200).end();
                    // next()
                }
            });
        });
    }
    createEstado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { descripcion_estado } = req.body;
            yield database_1.default.query('INSERT INTO estado SET ?', [{ descripcion_estado }], (err, result) => {
                if (err) {
                    console.log(err);
                    next();
                }
                else {
                    res.json({ message: 'Estado creado con exito' });
                }
            });
        });
    }
    deleteEstado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_estado } = req.params;
            yield database_1.default.query('DELETE FROM estado WHERE id_estado = ' + id_estado, (err, result) => {
                if (err) {
                    console.log(err);
                    next(err);
                }
                else {
                    res.json({ message: 'Estado eliminado ' });
                }
            });
            console.log(id_estado);
        });
    }
    updateEstado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_estado, descripcion_estado } = req.body;
            yield database_1.default.query('UPDATE estado SET ? WHERE id_estado = ?', [{ descripcion_estado }, id_estado], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('success');
                    res.json({ message: 'Actualziado con exito' });
                }
            });
        });
    }
}
const estadoController = new EstadoController();
exports.default = estadoController;
