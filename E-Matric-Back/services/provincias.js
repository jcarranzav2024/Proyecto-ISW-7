const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Provincias {

  constructor() {}

  async Agregar(req, res) {
    const { Provincia } = req.body;
    let resultado;
    try {
      resultado = await prisma.provincias.create({
        data: {
          Provincia: Provincia,
          FechaDeCreacion: new Date()
        }
      });
      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo insertar la provincia ${Provincia} debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar provincia' });
    }
  }

  async Actualizar(ProvinciaId, Provincia) {
    let resultado;
    try {
      resultado = await prisma.provincias.update({
        where: { ProvinciaId: parseInt(ProvinciaId) },
        data: { Provincia: Provincia },
      });
    } catch (error) {
      console.error(`No se pudo actualizar la provincia ${ProvinciaId} debido al error: ${error}`);
    }
    return resultado;
  }

  async Borrar(ProvinciaId) {
    let resultado;
    try {
      // Buscar todos los cantones de la provincia
      const cantones = await prisma.cantones.findMany({
        where: {
          ProvinciaId: parseInt(ProvinciaId),
        },
      });

      // Borrar todos los distritos de cada canton
      for (const canton of cantones) {
        await prisma.distritos.deleteMany({
          where: {
            CantonId: canton.CantonId,
          },
        });
      }

      // Borrar todos los cantones de la provincia
      await prisma.cantones.deleteMany({
        where: {
          ProvinciaId: parseInt(ProvinciaId),
        },
      });

      // Borrar la provincia
      resultado = await prisma.provincias.delete({
        where: {
          ProvinciaId: parseInt(ProvinciaId),
        },
      });

      return { message: `Provincia con ID ${ProvinciaId} y sus cantones y distritos asociados borrados correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar la provincia ${ProvinciaId} debido al error: ${error}`);
      throw error;
    }
  }

  async Listar(ProvinciaId) {
    let provincias;
    try {
      if (ProvinciaId === undefined) {
        provincias = await prisma.provincias.findMany();
      } else {
        provincias = await prisma.provincias.findMany({
          where: {
            ProvinciaId: parseInt(ProvinciaId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar provincias:', error);
      throw error;
    }
    return provincias;
  }
}

module.exports = Provincias;