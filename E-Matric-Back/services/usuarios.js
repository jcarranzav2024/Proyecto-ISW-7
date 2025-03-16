const { PrismaClient } = require('@prisma/client');
const Auditoria = require('./auditorias');
const prisma = new PrismaClient();
const auditoria = new Auditoria();

class Usuario {
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
    if (data.Login !== undefined) {
      if (!data.Login.trim()) {
        errores.push('El login es obligatorio.');
      } else if (/\d/.test(data.Login)) {
        errores.push('El login no debe contener números.');
      }
    }

    // Validación de contraseña
    if (data.Contrasena !== undefined) {
      if (!data.Contrasena.trim()) {
        errores.push('La contraseña es obligatoria.');
      } else if (data.Contrasena.length < 8) {
        errores.push('La contraseña debe tener al menos 8 caracteres.');
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

    return errores;
  }

  async Listar(UsuarioId) {
    try {
      if (UsuarioId === undefined) {
        return await prisma.usuario.findMany();
      } else {
        return await prisma.usuario.findMany({
          where: {
            UsuarioId: parseInt(UsuarioId),
          },
        });
      }
    } catch (error) {
      console.error('Error al listar usuarios:', error);
      throw error;
    }
  }

  async Agregar(req, res) {
    const { Identificacion, Login, Contrasena, Email, Rol, Estado, UsuarioId } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const resultado = await prisma.usuario.create({
        data: {
          Identificacion,
          Login,
          Contrasena,
          Email,
          Rol,
          Estado,
          CreadoEn: new Date()
        }
      });

      await auditoria.Agregar({
        Accion: `Agregar usuario con la identificación ${Identificacion}`,
        UsuarioId: UsuarioId || 1
      });

      res.json({ message: 'El usuario fue agregado exitosamente.', resultado });
    } catch (error) {
      if (error.code === 'P2002') {
        // Prisma error de clave duplicada
        const campo = error.meta?.target?.[0];
        res.status(400).json({ error: `Ya existe un usuario con el mismo valor en el campo: ${campo}.` });
      } else {
        console.error(`Error al agregar usuario:`, error);
        res.status(500).json({ error: 'Ocurrió un error inesperado al agregar el usuario.' });
      }
    }
  }

  async Actualizar(UsuarioId, req, res) {
    const { Identificacion, Login, Contrasena, Email, Rol, Estado } = req.body;
    const errores = this.validarFormulario(req.body);

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    try {
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { UsuarioId: parseInt(UsuarioId) },
      });

      if (!usuarioExistente) {
        return res.status(404).json({ error: `No se encontró un usuario con ID ${UsuarioId}.` });
      }

      const data = {};
      if (Identificacion !== undefined) data.Identificacion = Identificacion;
      if (Login !== undefined) data.Login = Login;
      if (Contrasena !== undefined) data.Contrasena = Contrasena;
      if (Email !== undefined) data.Email = Email;
      if (Rol !== undefined) data.Rol = Rol;
      if (Estado !== undefined) data.Estado = Estado;

      const resultado = await prisma.usuario.update({
        where: { UsuarioId: parseInt(UsuarioId) },
        data,
      });

      await auditoria.Agregar({
        Accion: `Actualizar usuario con la identificación ${Identificacion}`,
        UsuarioId: req.user ? req.user.id : 1 // Manejar el caso en que req.user no esté definido
      });

      res.json({ message: `Usuario con ID ${UsuarioId} actualizado correctamente`, resultado });
    } catch (error) {
      if (error.code === 'P2002') {
        const campo = error.meta?.target?.[0];
        res.status(400).json({ error: `Ya existe otro usuario con el mismo valor en el campo: ${campo}.` });
      } else {
        console.error(`Error al actualizar usuario:`, error);
        res.status(500).json({ error: 'Ocurrió un error inesperado al actualizar el usuario.' });
      }
    }
  }

  async Borrar(UsuarioId, req, res) {
    const id = parseInt(UsuarioId);
    const { UsuarioId: UsuarioIdReq } = req.body;

    try {
      const resultado = await prisma.usuario.delete({
        where: { UsuarioId: id }
      });

      await auditoria.Agregar({
        Accion: `Borrar usuario con el ID ${UsuarioId}`,
        UsuarioId: UsuarioIdReq || req.user.id 
      });

      res.json({ message: 'El usuario fue eliminado exitosamente.' });
    } catch (error) {
      console.error(`Error al borrar usuario ${UsuarioId}:`, error);
      res.status(500).json({ error: 'No se pudo eliminar el usuario. Verifique si está relacionado con otros datos.' });
    }
  }
}

module.exports = Usuario;