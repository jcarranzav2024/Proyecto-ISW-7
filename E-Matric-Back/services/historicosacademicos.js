const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

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

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Agregar histórico académico para el estudiante ${EstudianteId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: 'Histórico académico agregado correctamente', resultado });
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

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Actualizar histórico académico con ID ${HistoricoAcademicoId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: `Histórico académico con ID ${HistoricoAcademicoId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el histórico académico ${HistoricoAcademicoId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar histórico académico' });
    }
  }

  async Borrar(HistoricoAcademicoId, req, res) {
    try {
      const resultado = await prisma.historicoAcademico.delete({
        where: {
          HistoricoAcademicoId: parseInt(HistoricoAcademicoId),
        },
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Borrar histórico académico con ID ${HistoricoAcademicoId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: `Histórico académico con ID ${HistoricoAcademicoId} borrado correctamente` });
    } catch (error) {
      console.error(`No se pudo borrar el histórico académico ${HistoricoAcademicoId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al borrar histórico académico' });
    }
  }
}

module.exports = HistoricoAcademico;