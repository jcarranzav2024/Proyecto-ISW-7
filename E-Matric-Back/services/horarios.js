const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Horario {

  constructor() {}

  async Listar(HorarioId) {
    try {
      let horarios;
      if (HorarioId === undefined) {
        horarios = await prisma.horario.findMany();
      } else {
        horarios = await prisma.horario.findMany({
          where: {
            HorarioId: parseInt(HorarioId),
          },
        });
      }

      // Formatear HoraInicio y HoraFin para que solo devuelvan la hora en formato militar
      const formattedHorarios = horarios.map(horario => {
        return {
          ...horario,
          HoraInicio: new Date(horario.HoraInicio).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }),
          HoraFin: new Date(horario.HoraFin).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }),
          ActualizadoEn: horario.ActualizadoEn // Incluir el campo ActualizadoEn
        };
      });

      return formattedHorarios;
    } catch (error) {
      console.error('Error al listar horarios:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Dia, HoraInicio, HoraFin } = req.body;
    try {
      // Convertir las horas de string a Date
      const horaInicioDate = new Date(`1970-01-01T${HoraInicio}:00`);
      const horaFinDate = new Date(`1970-01-01T${HoraFin}:00`);

      const resultado = await prisma.horario.create({
        data: {
          Dia: Dia,
          HoraInicio: horaInicioDate,
          HoraFin: horaFinDate,
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

      // Construir el objeto de datos a actualizar dinámicamente
      const dataToUpdate = {};
      if (Dia !== undefined) dataToUpdate.Dia = Dia;
      if (HoraInicio !== undefined) dataToUpdate.HoraInicio = new Date(`1970-01-01T${HoraInicio}:00`);
      if (HoraFin !== undefined) dataToUpdate.HoraFin = new Date(`1970-01-01T${HoraFin}:00`);

      const resultado = await prisma.horario.update({
        where: { HorarioId: parseInt(HorarioId) },
        data: dataToUpdate,
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