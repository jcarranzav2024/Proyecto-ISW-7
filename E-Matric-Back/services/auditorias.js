const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Auditoria {

  constructor() {}

  async Listar(AuditoriaId) {
    try {
      if (AuditoriaId === undefined) {
        return await prisma.auditoria.findMany();
      } else {
        return await prisma.auditoria.findMany({
          where: {
            AuditoriaId: parseInt(AuditoriaId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar auditorías:', error);
      throw error;
    }
  }

  async Agregar({ Accion, UsuarioId }) {
    try {
      const resultado = await prisma.auditoria.create({
        data: {
          Accion: Accion,
          UsuarioId: UsuarioId,
          CreadoEn: new Date() // ISO-8601 DateTime
        }
      });
      return resultado;
    } catch (error) {
      console.error(`No se pudo insertar la auditoría debido al error: ${error}`);
      throw new Error('Error al agregar auditoría');
    }
  }

  async Actualizar(AuditoriaId, req, res) {
    const { Accion, UsuarioId } = req.body;
    try {
      const auditoriaExistente = await prisma.auditoria.findUnique({
        where: { AuditoriaId: parseInt(AuditoriaId) },
      });

      if (!auditoriaExistente) {
        throw new Error(`Auditoría con ID ${AuditoriaId} no encontrada`);
      }

      const resultado = await prisma.auditoria.update({
        where: { AuditoriaId: parseInt(AuditoriaId) },
        data: {
          Accion: Accion,
          UsuarioId: UsuarioId,
        },
      });

      res.json({ message: `Auditoría con ID ${AuditoriaId} actualizada correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar la auditoría ${AuditoriaId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar auditoría' });
    }
  }

  async Borrar(AuditoriaId) {
    try {
      const resultado = await prisma.auditoria.delete({
        where: {
          AuditoriaId: parseInt(AuditoriaId),
        },
      });
      return { message: `Auditoría con ID ${AuditoriaId} borrada correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar la auditoría ${AuditoriaId} debido al error: ${error}`);
      throw error;
    }
  }
}

module.exports = Auditoria;