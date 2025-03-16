import { Component, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeriodoAcademico } from '../model/periodoAcademico';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-periodo-academico',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './periodo-academico.component.html',
  styleUrl: './periodo-academico.component.css'
})
export class PeriodoAcademicoComponent {
  public title = 'Periodos Académicos';
  public Periodos = signal<PeriodoAcademico[]>([]);
  public periodosFiltrados: PeriodoAcademico[] = [];
  public searchTerm: string = '';
  public filterField: string = 'Nombre';
  public isModalOpen: boolean = false;

  constructor(private http: HttpClient) {
    this.metodoGETPeriodos();
  }

  public inputPeriodoId: string = '';
  public inputNombre: string = '';

  public metodoGETPeriodos() {
    this.http.get('http://localhost/periodosacademicos', {}).subscribe((periodosResponse) => {
      const periodos = periodosResponse as PeriodoAcademico[];
      this.Periodos.set(periodos);
      this.filtrarPeriodos();
    });
  }

  public agregarPeriodo() {
    if (!this.validarFormulario()) return;

    const cuerpo = {
      Nombre: this.inputNombre,
      UsuarioId: 1
    };

    this.http.post<any>('http://localhost/periodosacademicos', cuerpo).subscribe({
      next: (res) => {
        this.Periodos.update((periodos) => [...periodos, res.resultado]);
        this.metodoGETPeriodos();
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
          : 'No se pudo agregar el periodo académico.';
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

  public modificarPeriodo() {
    if (!this.validarFormulario()) return;

    const cuerpo = {
      Nombre: this.inputNombre,
      UsuarioId: 1
    };

    this.http.put<any>('http://localhost/periodosacademicos/' + this.inputPeriodoId, cuerpo).subscribe({
      next: (res) => {
        this.metodoGETPeriodos();
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
          : 'No se pudo modificar el periodo académico.';
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

  public desactivarPeriodo(id: any, estado: boolean) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción ${estado ? 'activará' : 'desactivará'} el periodo académico.`,
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

        this.http.put<any>('http://localhost/periodosacademicos/' + id, cuerpo).subscribe({
          next: (res) => {
            this.metodoGETPeriodos();
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
              text: err.error?.error || 'No se pudo modificar el estado del periodo académico.',
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

  public borrarPeriodo(Id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el periodo académico de forma permanente.',
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
        this.http.request<any>('delete', 'http://localhost/periodosacademicos/' + Id, { body: cuerpo }).subscribe({
          next: (res) => {   
            this.Periodos.update((periodos) => periodos.filter((periodo) => periodo.PeriodoAcademicoId !== Id));
            this.filtrarPeriodos();  
            this.resetInputs();        
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
              : 'No se pudo eliminar el periodo académico.';
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
    });
  }

  public filtrarPeriodos() {
    const term = this.searchTerm.toLowerCase();

    this.periodosFiltrados = this.Periodos().filter(periodo => {
      const campo = (periodo as any)[this.filterField]?.toString().toLowerCase() || '';
      return term === '' || campo.includes(term);
    });
  }

  public resetInputs() {
    this.inputPeriodoId = '';
    this.inputNombre = '';
  }

  public openModal() {
    this.resetInputs();
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
    this.resetInputs();
  }

  public editPeriodo(periodo: PeriodoAcademico) {
    this.inputPeriodoId = periodo.PeriodoAcademicoId?.toString() || '';
    this.inputNombre = periodo.Nombre;
    this.isModalOpen = true;
  }

  public trackByPeriodoId(index: number, periodo: PeriodoAcademico) {
    return periodo.PeriodoAcademicoId;
  }

  private validarFormulario(): boolean {
    const errores: string[] = [];

    // Validación de nombre
    if (!this.inputNombre.trim()) {
      errores.push('El nombre es obligatorio.');
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
