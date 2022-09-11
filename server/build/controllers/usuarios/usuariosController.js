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
class UsuariosController {
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuarios;
            yield database_1.default.query("SELECT * FROM usuario ORDER BY nombre ASC", (err, rows) => {
                if (err) {
                    console.log(err);
                    next();
                }
                else {
                    usuarios = rows;
                    res.json(usuarios).status(200).end();
                }
            });
        });
    }
    createUsuario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nombre, telefono, correo } = req.body;
            yield database_1.default.query('INSERT INTO usuario SET ? ', [{ id, nombre, telefono, correo }], (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({ message: 'ID del usuaio duplicado' }).status(500).end();
                }
                else {
                    res.json({ message: 'Usuario creado con exito' }).status(200).end();
                    console.log('success');
                }
            });
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query(`DELETE FROM usuario WHERE id = ?`, id, (err, result) => {
                if (err) {
                    res.json({ message: 'Usuario no eliminado' }).status(400).end();
                    next();
                }
                else {
                    res.json({ message: 'Se elimino con exito' }).status(200).end();
                }
            });
        });
    }
    asignarTarea(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario_t, id_estado_t, id_categoria_t, fecha_fin, fecha_inicio, descripcion_tarea } = req.body;
            yield database_1.default.query(`INSERT INTO tarea SET ?`, [{ id_usuario_t, id_estado_t, id_categoria_t, fecha_fin, fecha_inicio, descripcion_tarea }], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ message: 'Se le asigno la tarea al usuario con exito' });
                }
            });
        });
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let tareas = [];
            let usuario = [];
            yield database_1.default.query(`SELECT tarea.*, categoria.color, categoria.nombre_categoria, estado.descripcion_estado FROM tarea INNER JOIN categoria ON tarea.id_categoria_t=categoria.id_categoria INNER JOIN estado ON tarea.id_estado_t=estado.id_estado  WHERE tarea.id_usuario_t = ${id}`, (err, rows) => {
                if (err) {
                    console.log(err);
                    next();
                }
                else {
                    tareas = rows;
                    database_1.default.query(`SELECT * FROM usuario WHERE id = ${id}`, (err, rows) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            usuario = rows;
                            res.json([{ usuario: usuario, tareas: tareas }]).status(200).end();
                        }
                    });
                }
            });
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nombre, telefono, correo } = req.body;
            yield database_1.default.query(`UPDATE usuario SET ? WHERE id = ?`, [{ nombre, telefono, correo }, id], (err, rows) => {
                if (err) {
                    console.log(err);
                    next();
                }
                else {
                    res.json({ message: 'Usuario actualziado con exito' }).status(200).end();
                }
            });
        });
    }
    deleteTarea(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_tarea } = req.params;
            console.log(id_tarea);
            yield database_1.default.query(`DELETE FROM tarea WHERE id_tarea='${id_tarea}'`, (err, rows) => {
                if (err) {
                    console.log(err);
                    next();
                }
                else {
                    const message = 'Se elemino la tarea con exito';
                    res.json({ message: message }).status(200).end();
                }
            });
        });
    }
    updateTarea(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_tarea, descripcion_tarea, fecha_inicio, fecha_fin, id_categoria_t, id_estado_t, id_usuario_t } = req.body;
            database_1.default.query(`UPDATE tarea SET ? WHERE id_tarea =?`, [{ descripcion_tarea, fecha_inicio, fecha_fin, id_categoria_t, id_estado_t, id_usuario_t }, id_tarea], (err, rows) => {
                if (err) {
                    console.log(err);
                    next();
                }
                else {
                    const message = "Tarea actualizada con exito";
                    res.json({ message: message });
                }
            });
        });
    }
}
const usuariosController = new UsuariosController();
exports.default = usuariosController;
