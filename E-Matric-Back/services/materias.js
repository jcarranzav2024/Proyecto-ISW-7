const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class Materia {
  constructor() {}

  validarFormulario(data) {
    const errores = [];

    // Validación de nombre
    if (data.Nombre !== undefined) {
      if (!data.Nombre.trim()) {
        errores.push('El nombre es obligatorio.');
      } 
    }

    // Validación de Codigo
    
    if (data.Codigo !== undefined) {
      if (!data.Codigo.trim()) {
        errores.push('El codigo es obligatoria.');
      }
    }

    // Validación de Creditos    
    if (data.Creditos !== undefined) {
      if (isNaN(data.Creditos) || data.Creditos <= 0) {
      errores.push('La cantidad de creditos debe ser un número mayor a 0.');
      }
    }

    return errores;
  }

  async Listar(MateriaId) {
    try {
      if (MateriaId === undefined) {
        return await prisma.materia.findMany();
      } else {
        return await prisma.materia.findMany({
          where: {
            MateriaId: parseInt(MateriaId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar materias:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Nombre, Codigo, Creditos, UsuarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const resultado = await prisma.materia.create({
        data: {
          Nombre,
          Codigo,
          Creditos,
          CreadoEn: new Date()
        }
      });

      await auditoria.Agregar({
        Accion: `Agregar materia ${Nombre}`,
        UsuarioId: UsuarioId || 1
      });

      res.json({ message: 'Materia agregada correctamente', resultado });
    } catch (error) {
      if (error.code === 'P2002') {
        const campo = error.meta?.target?.[0];
        res.status(400).json({ error: `Ya existe una materia con el mismo valor en el campo: ${campo}.` });
      } else {
        console.error(`Error al agregar materia:`, error);
        res.status(500).json({ error: 'Ocurrió un error inesperado al agregar la materia.' });
      }
    }
  }

  async Actualizar(MateriaId, req, res) {
    const { Nombre, Codigo, Creditos, UsuarioId, Estado } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }
    
    try {
      const materiaExistente = await prisma.materia.findUnique({
        where: { MateriaId: parseInt(MateriaId) },
      });

      if (!materiaExistente) {
        return res.status(404).json({ error: `No se encontró una materia con ID ${MateriaId}.` });
      }

      const data = {};
      if (Nombre !== undefined) data.Nombre = Nombre;
      if (Codigo !== undefined) data.Codigo = Codigo;
      if (Creditos !== undefined) data.Creditos = Creditos;
      if (Estado !== undefined) data.Estado = Estado;

      const resultado = await prisma.materia.update({
        where: { MateriaId: parseInt(MateriaId) },
        data,
      });

      await auditoria.Agregar({
        Accion: `Actualizar materia con ID ${MateriaId}`,
        UsuarioId: UsuarioId || 1
      });

      res.json({ message: `Materia con ID ${MateriaId} actualizada correctamente`, resultado });
    } catch (error) {
      if (error.code === 'P2002') {
        const campo = error.meta?.target?.[0];
        res.status(400).json({ error: `Ya existe otra materia con el mismo valor en el campo: ${campo}.` });
      } else {
        console.error(`Error al actualizar materia:`, error);
        res.status(500).json({ error: 'Ocurrió un error inesperado al actualizar la materia.' });
      }
    }
  }

  async Borrar(MateriaId, req, res) {
    const id = parseInt(MateriaId);
    const { UsuarioId } = req.body;

    try {
      const resultado = await prisma.materia.delete({
        where: {
          MateriaId: id,
        },
      });

      await auditoria.Agregar({
        Accion: `Borrar materia con ID ${MateriaId}`,
        UsuarioId: UsuarioId || 1
      });

      res.json({ message: `Materia con ID ${MateriaId} borrada correctamente` });
    } catch (error) {
      console.error(`Error al borrar materia ${MateriaId}:`, error);
      res.status(500).json({ error: 'No se pudo eliminar la materia. Verifique si está relacionada con otros datos.' });
    }
  }
}

module.exports = Materia;