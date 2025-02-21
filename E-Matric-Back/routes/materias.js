const express = require("express");
const router = express.Router();

const ServicioMaterias = require('../services/materias.js');
const materias = new ServicioMaterias();

router.get("/", async (req, res) => {
  try {
    const resultado = await materias.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar materias' });
  }
});

router.get("/:MateriaId", async (req, res) => {
  try {
    const resultado = await materias.Listar(req.params.MateriaId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar materias' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await materias.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar materia' });
  }
});

router.delete('/:MateriaId', async (req, res) => {
  try {
    const resultado = await materias.Borrar(req.params.MateriaId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar materia' });
  }
});

router.put('/:MateriaId', async (req, res) => {
  try {
    const { MateriaId } = req.params;
    const resultado = await materias.Actualizar(MateriaId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar materia' });
  }
});

module.exports = router;