const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class HistoricoAcademico {

  constructor() {}

  async Listar(HistoricoAcademicoId) {
    try {
      if (HistoricoAcademicoId === undefined) {
        return await prisma.historicoAcademico.findMany();
      } else {
        return await prisma.historicoAcademico.findMany({
          where: {
            HistoricoAcademicoId: parseInt(HistoricoAcademicoId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar históricos académicos:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { EstudianteId, CursoId, Nota } = req.body;
    try {
      const resultado = await prisma.historicoAcademico.create({
        data: {
          EstudianteId: EstudianteId,
          CursoId: CursoId,
          Nota: Nota,
          CreadoEn: new Date()
        }
      });
      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo insertar el histórico académico debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar histórico académico' });
    }
  }

  async Actualizar(HistoricoAcademicoId, req, res) {
    const { EstudianteId, CursoId, Nota } = req.body;
    try {
      const historicoAcademicoExistente = await prisma.historicoAcademico.findUnique({
        where: { HistoricoAcademicoId: parseInt(HistoricoAcademicoId) },
      });

      if (!historicoAcademicoExistente) {
        throw new Error(`Histórico académico con ID ${HistoricoAcademicoId} no encontrado`);
      }

      const resultado = await prisma.historicoAcademico.update({
        where: { HistoricoAcademicoId: parseInt(HistoricoAcademicoId) },
        data: {
          EstudianteId: EstudianteId,
          CursoId: CursoId,
          Nota: Nota,
        },
      });

      res.json({ message: `Histórico académico con ID ${HistoricoAcademicoId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el histórico académico ${HistoricoAcademicoId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar histórico académico' });
    }
  }

  async Borrar(HistoricoAcademicoId) {
    try {
      const resultado = await prisma.historicoAcademico.delete({
        where: {
          HistoricoAcademicoId: parseInt(HistoricoAcademicoId),
        },
      });
      return { message: `Histórico académico con ID ${HistoricoAcademicoId} borrado correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar el histórico académico ${HistoricoAcademicoId} debido al error: ${error}`);
      throw error;
    }
  }
}

module.exports = HistoricoAcademico;