const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class Curso {

  constructor() {}

  validarFormulario(data) {
    const errores = [];

    // Validación de MateriaId
    if (data.MateriaId === undefined || !Number.isInteger(data.MateriaId)) {
      errores.push('El ID de la materia es obligatorio y debe ser un número entero.');
    }

    // Validación de DocenteId
    if (data.DocenteId !== undefined && !Number.isInteger(data.DocenteId)) {
      errores.push('El ID del docente debe ser un número entero.');
    }

    // Validación de OfertaAcademicaId
    if (data.OfertaAcademicaId === undefined || !Number.isInteger(data.OfertaAcademicaId)) {
      errores.push('El ID de la oferta académica es obligatorio y debe ser un número entero.');
    }

    // Validación de Cupo
    if (data.Cupo === undefined || !Number.isInteger(data.Cupo)) {
      errores.push('El cupo es obligatorio y debe ser un número entero.');
    }

    // Validación de Aula
    if (data.Aula === undefined || !data.Aula.trim()) {
      errores.push('El aula es obligatoria.');
    }

    // Validación de HorarioId
    if (data.HorarioId !== undefined && !Number.isInteger(data.HorarioId)) {
      errores.push('El ID del horario debe ser un número entero.');
    }

    return errores;
  }

  async Listar(CursoId) {
    try {
      if (CursoId === undefined) {
        return await prisma.curso.findMany();
      } else {
        return await prisma.curso.findMany({
          where: {
            CursoId: parseInt(CursoId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar cursos:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { MateriaId, DocenteId, Cupo, Aula, HorarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const resultado = await prisma.curso.create({
        data: {
          MateriaId: parseInt(MateriaId),
          DocenteId: parseInt(DocenteId),         
          Cupo: parseInt(Cupo),
          Aula: Aula,
          HorarioId: parseInt(HorarioId),
          CreadoEn: new Date()
        }
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Agregar curso para la materia ${MateriaId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: 'Curso agregado correctamente', resultado });
    } catch (error) {
      console.error(`No se pudo insertar el curso debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar curso' });
    }
  }

  async Actualizar(CursoId, req, res) {
    const { MateriaId, DocenteId, Cupo, Aula, HorarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const cursoExistente = await prisma.curso.findUnique({
        where: { CursoId: parseInt(CursoId) },
      });

      if (!cursoExistente) {
        throw new Error(`Curso con ID ${CursoId} no encontrado`);
      }

      const data = {};
      if (MateriaId !== undefined) data.MateriaId = parseInt(MateriaId);
      if (DocenteId !== undefined) data.DocenteId = parseInt(DocenteId);
      if (Cupo !== undefined) data.Cupo = parseInt(Cupo);
      if (Aula !== undefined) data.Aula = Aula;
      if (HorarioId !== undefined) data.HorarioId = parseInt(HorarioId);

      const resultado = await prisma.curso.update({
        where: { CursoId: parseInt(CursoId) },
        data,
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Actualizar curso con ID ${CursoId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: `Curso con ID ${CursoId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el curso ${CursoId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar curso' });
    }
  }

  async Borrar(CursoId, req, res) {
    try {
      const resultado = await prisma.curso.delete({
        where: {
          CursoId: parseInt(CursoId),
        },
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Borrar curso con ID ${CursoId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: `Curso con ID ${CursoId} borrado correctamente` });
    } catch (error) {
      console.error(`No se pudo borrar el curso ${CursoId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al borrar curso' });
    }
  }
}

module.exports = Curso;