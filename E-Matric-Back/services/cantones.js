const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Canton {

  constructor() {}

  async Listar(CantonId) {
    try {
      if (CantonId === undefined) {
        return await prisma.cantones.findMany();
      } else {
        return await prisma.cantones.findMany({
          where: {
            CantonId: parseInt(CantonId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar cantones:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Canton, ProvinciaId } = req.body;
    try {
      const resultado = await prisma.cantones.create({
        data: {
          Canton: Canton,
          ProvinciaId: ProvinciaId,
          FechaDeCreacion: new Date()
        }
      });
      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo insertar el cantón debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar cantón' });
    }
  }

  async Actualizar(CantonId, req, res) {
    const { Canton, ProvinciaId } = req.body;
    try {
      const cantonExistente = await prisma.cantones.findUnique({
        where: { CantonId: parseInt(CantonId) },
      });

      if (!cantonExistente) {
        throw new Error(`Cantón con ID ${CantonId} no encontrado`);
      }

      const resultado = await prisma.cantones.update({
        where: { CantonId: parseInt(CantonId) },
        data: {
          Canton: Canton,
          ProvinciaId: ProvinciaId,
        },
      });

      res.json({ message: `Cantón con ID ${CantonId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el cantón ${CantonId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar cantón' });
    }
  }

  async Borrar(CantonId) {
    try {
      const resultado = await prisma.cantones.delete({
        where: {
          CantonId: parseInt(CantonId),
        },
      });
      return { message: `Cantón con ID ${CantonId} borrado correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar el cantón ${CantonId} debido al error: ${error}`);
      throw error;
    }
  }
}

module.exports = Canton;