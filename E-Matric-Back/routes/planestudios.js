const express = require("express");
const router = express.Router();

const ServicioPlanEstudios = require('../services/planestudios.js');
const planestudios = new ServicioPlanEstudios();

router.get("/", async (req, res) => {
  try {
    const resultado = await planestudios.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar planes de estudio' });
  }
});

router.get("/:PlanEstudioId", async (req, res) => {
  try {
    const resultado = await planestudios.Listar(req.params.PlanEstudioId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar planes de estudio' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await planestudios.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar plan de estudio' });
  }
});

router.delete('/:PlanEstudioId', async (req, res) => {
  try {
    const resultado = await planestudios.Borrar(req.params.PlanEstudioId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar plan de estudio' });
  }
});

router.put('/:PlanEstudioId', async (req, res) => {
  try {
    const { PlanEstudioId } = req.params;
    const resultado = await planestudios.Actualizar(PlanEstudioId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar plan de estudio' });
  }
});

module.exports = router;