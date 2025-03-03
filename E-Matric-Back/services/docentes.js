const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class Docente {

  constructor() {}

  async Listar(DocenteId) {
    try {
      if (DocenteId === undefined) {
        return await prisma.docente.findMany();
      } else {
        return await prisma.docente.findMany({
          where: {
            DocenteId: parseInt(DocenteId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar docentes:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Identificacion, Nombre, Apellido1, Apellido2, Correo, Direccion, Telefono } = req.body;
    try {
      const resultado = await prisma.docente.create({
        data: {
          Identificacion: Identificacion,
          Nombre: Nombre,
          Apellido1: Apellido1,
          Apellido2: Apellido2,
          Correo: Correo,
          Direccion: Direccion,
          Telefono: Telefono,
          CreadoEn: new Date()
        }
      });

       // Registrar la acción en auditoría
       await auditoria.Agregar({
        body: {
          Accion: `Agregar docente con la identificación ${Identificacion}`,
          UsuarioId: 1
        }
      }, res);

      res.json(resultado);
    } catch (error) {
      console.error(`No se pudo insertar el docente debido al error: ${error}`);
      res.status(500).json({ error: 'Error al agregar docente' });
    }
  }

  async Actualizar(DocenteId, req, res) {
    const { Identificacion, Nombre, Apellido1, Apellido2, Correo, Direccion, Telefono } = req.body;
    try {
      const docenteExistente = await prisma.docente.findUnique({
        where: { DocenteId: parseInt(DocenteId) },
      });

      if (!docenteExistente) {
        throw new Error(`Docente con ID ${DocenteId} no encontrado`);
      }

      const resultado = await prisma.docente.update({
        where: { DocenteId: parseInt(DocenteId) },
        data: {
          Identificacion: Identificacion,
          Nombre: Nombre,
          Apellido1: Apellido1,
          Apellido2: Apellido2,
          Correo: Correo,
          Direccion: Direccion,
          Telefono: Telefono,
        },
      });

         // Registrar la acción en auditoría
         await auditoria.Agregar({
          body: {
            Accion: `Actualizar docente con la identificación ${Identificacion}`,
            UsuarioId: 1
          }
        }, res);

      res.json({ message: `Docente con ID ${DocenteId} actualizado correctamente`, resultado });
    } catch (error) {
      console.error(`No se pudo actualizar el docente ${DocenteId} debido al error: ${error}`);
      res.status(500).json({ error: error.message || 'Error al actualizar docente' });
    }
  }

  async Borrar(DocenteId, res) {
    const id = parseInt(DocenteId);
  
    try {
      const resultado = await prisma.$transaction(async (prisma) => {
        // Actualizar los cursos para eliminar la referencia al docente
        await prisma.curso.updateMany({
          where: { DocenteId: id },
          data: { DocenteId: null }
        });
  
        // Eliminar el docente
        await prisma.docente.delete({
          where: {
            DocenteId: id,
          },
        });

        // Registrar la acción en auditoría
        await auditoria.Agregar({
          Accion: `Borrar docente con el id: ${DocenteId}`,
          UsuarioId: 1
        });
  
        return { message: `Docente con ID ${DocenteId} borrado correctamente` };
      });
  
      if (res) {
        res.json(resultado);
      } else {
        console.error('Response object is undefined');
      }
    } catch (error) {
      console.error(`No se pudo borrar el docente ${DocenteId} debido al error: ${error}`);
      if (res) {
        res.status(500).json({ error: error.message || 'Error al borrar docente' });
      }
    }
  }
}

module.exports = Docente;