import { Component, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Carrera } from '../model/carrera';

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent {
  public title = 'Carreras';
  public carreras = signal<Carrera[]>([]);
  public carrerasFiltradas: Carrera[] = [];
  public searchTerm: string = '';
  public filterField: string = 'Nombre';
  public isModalOpen: boolean = false;
  public isDetallesModalOpen = false;
  public carreraSeleccionada: Carrera | null = null;

  public inputCarreraId: string = '';
  public inputNombre: string = '';
  public inputCodigo: string = '';
  public inputEstado: boolean = true;

  constructor(private http: HttpClient) {
    this.metodoGETCarreras();
  }

  public metodoGETCarreras() {
    this.http.get('http://localhost/carreras', {}).subscribe((carrerasResponse) => {
      const carreras = carrerasResponse as Carrera[];
      this.carreras.set(carreras);
      this.filtrarCarreras();
      console.log(carrerasResponse);
    });
  }

  public agregarCarrera() {
    if (!this.validarFormulario()) return;

    const cuerpo: Carrera = {
      Nombre: this.inputNombre,
      Codigo: this.inputCodigo,
      Estado: this.inputEstado
    };

    this.http.post<any>('http://localhost/carreras', cuerpo).subscribe({
      next: (res) => {
        this.carreras.update((carreras) => [...carreras, res.resultado]);
        this.metodoGETCarreras();
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
          : 'No se pudo agregar la carrera.';
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

  public modificarCarrera() {
    if (!this.validarFormulario()) return;

    const cuerpo= {
      CarreraId: this.inputCarreraId,
      Nombre: this.inputNombre,
      Codigo: this.inputCodigo,
      Estado: this.inputEstado,
      UsuarioId: 1
    };

    this.http.put<any>('http://localhost/carreras/' + this.inputCarreraId, cuerpo).subscribe({
      next: (res) => {
        this.metodoGETCarreras();
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
          : 'No se pudo modificar la carrera.';
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

  public desactivarCarrera(id: string, estado: boolean) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción ${estado ? 'activará' : 'desactivará'} la carrera.`,
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

        this.http.put<any>('http://localhost/carreras/' + id, cuerpo).subscribe({
          next: (res) => {
            this.metodoGETCarreras();
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
              text: err.error?.error || 'No se pudo modificar la carrera.',
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

  public eliminarCarrera(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la carrera de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      timer: 5000,
      timerProgressBar: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete<any>('http://localhost/carreras/' + id).subscribe({
          next: (res) => {
            this.carreras.update((carreras) => carreras.filter((carrera) => carrera.CarreraId !== id));
            this.filtrarCarreras();
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
              text: err.error?.error || 'No se pudo eliminar la carrera.',
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

  public filtrarCarreras() {
    const term = this.searchTerm.toLowerCase();

    this.carrerasFiltradas = this.carreras().filter(carrera => {
      const campo = (carrera as any)[this.filterField]?.toString().toLowerCase() || '';
      return term === '' || campo.includes(term);
    });
  }

  public resetInputs() {
    this.inputCarreraId = '';
    this.inputNombre = '';
    this.inputCodigo = '';
    this.inputEstado = true;
  }

  public openModal() {
    this.resetInputs();
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
    this.resetInputs();
  }

  public editCarrera(carrera: Carrera) {
    this.inputCarreraId = carrera.CarreraId || '';
    this.inputNombre = carrera.Nombre;
    this.inputCodigo = carrera.Codigo;
    this.inputEstado = carrera.Estado || true;
    this.isModalOpen = true;
  }

  public trackByCarreraId(index: number, carrera: Carrera) {
    return carrera.CarreraId;
  }

  private validarFormulario(): boolean {
    const errores: string[] = [];

    if (!this.inputNombre.trim()) {
      errores.push('El Nombre de la carrera es obligatorio.');
    }

    if (!this.inputCodigo.trim()) {
      errores.push('El Código de la carrera es obligatorio.');
    }

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

  mostrarDetalles(carrera: Carrera) {
    this.carreraSeleccionada = { ...carrera };
    this.isDetallesModalOpen = true;
  }

  closeDetallesModal() {
    this.isDetallesModalOpen = false;
    this.carreraSeleccionada = null;
  }
}
