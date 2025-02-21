const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class PlanEstudio {

  constructor() {}

  async Listar(PlanEstudioId) {
    try {
      if (PlanEstudioId === undefined) {
        return await prisma.planEstudio.findMany();
      } else {
        return await prisma.planEstudio.findMany({
          where: {
            PlanEstudioId: parseInt(PlanEstudioId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar planes de estudio:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Nombre, Descripcion } = req.body;
    try {
      const resultado = await prisma.planEstudio.create({
        data: {
          Nombre: Nombre,
          Descripcion: Descripcion,
          CreadoEn: new Date()
        }
      });
      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo insertar el plan de estudio ${Nombre} debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar plan de estudio' });
    }
  }

  async Actualizar(PlanEstudioId, req, res) {
    const { Nombre, Descripcion } = req.body;
    try {
      const planEstudioExistente = await prisma.planEstudio.findUnique({
        where: { PlanEstudioId: parseInt(PlanEstudioId) },
      });

      if (!planEstudioExistente) {
        throw new Error(`Plan de estudio con ID ${PlanEstudioId} no encontrado`);
      }

      const resultado = await prisma.planEstudio.update({
        where: { PlanEstudioId: parseInt(PlanEstudioId) },
        data: {
          Nombre: Nombre,
          Descripcion: Descripcion,
        },
      });

      res.json({ message: `Plan de estudio con ID ${PlanEstudioId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el plan de estudio ${PlanEstudioId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar plan de estudio' });
    }
  }

  async Borrar(PlanEstudioId) {
    try {
      const resultado = await prisma.planEstudio.delete({
        where: {
          PlanEstudioId: parseInt(PlanEstudioId),
        },
      });
      return { message: `Plan de estudio con ID ${PlanEstudioId} borrado correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar el plan de estudio ${PlanEstudioId} debido al error: ${error}`);
      throw error;
    }
  }
}

module.exports = PlanEstudio;