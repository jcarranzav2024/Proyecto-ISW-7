const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class Carrera {

  constructor() {}

  validarFormulario(data) {
    const errores = [];

    // Validación de Nombre
    if (data.Nombre === undefined || !data.Nombre.trim()) {
      errores.push('El nombre de la carrera es obligatorio.');
    }

    // Validación de Codigo
    if (data.Codigo === undefined || !data.Codigo.trim()) {
      errores.push('El código de la carrera es obligatorio.');
    }

    return errores;
  }

  async Listar(CarreraId) {
    try {
      if (CarreraId === undefined) {
        return await prisma.carrera.findMany();
      } else {
        return await prisma.carrera.findMany({
          where: {
            CarreraId: parseInt(CarreraId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar carreras:', error);
      throw error;
    }
  }

  async Agregar(req) {
    const { Nombre, Codigo, UsuarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
        throw { status: 400, errores }; // Lanza un error con los detalles
    }

    try {
        const resultado = await prisma.carrera.create({
            data: {
                Nombre: Nombre,
                Codigo: Codigo,
                CreadoEn: new Date()
            }
        });

        // Registrar la acción en auditoría
        await auditoria.Agregar({
            Accion: `Agregar carrera ${Nombre}`,
            UsuarioId: UsuarioId || 1
        });

        return { message: 'Carrera agregada correctamente', resultado };
    } catch (error) {
        console.error(`No se pudo insertar la carrera ${Nombre} debido al error: ${error}`);
        throw { status: 500, error: 'Error al agregar carrera' };
    }
}

  async Activar(CarreraId, req) {
    const { Estado, UsuarioId } = req.body;

    try {
        const carrera = await prisma.carrera.update({
            where: { CarreraId: parseInt(CarreraId) },
            data: { Estado: Estado, ActualizadoEn: new Date() }
        });

        // Registrar la acción en auditoría
        await auditoria.Agregar({
            Accion: `Activar carrera con ID ${CarreraId}`,
            UsuarioId: UsuarioId || 1
        });

        return {
            message: `Carrera con ID ${CarreraId} ${Estado ? 'activada' : 'desactivada'} correctamente`,
            carrera
        };
    } catch (error) {
        console.error(`No se pudo activar la carrera ${CarreraId} debido al error: ${error}`);
        throw { status: 500, error: 'Error al activar carrera' };
    }
  }

  async Actualizar(CarreraId, req) {
    const { Nombre, Codigo, UsuarioId, Estado } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      throw { status: 400, errores }; // Throw an error instead of using res
    }

    try {
      const carreraExistente = await prisma.carrera.findUnique({
        where: { CarreraId: parseInt(CarreraId) },
      });

      if (!carreraExistente) {
        throw new Error(`Carrera con ID ${CarreraId} no encontrada`);
      }

      const data = {};  
      if (Nombre) data.Nombre = Nombre;
      if (Codigo) data.Codigo = Codigo;
      if (Estado) data.Estado = Estado;

      const resultado = await prisma.carrera.update({
        where: { CarreraId: parseInt(CarreraId) },
        data,
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Actualizar carrera con ID ${CarreraId}`,
        UsuarioId: UsuarioId || 1
      });

      return { message: `Carrera con ID ${CarreraId} actualizada correctamente`, resultado };
    } catch (error) {
      console.error(`No se pudo actualizar la carrera ${CarreraId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar carrera' });
    }
  }

  async Borrar(CarreraId, req, res) {
    try {
      const resultado = await prisma.carrera.delete({
        where: {
          CarreraId: parseInt(CarreraId),
        },
      });

      // Registrar la acción en auditoría
      await auditoria.Agregar({
        Accion: `Borrar carrera con ID ${CarreraId}`,
        UsuarioId: req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: `Carrera con ID ${CarreraId} borrada correctamente` });
    } catch (error) {
      console.error(`No se pudo borrar la carrera ${CarreraId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al borrar carrera' });
    }
  }
}

module.exports = Carrera;