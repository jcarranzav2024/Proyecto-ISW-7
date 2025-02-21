const express = require("express");
const router = express.Router();

const ServicioEstudiantes = require('../services/estudiantes.js');
const estudiantes = new ServicioEstudiantes();

router.get("/", async (req, res) => {
  try {
    const resultado = await estudiantes.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar estudiantes' });
  }
});

router.get("/:EstudianteId", async (req, res) => {
  try {
    const resultado = await estudiantes.Listar(req.params.EstudianteId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar estudiantes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await estudiantes.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar estudiante' });
  }
});

router.delete('/:EstudianteId', async (req, res) => {
  try {
    const resultado = await estudiantes.Borrar(req.params.EstudianteId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar estudiante' });
  }
});

router.put('/:EstudianteId', async (req, res) => {
  try {
    const { EstudianteId } = req.params;
    const resultado = await estudiantes.Actualizar(EstudianteId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estudiante' });
  }
});

module.exports = router;