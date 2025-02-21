const express = require("express");
const router = express.Router();

const ServicioUsuarios = require('../services/usuarios.js');
const usuarios = new ServicioUsuarios();

router.get("/", async (req, res) => {
  try {
    const resultado = await usuarios.Listar();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar usuarios' });
  }
});

router.get("/:UsuarioId", async (req, res) => {
  try {
    const resultado = await usuarios.Listar(req.params.UsuarioId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar usuarios' });
  }
});

router.post('/', async (req, res) => {
  try {
    const resultado = await usuarios.Agregar(req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar usuario' });
  }
});

router.delete('/:UsuarioId', async (req, res) => {
  try {
    const resultado = await usuarios.Borrar(req.params.UsuarioId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar usuario' });
  }
});

router.put('/:UsuarioId', async (req, res) => {
  try {
    const { UsuarioId } = req.params;
    const resultado = await usuarios.Actualizar(UsuarioId, req, res);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

module.exports = router;