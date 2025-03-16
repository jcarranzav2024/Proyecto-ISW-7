const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class Estudiante {

  constructor() {}

  validarFormulario(data) {
    const errores = [];

    // Validación de identificación
    if (data.Identificacion !== undefined) {
      if (!data.Identificacion.trim()) {
        errores.push('La identificación es obligatoria.');
      } else {
        if (data.Identificacion.length < 9) {
          errores.push('La identificación debe tener al menos 9 caracteres.');
        }
      }
    }

    // Validación de nombre
    if (data.Nombre !== undefined) {
      if (!data.Nombre.trim()) {
        errores.push('El nombre es obligatorio.');
      } else if (/\d/.test(data.Nombre)) {
        errores.push('El nombre no debe contener números.');
      }
    }

    // Validación de apellido1
    if (data.Apellido1 !== undefined) {
      if (!data.Apellido1.trim()) {
        errores.push('El primer apellido es obligatorio.');
      } else if (/\d/.test(data.Apellido1)) {
        errores.push('El primer apellido no debe contener números.');
      }
    }

    // Validación de apellido2
    if (data.Apellido2 !== undefined) {
      if (!data.Apellido2.trim()) {
        errores.push('El segundo apellido es obligatorio.');
      } else if (/\d/.test(data.Apellido2)) {
        errores.push('El segundo apellido no debe contener números.');
      }
    }

    // Validación de correo
    if (data.Correo !== undefined) {
      if (!data.Correo.trim()) {
        errores.push('El correo es obligatorio.');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.Correo.trim())) {
        errores.push('El correo no tiene un formato válido.');
      }
    }

    // Validación de teléfono
    if (data.Telefono !== undefined) {
      if (!data.Telefono.trim()) {
        errores.push('El teléfono es obligatorio.');
      } else if (!/^(?:\+506\s?)?\d{4}[-\s]?\d{4}$/.test(data.Telefono.trim())) {
        errores.push('El teléfono debe tener al menos 8 dígitos numéricos y puede incluir el código de área (+506).');
      }
    }

    return errores;
  }

  async Listar(EstudianteId) {
    try {
      if (EstudianteId === undefined) {
        return await prisma.estudiante.findMany();
      } else {
        return await prisma.estudiante.findMany({
          where: {
            EstudianteId: parseInt(EstudianteId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar estudiantes:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Identificacion, Nombre, Apellido1, Apellido2, Correo, Direccion, Telefono, UsuarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const resultado = await prisma.estudiante.create({
        data: {
          Identificacion,
          Nombre,
          Apellido1,
          Apellido2,
          Correo,
          Direccion,
          Telefono,
          CreadoEn: new Date()
        }
      });

      await auditoria.Agregar({
        Accion: `Agregar estudiante con la identificación ${Identificacion}`,
        UsuarioId: UsuarioId || req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: 'Estudiante agregado correctamente', resultado });
    } catch (error) {
      if (error.code === 'P2002') {
        const campo = error.meta?.target?.[0];
        res.status(400).json({ error: `Ya existe un estudiante con el mismo valor en el campo: ${campo}.` });
      } else {
        console.error(`Error al agregar estudiante:`, error);
        res.status(500).json({ error: 'Ocurrió un error inesperado al agregar el estudiante.' });
      }
    }
  }

  async Actualizar(EstudianteId, req, res) {
    const { Identificacion, Nombre, Apellido1, Apellido2, Correo, Direccion, Telefono, UsuarioId, Estado } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const estudianteExistente = await prisma.estudiante.findUnique({
        where: { EstudianteId: parseInt(EstudianteId) },
      });

      if (!estudianteExistente) {
        return res.status(404).json({ error: `No se encontró un estudiante con ID ${EstudianteId}.` });
      }

      const data = {};
      if (Identificacion !== undefined) data.Identificacion = Identificacion;
      if (Nombre !== undefined) data.Nombre = Nombre;
      if (Apellido1 !== undefined) data.Apellido1 = Apellido1;
      if (Apellido2 !== undefined) data.Apellido2 = Apellido2;
      if (Correo !== undefined) data.Correo = Correo;
      if (Direccion !== undefined) data.Direccion = Direccion;
      if (Telefono !== undefined) data.Telefono = Telefono;
      if (Estado !== undefined) data.Estado = Estado;

      const resultado = await prisma.estudiante.update({
        where: { EstudianteId: parseInt(EstudianteId) },
        data,
      });

      await auditoria.Agregar({
        Accion: `Actualizar estudiante con la identificación ${Identificacion}`,
        UsuarioId: UsuarioId || req.user.id // Asumiendo que el ID del usuario está en req.user.id
      });

      res.json({ message: `Estudiante con ID ${EstudianteId} actualizado correctamente`, resultado });
    } catch (error) {
      if (error.code === 'P2002') {
        const campo = error.meta?.target?.[0];
        res.status(400).json({ error: `Ya existe otro estudiante con el mismo valor en el campo: ${campo}.` });
      } else {
        console.error(`Error al actualizar estudiante:`, error);
        res.status(500).json({ error: 'Ocurrió un error inesperado al actualizar el estudiante.' });
      }
    }
  }

  async Borrar(EstudianteId, req, res) {
    const id = parseInt(EstudianteId);
    const { UsuarioId } = req.body;

    try {
      const resultado = await prisma.$transaction(async (prisma) => {
        await prisma.estudiante.delete({
          where: { EstudianteId: id }
        });

        await auditoria.Agregar({
          Accion: `Borrar estudiante con el ID ${EstudianteId}`,
          UsuarioId: UsuarioId || req.user.id // Asumiendo que el ID del usuario está en req.user.id
        });

        return { message: 'El estudiante fue eliminado exitosamente.' };
      });

      res.json(resultado);
    } catch (error) {
      console.error(`Error al borrar estudiante ${EstudianteId}:`, error);
      res.status(500).json({ error: 'No se pudo eliminar el estudiante. Verifique si está relacionado con otros datos.' });
    }
  }
}

module.exports = Estudiante;