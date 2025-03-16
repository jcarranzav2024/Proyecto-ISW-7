import { Component, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Docente } from '../model/docente';
import Swal from 'sweetalert2';
import { Provincia } from '../model/provincia';
import { Canton } from '../model/canton';
import { Distrito } from '../model/distrito';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent {
  public title = 'Docentes';
  public Docentes = signal<Docente[]>([]);
  public docentesFiltrados: Docente[] = [];
  public Provincias = signal<Provincia[]>([]);
  public Cantones = signal<Canton[]>([]);
  public Distritos = signal<Distrito[]>([]);
  public CantonesFiltrados: Canton[] = [];
  public DistritosFiltrados: Distrito[] = [];
  public searchTerm: string = '';
  public filterField: string = 'Identificacion';
  public isModalOpen: boolean = false;
  
  constructor(private http: HttpClient) {
    this.metodoGETDocentes();
    this.metodoGETProvincias();
    this.metodoGETCantones();
    this.metodoGETDistritos();

  }

  public inputDocenteId: string = '';
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

  public metodoGETDocentes() {
    this.http.get('http://localhost/docentes', {}).subscribe((docentesResponse) => {
      const docentes = docentesResponse as Docente[];
      this.Docentes.set(docentes);
      this.filtrarDocentes();
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

  public agregarDocente() {

    if (!this.validarFormulario()) return;
    // Buscar la provincia
    const provincia = this.Provincias().find(p => Number(p.ProvinciaId) === Number(this.inputProvinciaId));

    // Buscar el cantón y distrito
    const canton = this.Cantones().find(c => Number(c.CantonId) === Number(this.inputCantonId))?.Canton || '';
    const distrito = this.Distritos().find(d => Number(d.DistritoId) === Number(this.inputDistritoId))?.Distrito || '';

    // Construir la dirección
    const direccion = `${provincia ? provincia.Provincia : 'Provincia no encontrada'}, ${canton || 'Cantón no encontrado'}, ${distrito || 'Distrito no encontrado'}`;
    console.log('Dirección construida:', direccion);


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

    const identificacionExiste = this.Docentes().some(d => d.Identificacion === this.inputIdentificacion);
    if (identificacionExiste) {
      Swal.fire({
        title: 'Identificación duplicada',
        text: 'Ya existe un docente con esta identificación.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top-end'
      });
      return;
    }

    this.http.post<any>('http://localhost/docentes', cuerpo).subscribe({
      next: (res) => {
        this.Docentes.update((docentes) => [...docentes, res.resultado]);
        this.metodoGETDocentes();
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
          : 'No se pudo agregar el docente.';
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

  public modificarDocente() {

    if (!this.validarFormulario()) return;

    // Buscar la provincia
    const provincia = this.Provincias().find(p => Number(p.ProvinciaId) === Number(this.inputProvinciaId));

    // Buscar el cantón y distrito
    const canton = this.Cantones().find(c => Number(c.CantonId) === Number(this.inputCantonId))?.Canton || '';
    const distrito = this.Distritos().find(d => Number(d.DistritoId) === Number(this.inputDistritoId))?.Distrito || '';

    // Construir la dirección
    const direccion = `${provincia ? provincia.Provincia : 'Provincia no encontrada'}, ${canton || 'Cantón no encontrado'}, ${distrito || 'Distrito no encontrado'}`;

    console.log('Dirección construida:', direccion);

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

    this.http.put<any>('http://localhost/docentes/' + this.inputDocenteId, cuerpo).subscribe({
      next: (res) => {
        this.metodoGETDocentes();
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
          : 'No se pudo agregar el docente.';
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

  public desactivarDocente(id: any, estado: boolean) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción ${estado ? 'activará' : 'desactivará'} al docente.`,
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

        this.http.put<any>('http://localhost/docentes/' + id, cuerpo).subscribe({
          next: (res) => {
            this.metodoGETDocentes();
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
              text: err.error?.error || 'No se pudo modificar el docente.',
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

  public borrarDocente(Id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al docente de forma permanente.',
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

        this.http.request<any>('delete', 'http://localhost/docentes/' + Id, { body: cuerpo }).subscribe({
          next: (res) => {
            this.Docentes.update((docentes) => docentes.filter((docente) => docente.DocenteId !== Id));
            this.filtrarDocentes();
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
              text: err.error?.error || 'No se pudo eliminar el docente.',
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

  public filtrarDocentes() {
    const term = this.searchTerm.toLowerCase();

    this.docentesFiltrados = this.Docentes().filter(docente => {
      const campo = (docente as any)[this.filterField]?.toString().toLowerCase() || '';
      return term === '' || campo.includes(term);
    });
  }


  public resetInputs() {
    this.inputDocenteId = '';
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
    this.CantonesFiltrados = [];
    this.DistritosFiltrados = [];
  }

  public openModal() {
    this.resetInputs();
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
    this.resetInputs();
  }

  public editDocente(docente: Docente) {
    this.inputDocenteId = docente.DocenteId?.toString() || '';
    this.inputIdentificacion = docente.Identificacion;
    this.inputNombre = docente.Nombre;
    this.inputApellido1 = docente.Apellido1;
    this.inputApellido2 = docente.Apellido2;
    this.inputCorreo = docente.Correo;
    this.inputTelefono = docente.Telefono;

    // Descomponer dirección (suponiendo formato: "Provincia, Cantón, Distrito")
    const partes = docente.Direccion?.split(',').map(p => p.trim()) || [];

    const provincia = this.Provincias().find(p => p.Provincia === partes[0]);
    if (provincia) {
      this.inputProvinciaId = provincia?.ProvinciaId ? Number(provincia.ProvinciaId) : 0;
      this.onProvinciaChange(); // cargar cantones
    }

    const canton = this.Cantones().find(c => c.Canton === partes[1]);
    if (canton) {
      this.inputCantonId = canton?.CantonId ? Number(canton.CantonId) : 0;
      this.onCantonChange(); // cargar distritos
    }

    const distrito = this.Distritos().find(d => d.Distrito === partes[2]);
    if (distrito) {
      this.inputDistritoId = distrito?.DistritoId ? Number(distrito.DistritoId) : 0;
    }

    this.isModalOpen = true;
  }


  public trackByDocenteId(index: number, docente: Docente) {
    return docente.DocenteId;
  }

  private validarFormulario(): boolean {
    const errores: string[] = [];

    // Convierte docentes a array si es necesario
    const docentesArray = this.Docentes() || this.Docentes;

    // Validación de identificación
    if (!this.inputIdentificacion.trim()) {
      errores.push('La identificación es obligatoria.');
    } else {
      if (this.inputIdentificacion.length < 9) {
        errores.push('La identificación debe tener al menos 9 caracteres.');
      }
      if (docentesArray.some(d =>
        d.Identificacion === this.inputIdentificacion &&
        d.DocenteId?.toString() !== this.inputDocenteId
      )) {
        errores.push('Ya existe un docente con esa identificación.');
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
      docentesArray.some(d =>
        d.Correo.trim().toLowerCase() === this.inputCorreo.trim().toLowerCase() &&
        d.DocenteId?.toString() !== this.inputDocenteId
      )
    ) {
      errores.push('Ya existe un docente con ese correo.');
    }

    // Validación de teléfono
    if (!this.inputTelefono.trim()) {
      errores.push('El teléfono es obligatorio.');
    } else if (!/^(?:\+506\s?)?\d{4}[-\s]?\d{4}$/.test(this.inputTelefono.trim())) {
      errores.push('El teléfono debe tener al menos 8 dígitos numéricos y puede incluir el código de área (+506).');
    } else if (
      docentesArray.some(d =>
        d.Telefono.trim() === this.inputTelefono.trim() &&
        d.DocenteId?.toString() !== this.inputDocenteId
      )
    ) {
      errores.push('Ya existe un docente con ese teléfono.');
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
