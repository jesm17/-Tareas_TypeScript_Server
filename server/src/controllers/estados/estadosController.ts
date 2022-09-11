import { Request, Response, NextFunction, request } from "express";
import pool from "../../database";

class EstadoController {
    public async getAllEstados(req: Request, res: Response, next: NextFunction) {
        let estados: []
        pool.query('SELECT * FROM estado', (err, rows) => {
            if (err) {
                console.log(err);
                next()
            } else {
                estados = rows
                res.json(estados).status(200).end()
                // next()
            }
        })
    }

    public async createEstado(req: Request, res: Response, next: NextFunction) {
        const { descripcion_estado } = req.body
        await pool.query('INSERT INTO estado SET ?', [{ descripcion_estado }], (err, result) => {
            if (err) {
                console.log(err);
                next()
            } else {
                res.json({ message: 'Estado creado con exito' })
            }
        })
    }

    public async deleteEstado(req: Request, res: Response, next: NextFunction) {
        const { id_estado } = req.params
        await pool.query('DELETE FROM estado WHERE id_estado = ' + id_estado, (err, result) => {
            if (err) {
                console.log(err);
                next(err);
            } else {
                res.json({ message: 'Estado eliminado ' })
            }
        })
        console.log(id_estado);
    }

    public async updateEstado(req: Request, res: Response, next: NextFunction) {
        const { id_estado, descripcion_estado } = req.body
        await pool.query('UPDATE estado SET ? WHERE id_estado = ?', [{ descripcion_estado }, id_estado], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('success');
                res.json({ message: 'Actualziado con exito' })
            }
        })
    }
}


const estadoController = new EstadoController()
export default estadoController     