const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class OfertaAcademica {

  constructor() { }

  validarFormulario(data) {
    const errores = [];



    return errores;
  }

  async Listar(OfertaAcademicaId) {
    try {
      if (OfertaAcademicaId === undefined) {
        return await prisma.ofertaAcademica.findMany({
          include: {
            CursoOfertaAcademica: {
              include: {
                Curso: true,
              },
            },
          },
        });
      } else {
        return await prisma.ofertaAcademica.findMany({
          where: {
            OfertaAcademicaId: parseInt(OfertaAcademicaId),
          },
          include: {
            CursoOfertaAcademica: {
              include: {
                Curso: true,
              },
            },
          },
        });
      }
    } catch (error) {
      console.error('Error al listar ofertas académicas:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { PeriodoAcademicoId, Cursos, UsuarioId,CarreraId } = req.body;
    const errores = this.validarFormulario(req.body);

    // Validar cada curso
    if (!Array.isArray(Cursos) || Cursos.length === 0) {
        errores.push('Debe proporcionar al menos un curso.');
    } else {
        const cursosList = await prisma.curso.findMany({
            where: {
                CursoId: {
                    in: Cursos
                }
            }
        });

        if (cursosList.length !== Cursos.length) {
            errores.push('Uno o más cursos proporcionados no existen.');
        }
    }

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    try {
        // Crear la oferta académica
        const ofertaAcademica = await prisma.ofertaAcademica.create({
            data: {
                PeriodoAcademicoId: parseInt(PeriodoAcademicoId),
                CarreraId:parseInt(CarreraId),
                CreadoEn: new Date()
            }
        });

        // Asignar los cursos a la oferta académica
        await Promise.all(Cursos.map(async (cursoId) => {
            await prisma.cursoOfertaAcademica.create({
                data: {
                    CursoId: cursoId,
                    OfertaAcademicaId: ofertaAcademica.OfertaAcademicaId
                }
            });
        }));

        // Registrar la acción en auditoría
        await auditoria.Agregar({
            Accion: `Agregar oferta académica para el periodo ${PeriodoAcademicoId} con cursos`,
            UsuarioId: UsuarioId || req.user.id // Asumiendo que el ID del usuario está en req.user.id
        });

        res.json({ message: 'Oferta académica agregada correctamente', ofertaAcademica });
    } catch (error) {
        console.error(`No se pudo insertar la oferta académica debido al error: ${error}`);
        res.status(500).json({ error: 'Error al agregar oferta académica' });
    }
}

  async Activar(OfertaAcademicaId, req, res) {  
    try {
        const { Estado, UsuarioId } = req.body;
        const ofertaAcademica = await prisma.ofertaAcademica.update({
            where: { OfertaAcademicaId: parseInt(OfertaAcademicaId) },
            data: { Estado: Estado, ActualizadoEn: new Date() }
        });

        // Registrar la acción en auditoría
        await auditoria.Agregar({
            Accion: `Activar oferta académica con ID ${OfertaAcademicaId}`,
            UsuarioId: UsuarioId || 1
        });

        if (Estado === true) {
            res.json({ message: `Oferta académica con ID ${OfertaAcademicaId} activada correctamente`, ofertaAcademica });
        } else {
            res.json({ message: `Oferta académica con ID ${OfertaAcademicaId} desactivada correctamente`, ofertaAcademica });
        }
        
    } catch (error) {
        console.error(`No se pudo activar la oferta académica ${OfertaAcademicaId} debido al error: ${error}`);
        res.status(500).json({ error: error.message || 'Error al activar oferta académica' });
    }
  }

  async Actualizar(OfertaAcademicaId, req, res) {
    const { PeriodoAcademicoId, Cursos, Estado, UsuarioId, CarreraId } = req.body;
    const errores = this.validarFormulario(req.body);

    // Validar cada curso
    if (!Array.isArray(Cursos) || Cursos.length === 0) {
        errores.push('Debe proporcionar al menos un curso.');
    } else {
        const cursosList = await prisma.curso.findMany({
            where: {
                CursoId: {
                    in: Cursos
                }
            }
        });

        if (cursosList.length !== Cursos.length) {
            errores.push('Uno o más cursos proporcionados no existen.');
        }
    }

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    try {
        // Actualizar la oferta académica
        const ofertaAcademica = await prisma.ofertaAcademica.update({
            where: { OfertaAcademicaId: parseInt(OfertaAcademicaId) },
            data: {
                PeriodoAcademicoId: parseInt(PeriodoAcademicoId),
                CarreraId:parseInt(CarreraId),
                ActualizadoEn: new Date()
            }
        });

        // Eliminar las asignaciones actuales de cursos a la oferta académica
        await prisma.cursoOfertaAcademica.deleteMany({
            where: { OfertaAcademicaId: parseInt(OfertaAcademicaId) }
        });

        // Asignar los nuevos cursos a la oferta académica
        await Promise.all(Cursos.map(async (cursoId) => {
            await prisma.cursoOfertaAcademica.create({
                data: {
                    CursoId: cursoId,
                    OfertaAcademicaId: ofertaAcademica.OfertaAcademicaId
                }
            });
        }));

        // Registrar la acción en auditoría
        await auditoria.Agregar({
            Accion: `Actualizar oferta académica con ID ${OfertaAcademicaId} y asignar sus cursos`,
            UsuarioId: UsuarioId || 1
        });

        res.json({ message: `Oferta académica con ID ${OfertaAcademicaId} actualizada correctamente`, ofertaAcademica });
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