import { Component, signal } from '@angular/core';
import { JsonPipe, CommonModule } from '@angular/common';
import { Canton } from '../model/canton';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Provincia } from '../model/provincia'; // Importa el modelo de Provincia
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cantones',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cantones.component.html',
  styleUrl: './cantones.component.css'
})
export class CantonesComponent {
  public title = 'Cantones';
  public Cantones = signal<Canton[]>([]);
  public cantonesFiltrados: Canton[] = [];
  public searchTerm: string = '';
  public filterField: string = 'Canton';
  public isModalOpen: boolean = false;
  public Provincias = signal<Provincia[]>([]); // Añade la señal para las provincias
  errorCanton: string = '';
  errorProvincia: string = '';

  constructor(private http: HttpClient) {
    this.metodoGETCantones();
    this.metodoGETProvincias(); // Carga las provincias al inicializar el componente
  }

  public inputCantonId: string = '';
  public inputCanton: string = '';
  public inputProvinciaId: number = 0; // Añade la propiedad para el id de la provincia seleccionada

  public metodoGETCantones() {
    this.http.get('http://localhost/cantones', {}).subscribe((cantonesResponse) => {
      const cantones = cantonesResponse as Canton[];
      this.Cantones.set(cantones);
      this.filtrarCantones();
    });
  }

  public metodoGETProvincias() {
    let cuerpo = {};
    this.http.get('http://localhost/provincias', cuerpo).subscribe((Provincias) => {
      const arr = Provincias as Provincia[];
      arr.forEach((Provincia) => {
        this.Provincias.update((Provincias) => [...Provincias, Provincia]);
      });
    });
  }

  public getNombreProvincia(provinciaId: number): string {
    const provincia = this.Provincias().find(p => Number(p.ProvinciaId) === provinciaId);
    return provincia ? provincia.Provincia : 'Desconocido';
  }

  public agregarCanton() {
    if (!this.validarFormulario()) return;

    const cuerpo = {
      Canton: this.inputCanton,
      ProvinciaId: this.inputProvinciaId
    };

    this.http.post<any>('http://localhost/cantones', cuerpo).subscribe({
      next: (res) => {
        this.Cantones.update((cantones) => [...cantones, res.resultado]);
        this.metodoGETCantones();
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
          : 'No se pudo agregar el canton.';
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

  public modificarCanton() {
    if (!this.validarFormulario()) return;

    const cuerpo = {
      Canton: this.inputCanton,
      ProvinciaId: this.inputProvinciaId
    };

    this.http.put<any>('http://localhost/cantones/' + this.inputCantonId, cuerpo).subscribe({
      next: (res) => {
        this.metodoGETCantones();
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
          : 'No se pudo actualizar el canton.';
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

  private validarFormulario(): boolean {
    const errores: string[] = [];

    // Validación de cantón
    if (!this.inputCanton.trim()) {
      errores.push('El nombre del cantón es obligatorio.');
    } else if (/\d/.test(this.inputCanton)) {
      errores.push('El nombre del cantón no debe contener números.');
    }

    // Validación de provincia
    if (!this.inputProvinciaId) {
      errores.push('Debe seleccionar una provincia.');
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

  public borrarCanton(Id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al cantón de forma permanente.',
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

        this.http.request<any>('delete', 'http://localhost/cantones/' + Id, { body: cuerpo }).subscribe({
          next: (res) => {
            this.Cantones.update((cantones) => cantones.filter((canton) => canton.CantonId !== Id));
            this.filtrarCantones();
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
              : 'No se pudo agregar el canton.';
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

  public filtrarCantones() {
    const term = this.searchTerm.toLowerCase();
    this.cantonesFiltrados = this.Cantones().filter((canton) => {
      switch (this.filterField) {
        case 'Provincia':
          return canton.ProvinciaId.toString().toLowerCase().includes(term);
        default:
          return canton.Canton.toLowerCase().includes(term);
      }
    });
  }

  public resetInputs() {
    this.inputCantonId = '';
    this.inputCanton = '';
    this.inputProvinciaId = 0; // Resetea el id de la provincia seleccionada
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetInputs();
  }

  editCanton(canton: Canton) {
    this.inputCantonId = canton.CantonId?.toString() || '';
    this.inputCanton = canton.Canton;
    this.inputProvinciaId = canton.ProvinciaId; // Establece el id de la provincia seleccionada
    this.openModal();
  }

  trackByCantonId(index: number, canton: Canton): string {
    return canton.CantonId?.toString() || '';
  }
}