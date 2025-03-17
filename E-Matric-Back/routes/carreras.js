const express = require("express");
const router = express.Router();

const ServicioCarreras = require('../services/carreras.js');
const carreras = new ServicioCarreras();

router.get("/", async (req, res) => {
  try {
    const resultado = await carreras.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar carreras' });
  }
});

router.get("/:CarreraId", async (req, res) => {
  try {
    const resultado = await carreras.Listar(req.params.CarreraId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar carreras' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await carreras.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar carrera' });
  }
});

router.delete('/:CarreraId', async (req, res) => {
  try {
    const resultado = await carreras.Borrar(req.params.CarreraId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar carrera' });
  }
});

router.put('/:CarreraId', async (req, res) => {
  try {
    const { CarreraId } = req.params;
    const resultado = await carreras.Actualizar(CarreraId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar carrera' });
  }
});

module.exports = router;