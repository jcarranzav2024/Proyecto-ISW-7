const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Usuario {

  constructor() {}

  async Listar(UsuarioId) {
    try {
      if (UsuarioId === undefined) {
        return await prisma.usuario.findMany();
      } else {
        return await prisma.usuario.findMany({
          where: {
            UsuarioId: parseInt(UsuarioId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar usuarios:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Identificacion, Login, Contrasena, Email, Rol } = req.body;
    try {
      const resultado = await prisma.usuario.create({
        data: {
          Identificacion: Identificacion,
          Login: Login,
          Contrasena: Contrasena,
          Email: Email,
          Rol: Rol,
          CreadoEn: new Date()
        }
      });
      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo insertar el usuario ${Login} debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar usuario' });
    }
  }

  async Actualizar(UsuarioId, req, res) {
    const { Identificacion, Login, Contrasena, Email, Rol } = req.body;
    try {
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { UsuarioId: parseInt(UsuarioId) },
      });

      if (!usuarioExistente) {
        throw new Error(`Usuario con ID ${UsuarioId} no encontrado`);
      }

      const resultado = await prisma.usuario.update({
        where: { UsuarioId: parseInt(UsuarioId) },
        data: {
          Identificacion: Identificacion,
          Login: Login,
          Contrasena: Contrasena,
          Email: Email,
          Rol: Rol,
        },
      });

      res.json({ message: `Usuario con ID ${UsuarioId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el usuario ${UsuarioId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar usuario' });
    }
  }

  async Borrar(UsuarioId) {
    try {
      const resultado = await prisma.usuario.delete({
        where: {
          UsuarioId: parseInt(UsuarioId),
        },
      });
      return { message: `Usuario con ID ${UsuarioId} borrado correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar el usuario ${UsuarioId} debido al error: ${error}`);
      throw error;
    }
  }
}

module.exports = Usuario;