const { PrismaClient } = require("@prisma/client");
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class Provincias {

  constructor() {}

  validarFormulario(data) {
    const errores = [];

    // Validación de nombre de la provincia
    if (data.Provincia !== undefined) {
      if (!data.Provincia.trim()) {
        errores.push('El nombre de la provincia es obligatorio.');
      }
    }

    return errores;
  }

  async Listar(ProvinciaId) {
    try {
      if (ProvinciaId === undefined) {
        return await prisma.provincias.findMany();
      } else {
        return await prisma.provincias.findMany({
          where: {
            ProvinciaId: parseInt(ProvinciaId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar provincias:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Provincia, UsuarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const resultado = await prisma.provincias.create({
        data: {
          Provincia: Provincia,
          FechaDeCreacion: new Date()
        }
      });

      await auditoria.Agregar({
        Accion: `Agregar provincia ${Provincia}`,
        UsuarioId: UsuarioId || (req.user && req.user.id) || 1
      });

      res.json({ message: 'Provincia agregada correctamente', resultado });
    } catch (error) {
      console.error(`No se pudo insertar la provincia ${Provincia} debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar provincia' });
    }
  }

  async Actualizar(ProvinciaId, req, res) {
    const { Provincia, UsuarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const resultado = await prisma.provincias.update({
        where: { ProvinciaId: parseInt(ProvinciaId) },
        data: { Provincia: Provincia },
      });

      await auditoria.Agregar({
        Accion: `Actualizar provincia con ID ${ProvinciaId}`,
        UsuarioId: UsuarioId || (req.user && req.user.id) || 1
      });

      res.json({ message: `Provincia con ID ${ProvinciaId} actualizada correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar la provincia ${ProvinciaId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar provincia' });
    }
  }

  async Borrar(ProvinciaId, req, res) {
    const id = parseInt(ProvinciaId);
    const { UsuarioId } = req.body;

    try {
      const resultado = await prisma.$transaction(async (prisma) => {
        const cantones = await prisma.cantones.findMany({
          where: {
            ProvinciaId: id,
          },
        });

        for (const canton of cantones) {
          await prisma.distritos.deleteMany({
            where: {
              CantonId: canton.CantonId,
            },
          });
        }

        await prisma.cantones.deleteMany({
          where: {
            ProvinciaId: id,
          },
        });

        await prisma.provincias.delete({
          where: {
            ProvinciaId: id,
          },
        });

        await auditoria.Agregar({
          Accion: `Borrar provincia con ID ${ProvinciaId}`,
          UsuarioId: UsuarioId || (req.user && req.user.id) || 1
        });

        return { message: `Provincia con ID ${ProvinciaId} y sus cantones y distritos asociados borrados correctamente` };
      });

      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo borrar la provincia ${ProvinciaId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al borrar provincia' });
    }
  }
}

module.exports = Provincias;