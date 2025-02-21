const express = require("express");
const router = express.Router();

const ServicioOfertasAcademicas = require('../services/ofertasacademicas.js');
const ofertasacademicas = new ServicioOfertasAcademicas();

router.get("/", async (req, res) => {
  try {
    const resultado = await ofertasacademicas.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar ofertas académicas' });
  }
});

router.get("/:OfertaAcademicaId", async (req, res) => {
  try {
    const resultado = await ofertasacademicas.Listar(req.params.OfertaAcademicaId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar ofertas académicas' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await ofertasacademicas.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar oferta académica' });
  }
});

router.delete('/:OfertaAcademicaId', async (req, res) => {
  try {
    const resultado = await ofertasacademicas.Borrar(req.params.OfertaAcademicaId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar oferta académica' });
  }
});

router.put('/:OfertaAcademicaId', async (req, res) => {
  try {
    const { OfertaAcademicaId } = req.params;
    const resultado = await ofertasacademicas.Actualizar(OfertaAcademicaId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar oferta académica' });
  }
});

module.exports = router;