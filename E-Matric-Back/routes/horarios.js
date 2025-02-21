const express = require("express");
const router = express.Router();

const ServicioHorarios = require('../services/horarios.js');
const horarios = new ServicioHorarios();

router.get("/", async (req, res) => {
  try {
    const resultado = await horarios.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar horarios' });
  }
});

router.get("/:HorarioId", async (req, res) => {
  try {
    const resultado = await horarios.Listar(req.params.HorarioId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar horarios' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await horarios.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar horario' });
  }
});

router.delete('/:HorarioId', async (req, res) => {
  try {
    const resultado = await horarios.Borrar(req.params.HorarioId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar horario' });
  }
});

router.put('/:HorarioId', async (req, res) => {
  try {
    const { HorarioId } = req.params;
    const resultado = await horarios.Actualizar(HorarioId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar horario' });
  }
});

module.exports = router;