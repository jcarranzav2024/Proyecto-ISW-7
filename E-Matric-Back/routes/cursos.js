const express = require("express");
const router = express.Router();

const ServicioCursos = require('../services/cursos.js');
const cursos = new ServicioCursos();

router.get("/", async (req, res) => {
  try {
    const resultado = await cursos.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar cursos' });
  }
});

router.get("/:CursoId", async (req, res) => {
  try {
    const resultado = await cursos.Listar(req.params.CursoId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar cursos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await cursos.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar curso' });
  }
});

router.delete('/:CursoId', async (req, res) => {
  try {
    const resultado = await cursos.Borrar(req.params.CursoId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar curso' });
  }
});

router.put('/:CursoId', async (req, res) => {
  try {
    const { CursoId } = req.params;
    const resultado = await cursos.Actualizar(CursoId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar curso' });
  }
});

module.exports = router;