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
class CategoriasController {
    getCategorias(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let categorias;
            try {
                yield database_1.default.query("SELECT * FROM categoria", (err, rows) => {
                    if (err) {
                        console.log(err);
                        next();
                    }
                    else {
                        categorias = rows;
                        res.json(categorias).status(200).end();
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    agregarCategorias(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre_categoria, color } = req.body;
            yield database_1.default.query('INSERT INTO categoria SET ? ', [{ nombre_categoria, color }], (err, result) => {
                if (err) {
                    console.log(err);
                    next();
                }
                else {
                    res.json({ message: 'Categoria guardada con exito' }).status(200).end();
                    console.log('success');
                }
            });
        });
    }
    deleteCategoria(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                database_1.default.query(`DELETE FROM categoria WHERE id_categoria=${id}`, (err, result) => {
                    if (err) {
                        console.log(err);
                        next();
                    }
                    else {
                        console.log(result);
                        res.json({ message: 'Se elimino con exito la categoria' }).status(200).end();
                    }
                });
            }
            catch (error) {
                console.log(error);
                next();
            }
        });
    }
    updateCategoria(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body);
            const { id_categoria, nombre_categoria, color } = req.body;
            database_1.default.query('UPDATE categoria SET ? WHERE id_categoria = ?', [{ nombre_categoria, color }, id_categoria], (err, result) => {
                if (err) {
                    console.log(err);
                    next();
                }
                else {
                    res.json({ message: 'Se actualizo con exito' }).status(200).end();
                }
            });
        });
    }
}
const categoriasController = new CategoriasController();
exports.default = categoriasController;
