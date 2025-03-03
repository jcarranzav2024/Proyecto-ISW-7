const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Distrito {

  constructor() {}

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
    const { Distrito, CantonId, Valoracion } = req.body;
    try {
      const resultado = await prisma.distritos.create({
        data: {
          Distrito: Distrito,
          CantonId: CantonId,
          FechaDeCreacion: new Date(),
          ActualizadoEn: new Date(),
          Valoracion: Valoracion || 'Bueno' // Valor por defecto si no se proporciona
        }
      });
      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo insertar el distrito debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar distrito' });
    }
  }

  async Actualizar(DistritoId, req, res) {
    const { Distrito, CantonId, Valoracion } = req.body;
    try {
      const distritoExistente = await prisma.distritos.findUnique({
        where: { DistritoId: parseInt(DistritoId) },
      });

      if (!distritoExistente) {
        throw new Error(`Distrito con ID ${DistritoId} no encontrado`);
      }

      const resultado = await prisma.distritos.update({
        where: { DistritoId: parseInt(DistritoId) },
        data: {
          Distrito: Distrito,
          CantonId: CantonId,
          Valoracion: Valoracion || distritoExistente.Valoracion, // Mantener la valoración existente si no se proporciona una nueva
          ActualizadoEn: new Date() // Actualizar la fecha de actualización
        },
      });

      res.json({ message: `Distrito con ID ${DistritoId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el distrito ${DistritoId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar distrito' });
    }
  }

  async Borrar(DistritoId) {
    try {
      const resultado = await prisma.distritos.delete({
        where: {
          DistritoId: parseInt(DistritoId),
        },
      });
      return { message: `Distrito con ID ${DistritoId} borrado correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar el distrito ${DistritoId} debido al error: ${error}`);
      throw error;
    }
  }
}

module.exports = Distrito;