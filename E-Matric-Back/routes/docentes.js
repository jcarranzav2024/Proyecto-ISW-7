const express = require("express");
const router = express.Router();

const ServicioDocentes = require('../services/docentes.js');
const docentes = new ServicioDocentes();

router.get("/", async (req, res) => {
  try {
    const resultado = await docentes.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar docentes' });
  }
});

router.get("/:DocenteId", async (req, res) => {
  try {
    const resultado = await docentes.Listar(req.params.DocenteId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar docentes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await docentes.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar docente' });
  }
});

router.delete('/:DocenteId', async (req, res) => {
  try {
    const resultado = await docentes.Borrar(req.params.DocenteId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar docente' });
  }
});

router.put('/:DocenteId', async (req, res) => {
  try {
    const { DocenteId } = req.params;
    const resultado = await docentes.Actualizar(DocenteId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar docente' });
  }
});

module.exports = router;