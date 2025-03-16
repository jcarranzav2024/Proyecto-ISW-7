const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class Distrito {

  constructor() {}

  validarFormulario(data) {
    const errores = [];

    // Validación de nombre del distrito
    if (data.Distrito !== undefined) {
      if (!data.Distrito.trim()) {
        errores.push('El nombre del distrito es obligatorio.');
      }
    }

    // Validación de Valoracion
    if (data.Valoracion !== undefined) {
      const validValues = ['Excelente', 'Bueno', 'Regular'];
      if (!validValues.includes(data.Valoracion)) {
        errores.push('La valoración debe ser uno de los siguientes valores: Excelente, Bueno, Regular.');
      }
    }

    return errores;
  }

  async Listar(DistritoId) {
    try {
      if (DistritoId === undefined) {
        return await prisma.distritos.findMany();
      } else {
        return await prisma.distritos.findMany({
          where: {
            DistritoId: parseInt(DistritoId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar distritos:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Distrito, CantonId, Valoracion, UsuarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const resultado = await prisma.distritos.create({
        data: {
          Distrito: Distrito,
          CantonId: parseInt(CantonId),
          FechaDeCreacion: new Date(),
          ActualizadoEn: new Date(),
          Valoracion: Valoracion || 'Bueno' // Valor por defecto si no se proporciona
        }
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Agregar distrito ${Distrito}`,
        UsuarioId: UsuarioId || (req.user && req.user.id) || 1 // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: 'Distrito agregado correctamente', resultado });
    } catch (error) {
      console.error(`No se pudo insertar el distrito debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar distrito' });
    }
  }

  async Actualizar(DistritoId, req, res) {
    const { Distrito, CantonId, Valoracion, UsuarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const distritoExistente = await prisma.distritos.findUnique({
        where: { DistritoId: parseInt(DistritoId) },
      });

      if (!distritoExistente) {
        return res.status(404).json({ error: `Distrito con ID ${DistritoId} no encontrado` });
      }

      const resultado = await prisma.distritos.update({
        where: { DistritoId: parseInt(DistritoId) },
        data: {
          Distrito: Distrito,
          CantonId: parseInt(CantonId),
          Valoracion: Valoracion || distritoExistente.Valoracion, // Mantener la valoración existente si no se proporciona una nueva
          ActualizadoEn: new Date() // Actualizar la fecha de actualización
        },
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Actualizar distrito con ID ${DistritoId}`,
        UsuarioId: UsuarioId || (req.user && req.user.id) || 1 // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: `Distrito con ID ${DistritoId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el distrito ${DistritoId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar distrito' });
    }
  }

  async Borrar(DistritoId, req, res) {
    const id = parseInt(DistritoId);
    const { UsuarioId } = req.body;

    try {
      const resultado = await prisma.$transaction(async (prisma) => {
        // Borrar el distrito
        await prisma.distritos.delete({
          where: {
            DistritoId: id,
          },
        });

        // Registrar la acción en auditoría
        await auditoria.Agregar({
          Accion: `Borrar distrito con ID ${DistritoId}`,
          UsuarioId: UsuarioId || (req.user && req.user.id) || 1 // Asumiendo que el ID del usuario está en req.user.id
        });

        return { message: `Distrito con ID ${DistritoId} borrado correctamente` };
      });

      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo borrar el distrito ${DistritoId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al borrar distrito' });
    }
  }
}

module.exports = Distrito;