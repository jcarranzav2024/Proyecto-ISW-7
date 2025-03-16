import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../model/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  public title = 'Usuarios';
  public Usuarios = signal<Usuario[]>([]);
  public usuariosFiltrados: Usuario[] = [];
  public searchTerm: string = '';
  public filterField: string = 'Identificacion';
  public isModalOpen: boolean = false;

  constructor(private http: HttpClient) {
    this.metodoGETUsuarios();
  }

  public inputUsuarioId: string = '';
  public inputIdentificacion: string = '';
  public inputLogin: string = '';
  public inputContrasena: string = '';
  public inputEmail: string = '';
  public inputRol: string = '';

  public metodoGETUsuarios() {
    this.http.get('http://localhost/usuarios', {}).subscribe((usuariosResponse) => {
      const usuarios = usuariosResponse as Usuario[];
      this.Usuarios.set(usuarios);
      this.filtrarUsuarios();
    });
  }

  public agregarUsuario() {

    if (!this.validarFormulario()) return;

    const cuerpo = {
      Identificacion: this.inputIdentificacion,
      Login: this.inputLogin,
      Contrasena: this.inputContrasena,
      Email: this.inputEmail,
      Rol: this.inputRol,
      UsuarioId: 1
    };
console.log(cuerpo);

    this.http.post<any>('http://localhost/usuarios', cuerpo).subscribe({
      next: (res) => {
        this.Usuarios.update((usuarios) => [...usuarios, res.resultado]);
        this.metodoGETUsuarios();
        this.closeModal();
        Swal.fire({
          title: 'Éxito',
          text: res.message,
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          customClass: {
            popup: 'swal2-toast swal2-success'
          }
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error?.error || 'No se pudo agregar el usuario.',
          icon: 'error',
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          customClass: {
            popup: 'swal2-toast swal2-error'
          }
        });
      }
    });
  }

  public modificarUsuario() {

    if (!this.validarFormulario()) return;

    const cuerpo = {
      Identificacion: this.inputIdentificacion,
      Login: this.inputLogin,
      Contrasena: this.inputContrasena,
      Email: this.inputEmail,
      Rol: this.inputRol,
      UsuarioId: 1
    };

    this.http.put<any>('http://localhost/usuarios/' + this.inputUsuarioId, cuerpo).subscribe({
      next: (res) => {
        this.metodoGETUsuarios();
        this.closeModal();
        Swal.fire({
          title: 'Éxito',
          text: res.message,
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          customClass: {
            popup: 'swal2-toast swal2-success'
          }
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error?.error || 'No se pudo modificar el usuario.',
          icon: 'error',
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          customClass: {
            popup: 'swal2-toast swal2-error'
          }
        });
      }
    });
  }

  public desactivarUsuario(id: any, estado: boolean) {	
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción ${estado ? 'activará' : 'desactivará'} al usuario.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${estado ? 'activar' : 'desactivar'}`,
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      timer: 5000, // 5 segundos para que se cierre automáticamente
      timerProgressBar: true
    }).then((result) => {
      if (result.isConfirmed) {
        const cuerpo = {
          Estado: estado,
          UsuarioId: 1
        };

        this.http.put<any>('http://localhost/usuarios/' + id, cuerpo).subscribe({
          next: (res) => {
            this.metodoGETUsuarios();
            Swal.fire({
              title: 'Éxito',
              text: res.message,
              icon: 'success',
              timer: 3000,
              timerProgressBar: true,
              toast: true,
              position: 'top-end',
              customClass: {
                popup: 'swal2-toast swal2-success'
              }
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: err.error?.error || 'No se pudo modificar el usuario.',
              icon: 'error',
              timer: 3000,
              timerProgressBar: true,
              toast: true,
              position: 'top-end',
              customClass: {
                popup: 'swal2-toast swal2-error'
              }
            });
          }
        });
      }
    });
  }

  public borrarUsuario(Id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al usuario de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      timer: 5000, // 5 segundos para que se cierre automáticamente
      timerProgressBar: true
    }).then((result) => {
      if (result.isConfirmed) {
        const cuerpo = { UsuarioId: 1 };

        this.http.request<any>('delete', 'http://localhost/usuarios/' + Id, { body: cuerpo }).subscribe({
          next: (res) => {
            this.Usuarios.update((usuarios) => usuarios.filter((usuario) => usuario.UsuarioId !== Id));
            this.filtrarUsuarios();
            this.resetInputs();
            Swal.fire({
              title: 'Eliminado',
              text: res.message,
              icon: 'success',
              timer: 3000,
              timerProgressBar: true,
              toast: true,
              position: 'top-end',
              customClass: {
                popup: 'swal2-toast swal2-success'
              }
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: err.error?.error || 'No se pudo eliminar el usuario.',
              icon: 'error',
              timer: 3000,
              timerProgressBar: true,
              toast: true,
              position: 'top-end',
              customClass: {
                popup: 'swal2-toast swal2-error'
              }
            });
          }
        });
      }
    });
  }

  public filtrarUsuarios() {
    const term = this.searchTerm.toLowerCase();
    this.usuariosFiltrados = this.Usuarios().filter((usuario) => {
      switch (this.filterField) {
        case 'Login':
          return usuario.Login.toLowerCase().includes(term);     
        case 'Email':
          return usuario.Email.toLowerCase().includes(term);
        default:
          return usuario.Identificacion.toLowerCase().includes(term);
      }
    });
  }

  public resetInputs() {
    this.inputUsuarioId = '';
    this.inputIdentificacion = '';
    this.inputLogin = '';
    this.inputContrasena = '';
    this.inputEmail = '';
    this.inputRol = '';
  }

  public openModal() {
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
    this.resetInputs();
  }

  public editUsuario(usuario: Usuario) {
    this.inputUsuarioId = usuario.UsuarioId?.toString() || '';
    this.inputIdentificacion = usuario.Identificacion;
    this.inputLogin = usuario.Login;
    this.inputContrasena = usuario.Contrasena;
    this.inputEmail = usuario.Email;
    this.inputRol = usuario.Rol;
    this.openModal();
  }

  public trackByUsuarioId(index: number, usuario: Usuario): string {
    return usuario.UsuarioId?.toString() || '';
  }

   private validarFormulario(): boolean {
      const errores: string[] = [];
  
      // Convierte usuario a array si es necesario
      const usuariosArray = this.Usuarios() || this.Usuarios;
  
      // Validación de identificación
      if (!this.inputIdentificacion.trim()) {
        errores.push('La identificación es obligatoria.');
      } else {
        if (this.inputIdentificacion.length < 9) {
          errores.push('La identificación debe tener al menos 9 caracteres.');
        }
        if (usuariosArray.some(d =>
          d.Identificacion === this.inputIdentificacion &&
          d.UsuarioId?.toString() !== this.inputUsuarioId
        )) {
          errores.push('Ya existe un docente con esa identificación.');
        }
      }
  
      // Validación de Login
      if (!this.inputLogin.trim()) {
        errores.push('El login es obligatorio.');
      } else if (/\d/.test(this.inputLogin)) {
        errores.push('El login no debe contener números.');
      }
  
      // Validación de Contraseña
      if (!this.inputContrasena.trim()) {
        errores.push('La contraseña es obligatoria.');
      } 
  
        
      // Validación de correo
      if (!this.inputEmail.trim()) {
        errores.push('El correo es obligatorio.');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.inputEmail.trim())) {
        errores.push('El correo no tiene un formato válido.');
      } else if (
        usuariosArray.some(d =>
          d.Email.trim().toLowerCase() === this.inputEmail.trim().toLowerCase() &&
          d.UsuarioId?.toString() !== this.inputUsuarioId
        )
      ) {
        errores.push('Ya existe un docente con ese correo.');
      }
    
      // Mostrar errores si existen
      if (errores.length > 0) {
        Swal.fire({
          title: 'Campos inválidos',
          html: errores.map(e => `<div>${e}</div>`).join(''),
          icon: 'warning',
          timer: 4000,
          timerProgressBar: true,
          toast: false,
          position: 'center',
          customClass: {
            popup: 'swal2-toast swal2-warning'
          }
        });
        return false;
      }
  
      return true;
    }

  
}