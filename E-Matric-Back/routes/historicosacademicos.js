const express = require("express");
const router = express.Router();

const ServicioHistoricosAcademicos = require('../services/historicosacademicos.js');
const historicosAcademicos = new ServicioHistoricosAcademicos();

router.get("/", async (req, res) => {
  try {
    const resultado = await historicosAcademicos.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar históricos académicos' });
  }
});

router.get("/:HistoricoAcademicoId", async (req, res) => {
  try {
    const resultado = await historicosAcademicos.Listar(req.params.HistoricoAcademicoId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar históricos académicos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await historicosAcademicos.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar histórico académico' });
  }
});

router.delete('/:HistoricoAcademicoId', async (req, res) => {
  try {
    const resultado = await historicosAcademicos.Borrar(req.params.HistoricoAcademicoId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar histórico académico' });
  }
});

router.put('/:HistoricoAcademicoId', async (req, res) => {
  try {
    const { HistoricoAcademicoId } = req.params;
    const resultado = await historicosAcademicos.Actualizar(HistoricoAcademicoId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar histórico académico' });
  }
});

module.exports = router;