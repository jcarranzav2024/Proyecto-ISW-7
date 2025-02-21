const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Materia {

  constructor() {}

  async Listar(MateriaId) {
    try {
      if (MateriaId === undefined) {
        return await prisma.materia.findMany();
      } else {
        return await prisma.materia.findMany({
          where: {
            MateriaId: parseInt(MateriaId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar materias:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Nombre, Codigo, Creditos } = req.body;
    try {
      const resultado = await prisma.materia.create({
        data: {
          Nombre: Nombre,
          Codigo: Codigo,
          Creditos: Creditos,
          CreadoEn: new Date()
        }
      });
      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo insertar la materia ${Nombre} debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar materia' });
    }
  }

  async Actualizar(MateriaId, req, res) {
    const { Nombre, Codigo, Creditos } = req.body;
    try {
      const materiaExistente = await prisma.materia.findUnique({
        where: { MateriaId: parseInt(MateriaId) },
      });

      if (!materiaExistente) {
        throw new Error(`Materia con ID ${MateriaId} no encontrada`);
      }

      const resultado = await prisma.materia.update({
        where: { MateriaId: parseInt(MateriaId) },
        data: {
          Nombre: Nombre,
          Codigo: Codigo,
          Creditos: Creditos,
        },
      });

      res.json({ message: `Materia con ID ${MateriaId} actualizada correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar la materia ${MateriaId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar materia' });
    }
  }

  async Borrar(MateriaId) {
    try {
      const resultado = await prisma.materia.delete({
        where: {
          MateriaId: parseInt(MateriaId),
        },
      });
      return { message: `Materia con ID ${MateriaId} borrada correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar la materia ${MateriaId} debido al error: ${error}`);
      throw error;
    }
  }
}

module.exports = Materia;