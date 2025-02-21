const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class PeriodoAcademico {

  constructor() {}

  async Listar(PeriodoAcademicoId) {
    try {
      if (PeriodoAcademicoId === undefined) {
        return await prisma.periodoAcademico.findMany();
      } else {
        return await prisma.periodoAcademico.findMany({
          where: {
            PeriodoAcademicoId: parseInt(PeriodoAcademicoId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar periodos académicos:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Nombre } = req.body;
    try {
      const resultado = await prisma.periodoAcademico.create({
        data: {
          Nombre: Nombre,
          CreadoEn: new Date()
        }
      });
      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo insertar el periodo académico ${Nombre} debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar periodo académico' });
    }
  }

  async Actualizar(PeriodoAcademicoId, req, res) {
    const { Nombre } = req.body;
    try {
      const periodoAcademicoExistente = await prisma.periodoAcademico.findUnique({
        where: { PeriodoAcademicoId: parseInt(PeriodoAcademicoId) },
      });

      if (!periodoAcademicoExistente) {
        throw new Error(`Periodo académico con ID ${PeriodoAcademicoId} no encontrado`);
      }

      const resultado = await prisma.periodoAcademico.update({
        where: { PeriodoAcademicoId: parseInt(PeriodoAcademicoId) },
        data: {
          Nombre: Nombre,
        },
      });

      res.json({ message: `Periodo académico con ID ${PeriodoAcademicoId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el periodo académico ${PeriodoAcademicoId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar periodo académico' });
    }
  }

  async Borrar(PeriodoAcademicoId) {
    try {
      const resultado = await prisma.periodoAcademico.delete({
        where: {
          PeriodoAcademicoId: parseInt(PeriodoAcademicoId),
        },
      });
      return { message: `Periodo académico con ID ${PeriodoAcademicoId} borrado correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar el periodo académico ${PeriodoAcademicoId} debido al error: ${error}`);
      throw error;
    }
  }
}

module.exports = PeriodoAcademico;