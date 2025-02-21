const express = require("express");
const router = express.Router();

const ServicioCantones = require('../services/cantones.js');
const cantones = new ServicioCantones();

router.get("/", async (req, res) => {
  try {
    const resultado = await cantones.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar cantones' });
  }
});

router.get("/:CantonId", async (req, res) => {
  try {
    const resultado = await cantones.Listar(req.params.CantonId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar cantones' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await cantones.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar cantón' });
  }
});

router.delete('/:CantonId', async (req, res) => {
  try {
    const resultado = await cantones.Borrar(req.params.CantonId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar cantón' });
  }
});

router.put('/:CantonId', async (req, res) => {
  try {
    const { CantonId } = req.params;
    const resultado = await cantones.Actualizar(CantonId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cantón' });
  }
});

module.exports = router;