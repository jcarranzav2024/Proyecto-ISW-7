const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Horario {

  constructor() {}

  async Listar(HorarioId) {
    try {
      if (HorarioId === undefined) {
        return await prisma.horario.findMany();
      } else {
        return await prisma.horario.findMany({
          where: {
            HorarioId: parseInt(HorarioId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar horarios:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Dia, HoraInicio, HoraFin } = req.body;
    try {
      const resultado = await prisma.horario.create({
        data: {
          Dia: Dia,
          HoraInicio: new Date(HoraInicio),
          HoraFin: new Date(HoraFin),
          
        }
      });
      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo insertar el horario debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar horario' });
    }
  }

  async Actualizar(HorarioId, req, res) {
    const { Dia, HoraInicio, HoraFin } = req.body;
    try {
      const horarioExistente = await prisma.horario.findUnique({
        where: { HorarioId: parseInt(HorarioId) },
      });

      if (!horarioExistente) {
        throw new Error(`Horario con ID ${HorarioId} no encontrado`);
      }

      const resultado = await prisma.horario.update({
        where: { HorarioId: parseInt(HorarioId) },
        data: {
          Dia: Dia,
          HoraInicio: new Date(HoraInicio),
          HoraFin: new Date(HoraFin),
        },
      });

      res.json({ message: `Horario con ID ${HorarioId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el horario ${HorarioId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar horario' });
    }
  }

  async Borrar(HorarioId) {
    try {
      const resultado = await prisma.horario.delete({
        where: {
          HorarioId: parseInt(HorarioId),
        },
      });
      return { message: `Horario con ID ${HorarioId} borrado correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar el horario ${HorarioId} debido al error: ${error}`);
      throw error;
    }
  }
}

module.exports = Horario;