import { Request, Response, NextFunction } from "express";
import pool from "../../database";

class CategoriasController {
    public async getCategorias(req: Request, res: Response, next: NextFunction) {
        let categorias: []
        try {
            await pool.query("SELECT * FROM categoria", (err, rows) => {
                if (err) {
                    console.log(err);
                    next()
                }
                else {
                    categorias = rows
                    res.json(categorias).status(200).end()
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async agregarCategorias(req: Request, res: Response, next: NextFunction) {
        const { nombre_categoria, color } = req.body
        await pool.query('INSERT INTO categoria SET ? ', [{ nombre_categoria, color }], (err, result) => {
            if (err) {
                console.log(err);
                next()
            } else {
                res.json({message:'Categoria guardada con exito'}).status(200).end()
                console.log('success');
            }
        })
    }

    public async deleteCategoria(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        try {
            pool.query(`DELETE FROM categoria WHERE id_categoria=${id}`, (err, result) => {
                if (err) {
                    console.log(err);
                    next();
                } else {
                    console.log(result);
                    res.json({ message: 'Se elimino con exito la categoria' }).status(200).end();
                }
            })
        } catch (error) {
            console.log(error);
            next();
        }
    }

    public async updateCategoria(req: Request, res: Response, next: NextFunction) {
        //console.log(req.body);
        const { id_categoria, nombre_categoria, color } = req.body
        pool.query('UPDATE categoria SET ? WHERE id_categoria = ?', [{ nombre_categoria, color }, id_categoria], (err, result) => {
            if (err) {
                console.log(err);
                next()
            } else {
                res.json({ message: 'Se actualizo con exito' }).status(200).end()
            }
        })
    }
    
}

const categoriasController = new CategoriasController();
export default categoriasController;