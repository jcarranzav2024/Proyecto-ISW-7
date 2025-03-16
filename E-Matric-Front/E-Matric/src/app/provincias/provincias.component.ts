import { Component, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Provincia } from '../model/provincia';

@Component({
  selector: 'app-provincias',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './provincias.component.html',
  styleUrl: './provincias.component.css'
})
export class ProvinciasComponent {
  public title = 'Provincias';
  public Provincias = signal<Provincia[]>([]);
  public provinciasFiltradas: Provincia[] = [];
  public searchTerm: string = '';
  public filterField: string = 'Provincia';
  public isModalOpen: boolean = false;

  constructor(private http: HttpClient) {
    this.metodoGETProvincias();
  }

  public inputProvinciaId: string = '';
  public inputProvincia: string = '';

  public metodoGETProvincias() {
    this.http.get('http://localhost/provincias', {}).subscribe((provinciasResponse) => {
      const provincias = provinciasResponse as Provincia[];
      this.Provincias.set(provincias);
      this.filtrarProvincias();
    });
  }

  public agregarProvincia() {
    if (!this.validarFormulario()) return;

    const cuerpo = {
      Provincia: this.inputProvincia,
      UsuarioId: 1
    };

    this.http.post<any>('http://localhost/provincias', cuerpo).subscribe({
      next: (res) => {
        this.Provincias.update((provincias) => [...provincias, res.resultado]);
        this.metodoGETProvincias();
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
          : 'No se pudo agregar la provincia.';
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

  public modificarProvincia() {
    if (!this.validarFormulario()) return;

    const cuerpo = {
      Provincia: this.inputProvincia,
    };

    this.http.put<any>('http://localhost/provincias/' + this.inputProvinciaId, cuerpo).subscribe({
      next: (res) => {
        this.metodoGETProvincias();
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
          : 'No se pudo modificar la provincia.';
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

  public borrarProvincia(Id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la provincia de forma permanente.',
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

        this.http.request<any>('delete', 'http://localhost/provincias/' + Id, { body: cuerpo }).subscribe({
          next: (res) => {
            this.Provincias.update((provincias) => provincias.filter((provincia) => provincia.ProvinciaId !== Id));
            this.filtrarProvincias();
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
              text: err.error?.error || 'No se pudo eliminar la provincia.',
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

  public filtrarProvincias() {
    const term = this.searchTerm.toLowerCase();

    this.provinciasFiltradas = this.Provincias().filter(provincia => {
      const campo = (provincia as any)[this.filterField]?.toString().toLowerCase() || '';
      return term === '' || campo.includes(term);
    });
  }

  public resetInputs() {
    this.inputProvinciaId = '';
    this.inputProvincia = '';
  }

  public openModal() {
    this.resetInputs();
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
    this.resetInputs();
  }

  public editProvincia(provincia: Provincia) {
    this.inputProvinciaId = provincia.ProvinciaId?.toString() || '';
    this.inputProvincia = provincia.Provincia;
    this.isModalOpen = true;
  }

  public trackByProvinciaId(index: number, provincia: Provincia) {
    return provincia.ProvinciaId;
  }

  private validarFormulario(): boolean {
    const errores: string[] = [];

    // Validación de provincia
    if (!this.inputProvincia.trim()) {
      errores.push('El nombre de la provincia es obligatorio.');
    } else if (/\d/.test(this.inputProvincia)) {
      errores.push('El nombre de la provincia no debe contener números.');
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