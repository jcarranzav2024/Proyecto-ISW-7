const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Estudiante {

  constructor() {}

  async Listar(EstudianteId) {
    try {
      if (EstudianteId === undefined) {
        return await prisma.estudiante.findMany();
      } else {
        return await prisma.estudiante.findMany({
          where: {
            EstudianteId: parseInt(EstudianteId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar estudiantes:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Identificacion, Nombre, Apellido1, Apellido2, Correo, Direccion, Telefono } = req.body;
    try {
      const resultado = await prisma.estudiante.create({
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
      console.error(`No se pudo insertar el estudiante debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar estudiante' });
    }
  }

  async Actualizar(EstudianteId, req, res) {
    const { Identificacion, Nombre, Apellido1, Apellido2, Correo, Direccion, Telefono } = req.body;
    try {
      const estudianteExistente = await prisma.estudiante.findUnique({
        where: { EstudianteId: parseInt(EstudianteId) },
      });

      if (!estudianteExistente) {
        throw new Error(`Estudiante con ID ${EstudianteId} no encontrado`);
      }

      const data = {};
      if (Identificacion !== undefined) data.Identificacion = Identificacion;
      if (Nombre !== undefined) data.Nombre = Nombre;
      if (Apellido1 !== undefined) data.Apellido1 = Apellido1;
      if (Apellido2 !== undefined) data.Apellido2 = Apellido2;
      if (Correo !== undefined) data.Correo = Correo;
      if (Direccion !== undefined) data.Direccion = Direccion;
      if (Telefono !== undefined) data.Telefono = Telefono;

      const resultado = await prisma.estudiante.update({
        where: { EstudianteId: parseInt(EstudianteId) },
        data,
      });

      res.json({ message: `Estudiante con ID ${EstudianteId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el estudiante ${EstudianteId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar estudiante' });
    }
  }

  async Borrar(EstudianteId) {
    try {
      const resultado = await prisma.estudiante.delete({
        where: {
          EstudianteId: parseInt(EstudianteId),
        },
      });
      return { message: `Estudiante con ID ${EstudianteId} borrado correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar el estudiante ${EstudianteId} debido al error: ${error}`);
      throw error;
    }
  }
}

module.exports = Estudiante;