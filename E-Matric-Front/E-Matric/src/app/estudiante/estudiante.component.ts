import { Component, signal } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../model/estudiante';
import Swal from 'sweetalert2';
import { Provincia } from '../model/provincia';
import { Canton } from '../model/canton';
import { Distrito } from '../model/distrito';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent {
  public title = 'Estudiantes';
  public Estudiantes = signal<Estudiante[]>([]);
  public estudiantesFiltrados: Estudiante[] = [];
  public Provincias = signal<Provincia[]>([]);
  public Cantones = signal<Canton[]>([]);
  public Distritos = signal<Distrito[]>([]);
  public CantonesFiltrados: Canton[] = [];
  public DistritosFiltrados: Distrito[] = [];
  public searchTerm: string = '';
  public filterField: string = 'Identificacion';
  public isModalOpen: boolean = false;

  constructor(private http: HttpClient) {
    this.metodoGETEstudiantes();
    this.metodoGETProvincias();
    this.metodoGETCantones();
    this.metodoGETDistritos();
  }

  public inputEstudianteId: string = '';
  public inputIdentificacion: string = '';
  public inputNombre: string = '';
  public inputApellido1: string = '';
  public inputApellido2: string = '';
  public inputCorreo: string = '';
  public inputDireccion: string = '';
  public inputTelefono: string = '';
  public inputProvinciaId: number = 0;
  public inputCantonId: number = 0;
  public inputDistritoId: number = 0;

  public metodoGETEstudiantes() {
    this.http.get('http://localhost/estudiantes', {}).subscribe((estudiantesResponse) => {
      const estudiantes = estudiantesResponse as Estudiante[];
      this.Estudiantes.set(estudiantes);
      this.filtrarEstudiantes();
    });
  }

  public metodoGETProvincias() {
    this.http.get('http://localhost/provincias', {}).subscribe((provinciasResponse) => {
      const provincias = provinciasResponse as Provincia[];
      this.Provincias.set(provincias);
    });
  }

  public metodoGETCantones() {
    this.http.get('http://localhost/cantones', {}).subscribe((cantonesResponse) => {
      const cantones = cantonesResponse as Canton[];
      this.Cantones.set(cantones);
      console.log(cantones);
    });
  }

  public metodoGETDistritos() {
    this.http.get('http://localhost/distritos', {}).subscribe((distritosResponse) => {
      const distritos = distritosResponse as Distrito[];
      this.Distritos.set(distritos);
    });
  }

  public onProvinciaChange() {
    this.CantonesFiltrados = this.Cantones().filter(
      canton => Number(canton.ProvinciaId) === Number(this.inputProvinciaId)
    );
    console.log('Cantones filtrados:', this.CantonesFiltrados);
    this.inputCantonId = 0;
    this.DistritosFiltrados = [];
  }

  public onCantonChange() {
    this.DistritosFiltrados = this.Distritos().filter(distrito => Number(distrito.CantonId) === Number(this.inputCantonId));
    console.log('Distritos filtrados:', this.DistritosFiltrados);
    this.inputDistritoId = 0;
  }

  public agregarEstudiante() {
    if (!this.validarFormulario()) return;
    // Buscar la provincia
    const provincia = this.Provincias().find(p => Number(p.ProvinciaId) === Number(this.inputProvinciaId));
    // Buscar el cantón y distrito
    const canton = this.Cantones().find(c => Number(c.CantonId) === Number(this.inputCantonId))?.Canton || '';
    const distrito = this.Distritos().find(d => Number(d.DistritoId) === Number(this.inputDistritoId))?.Distrito || '';
    // Construir la dirección
    const direccion = `${provincia ? provincia.Provincia : 'Provincia no encontrada'}, ${canton || 'Cantón no encontrado'}, ${distrito || 'Distrito no encontrado'}`;

    const cuerpo = {
      Identificacion: this.inputIdentificacion,
      Nombre: this.inputNombre,
      Apellido1: this.inputApellido1,
      Apellido2: this.inputApellido2,
      Correo: this.inputCorreo,
      Direccion: direccion,
      Telefono: this.inputTelefono,
      UsuarioId: 1
    };

    this.http.post<any>('http://localhost/estudiantes', cuerpo).subscribe({
      next: (res) => {
        this.Estudiantes.update((estudiantes) => [...estudiantes, res.resultado]);
        this.metodoGETEstudiantes();
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
      error: (err: HttpErrorResponse) => {
        const errorMessage = err.error?.errores?.length > 0 
        ? err.error.errores.join(', ') 
        : 'No se pudo agregar el estudiante.';
        Swal.fire({
          title: 'Error',
          text: errorMessage,
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

  public modificarEstudiante() {
    if (!this.validarFormulario()) return;

    // Buscar la provincia
    const provincia = this.Provincias().find(p => Number(p.ProvinciaId) === Number(this.inputProvinciaId));
    // Buscar el cantón y distrito
    const canton = this.Cantones().find(c => Number(c.CantonId) === Number(this.inputCantonId))?.Canton || '';
    const distrito = this.Distritos().find(d => Number(d.DistritoId) === Number(this.inputDistritoId))?.Distrito || '';
    // Construir la dirección
    const direccion = `${provincia ? provincia.Provincia : 'Provincia no encontrada'}, ${canton || 'Cantón no encontrado'}, ${distrito || 'Distrito no encontrado'}`;

    const cuerpo = {
      Identificacion: this.inputIdentificacion,
      Nombre: this.inputNombre,
      Apellido1: this.inputApellido1,
      Apellido2: this.inputApellido2,
      Correo: this.inputCorreo,
      Direccion: direccion,
      Telefono: this.inputTelefono,
      UsuarioId: 1
    };

    this.http.put<any>('http://localhost/estudiantes/' + this.inputEstudianteId, cuerpo).subscribe({
      next: (res) => {
        this.metodoGETEstudiantes();
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
      error: (err: HttpErrorResponse) => {
        const errorMessage = err.error?.errores?.length > 0 
        ? err.error.errores.join(', ') 
        : 'No se pudo agregar el estudiante.';
        Swal.fire({
          title: 'Error',
          text: errorMessage,
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

  public desactivarEstudiante(id: any, estado: boolean) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción ${estado ? 'activará' : 'desactivará'} al estudiante.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${estado ? 'activar' : 'desactivar'}`,
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      timer: 5000,
      timerProgressBar: true
    }).then((result) => {
      if (result.isConfirmed) {
        const cuerpo = {
          Estado: estado,
          UsuarioId: 1
        };

        this.http.put<any>('http://localhost/estudiantes/' + id, cuerpo).subscribe({
          next: (res) => {
            this.metodoGETEstudiantes();
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
              text: err.error?.error || 'No se pudo modificar el estudiante.',
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

  public borrarEstudiante(Id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al estudiante de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      timer: 5000,
      timerProgressBar: true
    }).then((result) => {
      if (result.isConfirmed) {
        const cuerpo = { UsuarioId: 1 };

        this.http.request<any>('delete', 'http://localhost/estudiantes/' + Id, { body: cuerpo }).subscribe({
          next: (res) => {
            this.Estudiantes.update((estudiantes) => estudiantes.filter((estudiante) => estudiante.EstudianteId !== Id));
            this.filtrarEstudiantes();
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
              text: err.error?.error || 'No se pudo eliminar el estudiante.',
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

  public filtrarEstudiantes() {
    const term = this.searchTerm.toLowerCase();
    this.estudiantesFiltrados = this.Estudiantes().filter((estudiante) => {
      switch (this.filterField) {
        case 'Nombre':
          return estudiante.Nombre.toLowerCase().includes(term);
        case 'Apellido1':
          return estudiante.Apellido1.toLowerCase().includes(term);
        case 'Apellido2':
          return estudiante.Apellido2.toLowerCase().includes(term);
        case 'Correo':
          return estudiante.Correo.toLowerCase().includes(term);
        case 'Direccion':
          return estudiante.Direccion.toLowerCase().includes(term);
        case 'Telefono':
          return estudiante.Telefono.toLowerCase().includes(term);
        default:
          return estudiante.Identificacion.toLowerCase().includes(term);
      }
    });
  }

  public resetInputs() {
    this.inputEstudianteId = '';
    this.inputIdentificacion = '';
    this.inputNombre = '';
    this.inputApellido1 = '';
    this.inputApellido2 = '';
    this.inputCorreo = '';
    this.inputDireccion = '';
    this.inputTelefono = '';
    this.inputProvinciaId = 0;
    this.inputCantonId = 0;
    this.inputDistritoId = 0;
  }

  public openModal() {
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
    this.resetInputs();
  }

  public editEstudiante(estudiante: Estudiante) {
    this.inputEstudianteId = estudiante.EstudianteId?.toString() || '';
    this.inputIdentificacion = estudiante.Identificacion;
    this.inputNombre = estudiante.Nombre;
    this.inputApellido1 = estudiante.Apellido1;
    this.inputApellido2 = estudiante.Apellido2;
    this.inputCorreo = estudiante.Correo;
    this.inputDireccion = estudiante.Direccion;
    this.inputTelefono = estudiante.Telefono;
    this.inputProvinciaId = Number(this.Provincias().find(p => p.Provincia === estudiante.Direccion.split(', ')[0])?.ProvinciaId) || 0;
    this.onProvinciaChange();
    this.inputCantonId = Number(this.Cantones().find(c => c.Canton === estudiante.Direccion.split(', ')[1])?.CantonId) || 0;
    this.onCantonChange();
    this.inputDistritoId = Number(this.Distritos().find(d => d.Distrito === estudiante.Direccion.split(', ')[2])?.DistritoId) || 0;

    this.openModal();
  }

  public trackByEstudianteId(index: number, estudiante: Estudiante): string {
    return estudiante.EstudianteId?.toString() || '';
  }

  private validarFormulario(): boolean {
    const errores: string[] = [];

    // Convierte estudiantes a array si es necesario
    const estudiantesArray = this.Estudiantes() || this.Estudiantes;

    // Validación de identificación
    if (!this.inputIdentificacion.trim()) {
      errores.push('La identificación es obligatoria.');
    } else {
      if (this.inputIdentificacion.length < 9) {
        errores.push('La identificación debe tener al menos 9 caracteres.');
      }
      if (estudiantesArray.some(e =>
        e.Identificacion === this.inputIdentificacion &&
        e.EstudianteId?.toString() !== this.inputEstudianteId
      )) {
        errores.push('Ya existe un estudiante con esa identificación.');
      }
    }

    // Validación de nombre
    if (!this.inputNombre.trim()) {
      errores.push('El nombre es obligatorio.');
    } else if (/\d/.test(this.inputNombre)) {
      errores.push('El nombre no debe contener números.');
    }

    // Validación de apellido1
    if (!this.inputApellido1.trim()) {
      errores.push('El primer apellido es obligatorio.');
    } else if (/\d/.test(this.inputApellido1)) {
      errores.push('El primer apellido no debe contener números.');
    }

    // Validación de apellido2
    if (!this.inputApellido2.trim()) {
      errores.push('El segundo apellido es obligatorio.');
    } else if (/\d/.test(this.inputApellido2)) {
      errores.push('El segundo apellido no debe contener números.');
    }

    // Validación de correo
    if (!this.inputCorreo.trim()) {
      errores.push('El correo es obligatorio.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.inputCorreo.trim())) {
      errores.push('El correo no tiene un formato válido.');
    } else if (
      estudiantesArray.some(e =>
        e.Correo.trim().toLowerCase() === this.inputCorreo.trim().toLowerCase() &&
        e.EstudianteId?.toString() !== this.inputEstudianteId
      )
    ) {
      errores.push('Ya existe un estudiante con ese correo.');
    }

    // Validación de teléfono
    if (!this.inputTelefono.trim()) {
      errores.push('El teléfono es obligatorio.');
    } else if (!/^(?:\+506\s?)?\d{4}[-\s]?\d{4}$/.test(this.inputTelefono.trim())) {
      errores.push('El teléfono debe tener al menos 8 dígitos numéricos y puede incluir el código de área (+506).');
    } else if (
      estudiantesArray.some(e =>
        e.Telefono.trim() === this.inputTelefono.trim() &&
        e.EstudianteId?.toString() !== this.inputEstudianteId
      )
    ) {
      errores.push('Ya existe un estudiante con ese teléfono.');
    }

    // Validación de provincia, cantón y distrito
    if (!this.inputProvinciaId) errores.push('Debe seleccionar una provincia.');
    if (!this.inputCantonId) errores.push('Debe seleccionar un cantón.');
    if (!this.inputDistritoId) errores.push('Debe seleccionar un distrito.');

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
