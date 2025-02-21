const express = require("express");
const router = express.Router();

const ServicioMatriculas = require('../services/matriculas.js');
const matriculas = new ServicioMatriculas();

router.get("/", async (req, res) => {
  try {
    const resultado = await matriculas.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar matrículas' });
  }
});

router.get("/:MatriculaId", async (req, res) => {
  try {
    const resultado = await matriculas.Listar(req.params.MatriculaId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar matrículas' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await matriculas.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar matrícula' });
  }
});

router.delete('/:MatriculaId', async (req, res) => {
  try {
    const resultado = await matriculas.Borrar(req.params.MatriculaId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar matrícula' });
  }
});

router.put('/:MatriculaId', async (req, res) => {
  try {
    const { MatriculaId } = req.params;
    const resultado = await matriculas.Actualizar(MatriculaId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar matrícula' });
  }
});

module.exports = router;