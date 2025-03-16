const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class Matricula {

  constructor() {}

  validarFormulario(data) {
    const errores = [];

    // Validación de EstudianteId
    if (data.EstudianteId === undefined || !Number.isInteger(data.EstudianteId)) {
      errores.push('El ID del estudiante es obligatorio y debe ser un número entero.');
    }

    // Validación de CursoId
    if (data.CursoId === undefined || !Number.isInteger(data.CursoId)) {
      errores.push('El ID del curso es obligatorio y debe ser un número entero.');
    }

    // Validación de Tipo
    const validTipos = ['Matriculado', 'Activo', 'Retirado', 'Finalizado'];
    if (data.Tipo === undefined || !validTipos.includes(data.Tipo)) {
      errores.push('El tipo de matrícula es obligatorio y debe ser uno de los siguientes valores: Matriculado, Activo, Retirado, Finalizado.');
    }

    // Validación de Estado
    if (data.Estado === undefined || typeof data.Estado !== 'boolean') {
      errores.push('El estado es obligatorio y debe ser un valor booleano.');
    }

    return errores;
  }

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
    const { EstudianteId, CursoId, Tipo, Estado } = req.body;

    // Validar formulario
    const errores = this.validarFormulario(req.body);
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const resultado = await prisma.matricula.create({
        data: {
          EstudianteId: EstudianteId,
          CursoId: CursoId,
          Tipo: Tipo,
          Estado: Estado,
        }
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Agregar matrícula para el estudiante ${EstudianteId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: 'Matrícula agregada correctamente', resultado });
    } catch (error) {
      console.error(`No se pudo insertar la matrícula debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar matrícula' });
    }
  }

  async Actualizar(MatriculaId, req, res) {
    const { EstudianteId, CursoId, Tipo, Estado } = req.body;

    // Validar formulario
    const errores = this.validarFormulario(req.body);
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

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
          Tipo: Tipo,
          Estado: Estado,
        },
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Actualizar matrícula con ID ${MatriculaId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: `Matrícula con ID ${MatriculaId} actualizada correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar la matrícula ${MatriculaId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar matrícula' });
    }
  }

  async Borrar(MatriculaId, req, res) {
    try {
      const resultado = await prisma.matricula.delete({
        where: {
          MatriculaId: parseInt(MatriculaId),
        },
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Borrar matrícula con ID ${MatriculaId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: `Matrícula con ID ${MatriculaId} borrada correctamente` });
    } catch (error) {
      console.error(`No se pudo borrar la matrícula ${MatriculaId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al borrar matrícula' });
    }
  }
}

module.exports = Matricula;