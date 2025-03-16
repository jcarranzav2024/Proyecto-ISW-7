const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class Horario {

  constructor() {}

  validarFormulario(data) {
    const errores = [];

    // Validación de Día
    if (data.Dia !== undefined) {
      if (!data.Dia.trim()) {
        errores.push('El día es obligatorio.');
      }
    }

    // Validación de HoraInicio
   
    if (data.HoraInicio !== undefined) {
      if (!data.HoraInicio.trim()) {
        errores.push('La hora de inicio es obligatoria.');
      } 
    }

    // Validación de HoraFin
    if (data.HoraFin === undefined || !data.HoraFin.trim()) {
      errores.push('La hora de fin es obligatoria.');
    }

    return errores;
  }

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
    const {Nombre, Dia, HoraInicio, HoraFin,UsuarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      // Convertir las horas de string a Date
      const horaInicioDate = new Date(`1970-01-01T${HoraInicio}:00`);
      const horaFinDate = new Date(`1970-01-01T${HoraFin}:00`);

      const resultado = await prisma.horario.create({
        data: {
          Nombre: Nombre,
          Dia: Dia,
          HoraInicio: horaInicioDate,
          HoraFin: horaFinDate,
        }
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Agregar horario para el día ${Dia}`,
        UsuarioId: UsuarioId || 1
      });

      res.json({ message: 'Horario agregado correctamente', resultado });
    } catch (error) {
      console.error(`No se pudo insertar el horario debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar horario' });
    }
  }

  async Actualizar(HorarioId, req, res) {
    const { Nombre,Dia, HoraInicio, HoraFin,UsuarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const horarioExistente = await prisma.horario.findUnique({
        where: { HorarioId: parseInt(HorarioId) },
      });

      if (!horarioExistente) {
        throw new Error(`Horario con ID ${HorarioId} no encontrado`);
      }

      // Construir el objeto de datos a actualizar dinámicamente
      const dataToUpdate = {};
      if (Nombre !== undefined) dataToUpdate.Nombre = Nombre;
      if (Dia !== undefined) dataToUpdate.Dia = Dia;
      if (HoraInicio !== undefined) dataToUpdate.HoraInicio = new Date(`1970-01-01T${HoraInicio}:00`);
      if (HoraFin !== undefined) dataToUpdate.HoraFin = new Date(`1970-01-01T${HoraFin}:00`);

      const resultado = await prisma.horario.update({
        where: { HorarioId: parseInt(HorarioId) },
        data: dataToUpdate,
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Actualizar horario con ID ${HorarioId}`,
        UsuarioId: UsuarioId || 1
      });

      res.json({ message: `Horario con ID ${HorarioId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el horario ${HorarioId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar horario' });
    }
  }

  async Borrar(HorarioId, req, res) {
    try {
      const resultado = await prisma.horario.delete({
        where: {
          HorarioId: parseInt(HorarioId),
        },
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Borrar horario con ID ${HorarioId}`,
        UsuarioId: req.body.UsuarioId || 1
      });

      res.json({ message: `Horario con ID ${HorarioId} borrado correctamente` });
    } catch (error) {
      console.error(`No se pudo borrar el horario ${HorarioId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al borrar horario' });
    }
  }
}

module.exports = Horario;