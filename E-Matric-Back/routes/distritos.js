const express = require("express");
const router = express.Router();

const ServicioDistritos = require('../services/distritos.js');
const distritos = new ServicioDistritos();

router.get("/", async (req, res) => {
  try {
    const resultado = await distritos.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar distritos' });
  }
});

router.get("/:DistritoId", async (req, res) => {
  try {
    const resultado = await distritos.Listar(req.params.DistritoId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar distritos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await distritos.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar distrito' });
  }
});

router.delete('/:DistritoId', async (req, res) => {
  try {
    const resultado = await distritos.Borrar(req.params.DistritoId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar distrito' });
  }
});

router.put('/:DistritoId', async (req, res) => {
  try {
    const { DistritoId } = req.params;
    const resultado = await distritos.Actualizar(DistritoId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar distrito' });
  }
});

module.exports = router;