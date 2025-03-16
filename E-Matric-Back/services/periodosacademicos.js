const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class PeriodoAcademico {

  constructor() { }

  validarFormulario(data) {
    const errores = [];

     // Validación de nombre
     if (data.Nombre !== undefined) {
      if (!data.Nombre.trim()) {
        errores.push('El nombre es obligatorio.');
      } 
    }

    return errores;
  }

  async Listar(PeriodoAcademicoId) {
    try {
      if (PeriodoAcademicoId === undefined) {
        return await prisma.periodoAcademico.findMany();
      } else {
        return await prisma.periodoAcademico.findMany({
          where: {
            PeriodoAcademicoId: parseInt(PeriodoAcademicoId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar periodos académicos:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Nombre, UsuarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const resultado = await prisma.periodoAcademico.create({
        data: {
          Nombre: Nombre,
          CreadoEn: new Date()
        }
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Agregar periodo académico ${Nombre}`,
        UsuarioId: UsuarioId || 1
      });

      res.json({ message: 'Periodo académico agregado correctamente', resultado });
    } catch (error) {
      console.error(`No se pudo insertar el periodo académico ${Nombre} debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar periodo académico' });
    }
  }

  async Actualizar(PeriodoAcademicoId, req, res) {
    const { Nombre, UsuarioId, Estado } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const periodoAcademicoExistente = await prisma.periodoAcademico.findUnique({
        where: { PeriodoAcademicoId: parseInt(PeriodoAcademicoId) },
      });

      if (!periodoAcademicoExistente) {
        throw new Error(`Periodo académico con ID ${PeriodoAcademicoId} no encontrado`);
      }

      const data = {};
      if (Nombre !== undefined) data.Nombre = Nombre;
      if (Estado !== undefined) data.Estado = Estado;


      const resultado = await prisma.periodoAcademico.update({
        where: { PeriodoAcademicoId: parseInt(PeriodoAcademicoId) },        
          data,
       
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Actualizar periodo académico con ID ${PeriodoAcademicoId}`,
        UsuarioId: UsuarioId || 1
      });

      res.json({ message: `Periodo académico con ID ${PeriodoAcademicoId} actualizado correctamente`, resultado });

    } catch (error) {
      if (error.code === 'P2002') {
        const campo = error.meta?.target?.[0];
        res.status(400).json({ error: `Ya existe un periodo con el mismo : ${campo}.` });
      } else {
        console.error(`Error al actualizar periodo:`, error);
        res.status(500).json({ error: 'Ocurrió un error inesperado al actualizar el periodo.' });
      }
    }
  }

  async Borrar(PeriodoAcademicoId, req, res) {
    const id = parseInt(PeriodoAcademicoId);
    const { UsuarioId } = req.body;
    try {
      const resultado = await prisma.periodoAcademico.delete({
        where: {
          PeriodoAcademicoId: id,
        },
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Borrar periodo académico con ID ${PeriodoAcademicoId}`,
        UsuarioId: UsuarioId || 1
      });

      res.json({ message: `Periodo académico con ID ${PeriodoAcademicoId} borrado correctamente` });
    } catch (error) {
      console.error(`No se pudo borrar el periodo académico ${PeriodoAcademicoId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al borrar periodo académico' });
    }
  }
}

module.exports = PeriodoAcademico;