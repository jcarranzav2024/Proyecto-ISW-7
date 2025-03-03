const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Curso {

  constructor() {}

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
    const { MateriaId, DocenteId, OfertaAcademicaId, Cupo, Aula, HorarioId } = req.body;
    try {
      const resultado = await prisma.curso.create({
        data: {
          MateriaId: parseInt(MateriaId),
          DocenteId: parseInt(DocenteId),
          OfertaAcademicaId: parseInt(OfertaAcademicaId),
          Cupo: parseInt(Cupo),
          Aula: Aula,
          HorarioId: parseInt(HorarioId),
          CreadoEn: new Date()
        }
      });
      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo insertar el curso debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar curso' });
    }
  }

  async Actualizar(CursoId, req, res) {
    const { MateriaId, DocenteId, OfertaAcademicaId, Cupo, Aula, HorarioId } = req.body;
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
      if (OfertaAcademicaId !== undefined) data.OfertaAcademicaId = parseInt(OfertaAcademicaId);
      if (Cupo !== undefined) data.Cupo = parseInt(Cupo);
      if (Aula !== undefined) data.Aula = Aula;
      if (HorarioId !== undefined) data.HorarioId = parseInt(HorarioId);
  
      const resultado = await prisma.curso.update({
        where: { CursoId: parseInt(CursoId) },
        data,
      });
  
      res.json({ message: `Curso con ID ${CursoId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el curso ${CursoId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar curso' });
    }
  }

  async Borrar(CursoId) {
    try {
      const resultado = await prisma.curso.delete({
        where: {
          CursoId: parseInt(CursoId),
        },
      });
      return { message: `Curso con ID ${CursoId} borrado correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar el curso ${CursoId} debido al error: ${error}`);
      throw error;
    }
  }
}

module.exports = Curso;