const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class OfertaAcademica {

  constructor() {}

  async Listar(OfertaAcademicaId) {
    try {
      if (OfertaAcademicaId === undefined) {
        return await prisma.ofertaAcademica.findMany();
      } else {
        return await prisma.ofertaAcademica.findMany({
          where: {
            OfertaAcademicaId: parseInt(OfertaAcademicaId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar ofertas académicas:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { PeriodoAcademicoId } = req.body;
    try {
      const resultado = await prisma.ofertaAcademica.create({
        data: {
          PeriodoAcademicoId: PeriodoAcademicoId,
          CreadoEn: new Date()
        }
      });
      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo insertar la oferta académica debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar oferta académica' });
    }
  }

  async Actualizar(OfertaAcademicaId, req, res) {
    const { PeriodoAcademicoId } = req.body;
    try {
      const ofertaAcademicaExistente = await prisma.ofertaAcademica.findUnique({
        where: { OfertaAcademicaId: parseInt(OfertaAcademicaId) },
      });

      if (!ofertaAcademicaExistente) {
        throw new Error(`Oferta académica con ID ${OfertaAcademicaId} no encontrada`);
      }

      const resultado = await prisma.ofertaAcademica.update({
        where: { OfertaAcademicaId: parseInt(OfertaAcademicaId) },
        data: {
          PeriodoAcademicoId: PeriodoAcademicoId,
        },
      });

      res.json({ message: `Oferta académica con ID ${OfertaAcademicaId} actualizada correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar la oferta académica ${OfertaAcademicaId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar oferta académica' });
    }
  }

  async Borrar(OfertaAcademicaId) {
    try {
      const resultado = await prisma.ofertaAcademica.delete({
        where: {
          OfertaAcademicaId: parseInt(OfertaAcademicaId),
        },
      });
      return { message: `Oferta académica con ID ${OfertaAcademicaId} borrada correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar la oferta académica ${OfertaAcademicaId} debido al error: ${error}`);
      throw error;
    }
  }
}

module.exports = OfertaAcademica;