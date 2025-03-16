const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class Canton {

  constructor() {}

  validarFormulario(data) {
    const errores = [];

    // Validación de nombre del cantón
    if (data.Canton !== undefined) {
      if (!data.Canton.trim()) {
        errores.push('El nombre del cantón es obligatorio.');
      }
    }

    return errores;
  }

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
    const { Canton, ProvinciaId, UsuarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const resultado = await prisma.cantones.create({
        data: {
          Canton: Canton,
          ProvinciaId: parseInt(ProvinciaId),
          FechaDeCreacion: new Date(),
          ActualizadoEn: new Date()
        }
      });

      await auditoria.Agregar({
        Accion: `Agregar cantón ${Canton}`,
        UsuarioId: UsuarioId || 1
      });

      res.json({ message: 'Cantón agregado correctamente', resultado });
    } catch (error) {      
      if (error.code === 'P2002') {
        // Prisma error de clave duplicada
        const campo = error.meta?.target?.[0];
        res.status(400).json({ error: `Ya existe la provincia con el mismo valor en el campo: ${campo}.` });
      } else {
        console.error(`Error al agregar provincia:`, error);
        res.status(500).json({ error: 'Ocurrió un error inesperado al agregar la provincia.' });
      }
    }
  }

  async Actualizar(CantonId, req, res) {
    const { Canton, ProvinciaId, UsuarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const cantonExistente = await prisma.cantones.findUnique({
        where: { CantonId: parseInt(CantonId) },
      });

      if (!cantonExistente) {
        return res.status(404).json({ error: `Cantón con ID ${CantonId} no encontrado` });
      }

      const resultado = await prisma.cantones.update({
        where: { CantonId: parseInt(CantonId) },
        data: {
          Canton: Canton,
          ProvinciaId: parseInt(ProvinciaId),
        },
      });

      await auditoria.Agregar({
        Accion: `Actualizar cantón con ID ${CantonId}`,
        UsuarioId: UsuarioId || (req.user && req.user.id) || 1
      });

      res.json({ message: `Cantón con ID ${CantonId} actualizado correctamente`, resultado });
    } catch (error) {
      if (error.code === 'P2002') {
        // Prisma error de clave duplicada
        const campo = error.meta?.target?.[0];
        res.status(400).json({ error: `Ya existe la provincia con el mismo valor en el campo: ${campo}.` });
      } else {
        console.error(`Error al actualizar provincia:`, error);
        res.status(500).json({ error: 'Ocurrió un error inesperado al actualizar la provincia.' });
      }
     }
  }

  async Borrar(CantonId, req, res) {
    const id = parseInt(CantonId);
    const { UsuarioId } = req.body;

    try {
      const resultado = await prisma.$transaction(async (prisma) => {
        await prisma.distritos.deleteMany({
          where: {
            CantonId: id,
          },
        });

        await prisma.cantones.delete({
          where: {
            CantonId: id,
          },
        });

        await auditoria.Agregar({
          Accion: `Borrar cantón con ID ${CantonId}`,
          UsuarioId: UsuarioId || (req.user && req.user.id) || 1
        });

        return { message: `Cantón con ID ${CantonId} y sus distritos asociados borrados correctamente` };
      });

      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo borrar el cantón ${CantonId} debido al error: ${error}`);
      res.status(500).json({ error: 'No se pudo borrar el cantón. Verifique si está relacionado con otros datos.' });
    }
  }
}

module.exports = Canton;