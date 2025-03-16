const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class PlanEstudio {

  constructor() {}

  validarFormulario(data) {
    const errores = [];

    // Validación de Nombre
    if (data.Nombre === undefined || !data.Nombre.trim()) {
      errores.push('El nombre del plan de estudio es obligatorio.');
    }

    // Validación de Descripcion
    if (data.Descripcion === undefined || !data.Descripcion.trim()) {
      errores.push('La descripción del plan de estudio es obligatoria.');
    }

    return errores;
  }

  async Listar(PlanEstudioId) {
    try {
      if (PlanEstudioId === undefined) {
        return await prisma.planEstudio.findMany();
      } else {
        return await prisma.planEstudio.findMany({
          where: {
            PlanEstudioId: parseInt(PlanEstudioId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar planes de estudio:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Nombre, Descripcion } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const resultado = await prisma.planEstudio.create({
        data: {
          Nombre: Nombre,
          Descripcion: Descripcion,
          CreadoEn: new Date()
        }
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Agregar plan de estudio ${Nombre}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: 'Plan de estudio agregado correctamente', resultado });
    } catch (error) {
      console.error(`No se pudo insertar el plan de estudio ${Nombre} debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar plan de estudio' });
    }
  }

  async Actualizar(PlanEstudioId, req, res) {
    const { Nombre, Descripcion } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const planEstudioExistente = await prisma.planEstudio.findUnique({
        where: { PlanEstudioId: parseInt(PlanEstudioId) },
      });

      if (!planEstudioExistente) {
        throw new Error(`Plan de estudio con ID ${PlanEstudioId} no encontrado`);
      }

      const resultado = await prisma.planEstudio.update({
        where: { PlanEstudioId: parseInt(PlanEstudioId) },
        data: {
          Nombre: Nombre,
          Descripcion: Descripcion,
        },
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Actualizar plan de estudio con ID ${PlanEstudioId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: `Plan de estudio con ID ${PlanEstudioId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el plan de estudio ${PlanEstudioId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar plan de estudio' });
    }
  }

  async Borrar(PlanEstudioId, req, res) {
    try {
      const resultado = await prisma.planEstudio.delete({
        where: {
          PlanEstudioId: parseInt(PlanEstudioId),
        },
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Borrar plan de estudio con ID ${PlanEstudioId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: `Plan de estudio con ID ${PlanEstudioId} borrado correctamente` });
    } catch (error) {
      console.error(`No se pudo borrar el plan de estudio ${PlanEstudioId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al borrar plan de estudio' });
    }
  }
}

module.exports = PlanEstudio;