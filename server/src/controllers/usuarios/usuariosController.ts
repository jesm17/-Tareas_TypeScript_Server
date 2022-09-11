import { Request, Response, NextFunction } from "express";

import pool from "../../database";

class UsuariosController {
    public async getUsers(req: Request, res: Response, next: NextFunction) {
        let usuarios: []
        await pool.query("SELECT * FROM usuario ORDER BY nombre ASC", (err, rows) => {
            if (err) {
                console.log(err);
                next()
            } else {
                usuarios = rows
                res.json(usuarios).status(200).end()
            }
        });
    }

    public async createUsuario(req: Request, res: Response, next: NextFunction) {
        const { id, nombre, telefono, correo } = req.body
        await pool.query('INSERT INTO usuario SET ? ', [{ id, nombre, telefono, correo }], (err, result) => {
            if (err) {
                console.log(err);
                res.json({ message: 'ID del usuaio duplicado' }).status(500).end()
            } else {
                res.json({ message: 'Usuario creado con exito' }).status(200).end()
                console.log('success');
            }
        })
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        await pool.query(`DELETE FROM usuario WHERE id = ?`, id, (err, result) => {
            if (err) {
                res.json({ message: 'Usuario no eliminado' }).status(400).end()
                next()
            } else {
                res.json({ message: 'Se elimino con exito' }).status(200).end()
            }
        })
    }

    public async asignarTarea(req: Request, res: Response, next: NextFunction) {
        const { id_usuario_t, id_estado_t, id_categoria_t, fecha_fin, fecha_inicio, descripcion_tarea } = req.body;
        await pool.query(`INSERT INTO tarea SET ?`, [{ id_usuario_t, id_estado_t, id_categoria_t, fecha_fin, fecha_inicio, descripcion_tarea }], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ message: 'Se le asigno la tarea al usuario con exito' })
            }
        })
    }

    public async getUser(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        let tareas: any = []
        let usuario: any = []
        await pool.query(`SELECT tarea.*, categoria.color, categoria.nombre_categoria, estado.descripcion_estado FROM tarea INNER JOIN categoria ON tarea.id_categoria_t=categoria.id_categoria INNER JOIN estado ON tarea.id_estado_t=estado.id_estado  WHERE tarea.id_usuario_t = ${id}`, (err, rows) => {
            if (err) {
                console.log(err);
                next()
            } else {
                tareas = rows
                pool.query(`SELECT * FROM usuario WHERE id = ${id}`, (err, rows) => {
                    if (err) {
                        console.log(err);
                    } else {
                        usuario = rows
                        res.json([{ usuario: usuario, tareas: tareas }]).status(200).end()
                    }
                })
            }
        })
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        const { id, nombre, telefono, correo } = req.body;
        await pool.query(`UPDATE usuario SET ? WHERE id = ?`, [{ nombre, telefono, correo }, id], (err, rows) => {
            if (err) {
                console.log(err);
                next()
            } else {
                res.json({ message: 'Usuario actualziado con exito' }).status(200).end()
            }
        })
    }

    public async deleteTarea(req: Request, res: Response, next: NextFunction) {
        const { id_tarea } = req.params
        console.log(id_tarea);

        await pool.query(`DELETE FROM tarea WHERE id_tarea='${id_tarea}'`, (err, rows) => {
            if (err) {
                console.log(err);
                next()
            } else {
                const message = 'Se elemino la tarea con exito'
                res.json({ message: message }).status(200).end()
            }
        })
    }

    public async updateTarea(req: Request, res: Response, next: NextFunction) {
        const { id_tarea, descripcion_tarea, fecha_inicio, fecha_fin, id_categoria_t, id_estado_t, id_usuario_t } = req.body
        pool.query(`UPDATE tarea SET ? WHERE id_tarea =?`, [{ descripcion_tarea, fecha_inicio, fecha_fin, id_categoria_t, id_estado_t, id_usuario_t }, id_tarea], (err, rows) => {
            if (err) {
                console.log(err);
                next();
            } else {
                const message = "Tarea actualizada con exito"
                res.json({ message: message })
            }
        })
    }
}

const usuariosController = new UsuariosController();
export default usuariosController