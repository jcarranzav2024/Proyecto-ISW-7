const express = require("express");
const router = express.Router();

const ServicioAuditorias = require('../services/auditorias.js');
const auditorias = new ServicioAuditorias();

router.get("/", async (req, res) => {
  try {
    const resultado = await auditorias.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar auditorías' });
  }
});

router.get("/:AuditoriaId", async (req, res) => {
  try {
    const resultado = await auditorias.Listar(req.params.AuditoriaId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar auditorías' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await auditorias.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar auditoría' });
  }
});

router.delete('/:AuditoriaId', async (req, res) => {
  try {
    const resultado = await auditorias.Borrar(req.params.AuditoriaId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar auditoría' });
  }
});

router.put('/:AuditoriaId', async (req, res) => {
  try {
    const { AuditoriaId } = req.params;
    const resultado = await auditorias.Actualizar(AuditoriaId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar auditoría' });
  }
});

module.exports = router;