const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Docente {

  constructor() {}

  async Listar(DocenteId) {
    try {
      if (DocenteId === undefined) {
        return await prisma.docente.findMany();
      } else {
        return await prisma.docente.findMany({
          where: {
            DocenteId: parseInt(DocenteId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar docentes:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Identificacion, Nombre, Apellido1, Apellido2, Correo, Direccion, Telefono } = req.body;
    try {
      const resultado = await prisma.docente.create({
        data: {
          Identificacion: Identificacion,
          Nombre: Nombre,
          Apellido1: Apellido1,
          Apellido2: Apellido2,
          Correo: Correo,
          Direccion: Direccion,
          Telefono: Telefono,
          CreadoEn: new Date()
        }
      });
      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo insertar el docente debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar docente' });
    }
  }

  async Actualizar(DocenteId, req, res) {
    const { Identificacion, Nombre, Apellido1, Apellido2, Correo, Direccion, Telefono } = req.body;
    try {
      const docenteExistente = await prisma.docente.findUnique({
        where: { DocenteId: parseInt(DocenteId) },
      });

      if (!docenteExistente) {
        throw new Error(`Docente con ID ${DocenteId} no encontrado`);
      }

      const resultado = await prisma.docente.update({
        where: { DocenteId: parseInt(DocenteId) },
        data: {
          Identificacion: Identificacion,
          Nombre: Nombre,
          Apellido1: Apellido1,
          Apellido2: Apellido2,
          Correo: Correo,
          Direccion: Direccion,
          Telefono: Telefono,
        },
      });

      res.json({ message: `Docente con ID ${DocenteId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el docente ${DocenteId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar docente' });
    }
  }

  async Borrar(DocenteId) {
    try {
      const resultado = await prisma.docente.delete({
        where: {
          DocenteId: parseInt(DocenteId),
        },
      });
      return { message: `Docente con ID ${DocenteId} borrado correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar el docente ${DocenteId} debido al error: ${error}`);
      throw error;
    }
  }
}

module.exports = Docente;