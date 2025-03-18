const express = require("express");
const router = express.Router();

const ServicioCarreras = require('../services/carreras.js');
const carreras = new ServicioCarreras();

router.get("/", async (req, res) => {
    try {
        const resultado = await carreras.Listar();
        res.json(resultado);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.error || 'Error al listar carreras' });
    }
});

router.get("/:CarreraId", async (req, res) => {
    try {
        const resultado = await carreras.Listar(req.params.CarreraId);
        res.json(resultado);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.error || 'Error al listar carreras' });
    }
});

router.post('/', async (req, res) => {
    try {
        const resultado = await carreras.Agregar(req);
        res.json(resultado);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.error || 'Error al agregar carrera' });
    }
});

router.put('/:CarreraId', async (req, res) => {
    try {
        const { CarreraId } = req.params;
        const { Nombre, Codigo, UsuarioId, Estado } = req.body;

        let resultado;
        if (Estado !== undefined && UsuarioId !== undefined && Nombre === undefined && Codigo === undefined) {
            resultado = await carreras.Activar(CarreraId, req);
        } else {
            resultado = await carreras.Actualizar(CarreraId, req);
        }
        res.json(resultado);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.error || 'Error al actualizar carrera' });
    }
});

router.delete('/:CarreraId', async (req, res) => {
    try {
        const resultado = await carreras.Borrar(req.params.CarreraId, req);
        res.json(resultado);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.error || 'Error al borrar carrera' });
    }
});

module.exports = router;