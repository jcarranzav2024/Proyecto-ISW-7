const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class OfertaAcademica {

  constructor() {}

  validarFormulario(data) {
    const errores = [];

    // Validación de PeriodoAcademicoId
    if (data.PeriodoAcademicoId === undefined || !Number.isInteger(data.PeriodoAcademicoId)) {
      errores.push('El ID del periodo académico es obligatorio y debe ser un número entero.');
    }

    return errores;
  }

  async Listar(OfertaAcademicaId) {
    try {
      if (OfertaAcademicaId === undefined) {
        return await prisma.ofertaAcademica.findMany({
          include: {
            Cursos: true,
          },
        });
      } else {
        return await prisma.ofertaAcademica.findMany({
          where: {
            OfertaAcademicaId: parseInt(OfertaAcademicaId),
          },
          include: {
            Cursos: true,
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
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const resultado = await prisma.ofertaAcademica.create({
        data: {
          PeriodoAcademicoId: PeriodoAcademicoId,
          CreadoEn: new Date()
        }
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Agregar oferta académica para el periodo ${PeriodoAcademicoId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: 'Oferta académica agregada correctamente', resultado });
    } catch (error) {
      console.error(`No se pudo insertar la oferta académica debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar oferta académica' });
    }
  }

  async Actualizar(OfertaAcademicaId, req, res) {
    const { PeriodoAcademicoId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

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

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Actualizar oferta académica con ID ${OfertaAcademicaId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: `Oferta académica con ID ${OfertaAcademicaId} actualizada correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar la oferta académica ${OfertaAcademicaId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar oferta académica' });
    }
  }

  async Borrar(OfertaAcademicaId, req, res) {
    try {
      const resultado = await prisma.ofertaAcademica.delete({
        where: {
          OfertaAcademicaId: parseInt(OfertaAcademicaId),
        },
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Borrar oferta académica con ID ${OfertaAcademicaId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: `Oferta académica con ID ${OfertaAcademicaId} borrada correctamente` });
    } catch (error) {
      console.error(`No se pudo borrar la oferta académica ${OfertaAcademicaId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al borrar oferta académica' });
    }
  }
}

module.exports = OfertaAcademica;