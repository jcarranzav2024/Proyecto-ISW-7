const express = require("express");
const router = express.Router();

const ServicioProvincias = require('../services/provincias.js');
const provincias = new ServicioProvincias();

router.get("/", async (req, res) => {
  try {
    const resultado = await provincias.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar provincias' });
  }
});

router.get("/:ProvinciaId", async (req, res) => {
  try {
    const resultado = await provincias.Listar(req.params.ProvinciaId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar provincias' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await provincias.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar provincia' });
  }
});

router.delete('/:ProvinciaId', async (req, res) => {
  try {
    const resultado = await provincias.Borrar(req.params.ProvinciaId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar provincia' });
  }
});

router.put('/:ProvinciaId', async (req, res) => {
  try {
    const { ProvinciaId } = req.params;
    const resultado = await provincias.Actualizar(ProvinciaId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar provincia' });
  }
});

module.exports = router;