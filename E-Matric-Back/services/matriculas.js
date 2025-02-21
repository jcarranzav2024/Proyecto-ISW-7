const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Matricula {

  constructor() {}

  async Listar(MatriculaId) {
    try {
      if (MatriculaId === undefined) {
        return await prisma.matricula.findMany();
      } else {
        return await prisma.matricula.findMany({
          where: {
            MatriculaId: parseInt(MatriculaId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar matrículas:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { EstudianteId, CursoId, Estado } = req.body;
    try {
      const resultado = await prisma.matricula.create({
        data: {
          EstudianteId: EstudianteId,
          CursoId: CursoId,
          Estado: Estado,
          
        }
      });
      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo insertar la matrícula debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar matrícula' });
    }
  }

  async Actualizar(MatriculaId, req, res) {
    const { EstudianteId, CursoId, Estado } = req.body;
    try {
      const matriculaExistente = await prisma.matricula.findUnique({
        where: { MatriculaId: parseInt(MatriculaId) },
      });

      if (!matriculaExistente) {
        throw new Error(`Matrícula con ID ${MatriculaId} no encontrada`);
      }

      const resultado = await prisma.matricula.update({
        where: { MatriculaId: parseInt(MatriculaId) },
        data: {
          EstudianteId: EstudianteId,
          CursoId: CursoId,
          Estado: Estado,
        },
      });

      res.json({ message: `Matrícula con ID ${MatriculaId} actualizada correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar la matrícula ${MatriculaId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar matrícula' });
    }
  }

  async Borrar(MatriculaId) {
    try {
      const resultado = await prisma.matricula.delete({
        where: {
          MatriculaId: parseInt(MatriculaId),
        },
      });
      return { message: `Matrícula con ID ${MatriculaId} borrada correctamente` };
    } catch (error) {
      console.error(`No se pudo borrar la matrícula ${MatriculaId} debido al error: ${error}`);
      throw error;
    }
  }
}

module.exports = Matricula;