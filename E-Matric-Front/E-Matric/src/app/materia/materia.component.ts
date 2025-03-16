import { Component, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Materia } from '../model/materia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './materia.component.html',
  styleUrl: './materia.component.css'
})
export class MateriaComponent {
  public title = 'Materias';
  public Materias = signal<Materia[]>([]);
  public materiasFiltradas: Materia[] = [];
  public searchTerm: string = '';
  public filterField: string = 'Codigo';
  public isModalOpen: boolean = false;

  constructor(private http: HttpClient) {
    this.metodoGETMaterias();
  }

  public inputMateriaId: string = '';
  public inputCodigo: string = '';
  public inputNombre: string = '';
  public inputCreditos: string = '';
  

  public metodoGETMaterias() {
    this.http.get('http://localhost/materias', {}).subscribe((materiasResponse) => {
      const materias = materiasResponse as Materia[];
      this.Materias.set(materias);
      this.filtrarMaterias();
    });
  }

  public agregarMateria() {
    if (!this.validarFormulario()) return;

    const cuerpo = {
      Codigo: this.inputCodigo,
      Nombre: this.inputNombre,
      Creditos: Number(this.inputCreditos),
      UsuarioId: 1
    };

    const codigoExiste = this.Materias().some(m => m.Codigo === this.inputCodigo);
    if (codigoExiste) {
      Swal.fire({
        title: 'Código duplicado',
        text: 'Ya existe una materia con este código.',
        icon: 'error',
        timer: 3000,
        toast: true,
        position: 'top-end'
      });
      return;
    }

    this.http.post<any>('http://localhost/materias', cuerpo).subscribe({
      next: (res) => {
        this.Materias.update((materias) => [...materias, res.resultado]);
        this.metodoGETMaterias();
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
          : 'No se pudo agregar la materia.';
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

  public modificarMateria() {
    if (!this.validarFormulario()) return;

    const cuerpo = {
      Codigo: this.inputCodigo,
      Nombre: this.inputNombre,
      Creditos: Number(this.inputCreditos),      
      UsuarioId: 1
    };

    this.http.put<any>('http://localhost/materias/' + this.inputMateriaId, cuerpo).subscribe({
      next: (res) => {
        this.metodoGETMaterias();
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
          : 'No se pudo modificar la materia.';
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

  public desactivarMateria(id: any, estado: boolean) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción ${estado ? 'activará' : 'desactivará'} la materia.`,
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

        this.http.put<any>('http://localhost/materias/' + id, cuerpo).subscribe({
          next: (res) => {
            this.metodoGETMaterias();
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
              text: err.error?.error || 'No se pudo modificar la materia.',
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

  public borrarMateria(Id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la materia de forma permanente.',
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

        this.http.request<any>('delete', 'http://localhost/materias/' + Id, { body: cuerpo }).subscribe({
          next: (res) => {
            this.Materias.update((materias) => materias.filter((materia) => materia.MateriaId !== Id));
            this.filtrarMaterias();
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
              text: err.error?.error || 'No se pudo eliminar la materia.',
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

  public filtrarMaterias() {
    const term = this.searchTerm.toLowerCase();

    this.materiasFiltradas = this.Materias().filter(materia => {
      const campo = (materia as any)[this.filterField]?.toString().toLowerCase() || '';
      return term === '' || campo.includes(term);
    });
  }

  public resetInputs() {
    this.inputMateriaId = '';
    this.inputCodigo = '';
    this.inputNombre = '';
    this.inputCreditos = '';
  }

  public openModal() {
    this.resetInputs();
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
    this.resetInputs();
  }

  public editMateria(materia: Materia) {
    this.inputMateriaId = materia.MateriaId?.toString() || '';
    this.inputCodigo = materia.Codigo;
    this.inputNombre = materia.Nombre;
    this.inputCreditos = materia.Creditos.toString();
    this.isModalOpen = true;
  }

  public trackByMateriaId(index: number, materia: Materia) {
    return materia.MateriaId;
  }

  public crearCodigo() {
    // Convierte materias a array si es necesario
    const materiasArray = this.Materias() || this.Materias;

    let codigo: string = '';
    let codigoExiste = true;

    while (codigoExiste) {
      const randomNumbers = Math.floor(100 + Math.random() * 900); // Genera un número aleatorio de 3 dígitos
      codigo = this.inputNombre.trim().split(' ').map(p => p[0].toUpperCase()).join('') + randomNumbers;

      codigoExiste = materiasArray.some(m => m.Codigo === codigo);
    }

    this.inputCodigo = codigo;
  }

  private validarFormulario(): boolean {
    const errores: string[] = [];

    // Convierte materias a array si es necesario
    const materiasArray = this.Materias() || this.Materias;

    // Validación de código
    if (!this.inputCodigo.trim()) {
      errores.push('El código es obligatorio.');
    } else {
      if (materiasArray.some(m =>
        m.Codigo === this.inputCodigo &&
        m.MateriaId?.toString() !== this.inputMateriaId
      )) {
        errores.push('Ya existe una materia con ese código.');
      }
    }

    // Validación de nombre
    if (!this.inputNombre.trim()) {
      errores.push('El nombre es obligatorio.');
    }

    // Validación de descripción
    if (!this.inputCreditos.trim()) {
      errores.push('Los creditos son obligatorias.');
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
