const express = require("express");
const router = express.Router();

const ServicioPeriodosAcademicos = require('../services/periodosacademicos.js');
const periodosacademicos = new ServicioPeriodosAcademicos();

router.get("/", async (req, res) => {
  try {
    const resultado = await periodosacademicos.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar periodos académicos' });
  }
});

router.get("/:PeriodoAcademicoId", async (req, res) => {
  try {
    const resultado = await periodosacademicos.Listar(req.params.PeriodoAcademicoId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar periodos académicos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await periodosacademicos.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar periodo académico' });
  }
});

router.delete('/:PeriodoAcademicoId', async (req, res) => {
  try {
    const resultado = await periodosacademicos.Borrar(req.params.PeriodoAcademicoId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar periodo académico' });
  }
});

router.put('/:PeriodoAcademicoId', async (req, res) => {
  try {
    const { PeriodoAcademicoId } = req.params;
    const resultado = await periodosacademicos.Actualizar(PeriodoAcademicoId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar periodo académico' });
  }
});

module.exports = router;