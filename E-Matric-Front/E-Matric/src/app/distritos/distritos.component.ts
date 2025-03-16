import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Distrito } from '../model/distrito';
import Swal from 'sweetalert2';
import { Canton } from '../model/canton';



@Component({
  selector: 'app-distritos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './distritos.component.html',
  styleUrl: './distritos.component.css'
})
export class DistritosComponent {
  public title = 'Distritos';
  public Distritos = signal<Distrito[]>([]);
  public distritosFiltrados: Distrito[] = [];
  public Cantones = signal<Canton[]>([]);
  public searchTerm: string = '';
  public filterField: string = 'Distrito';
  public isModalOpen: boolean = false;

  constructor(private http: HttpClient) {
    this.metodoGETDistritos();
    this.metodoGETCantones();
  }

  public inputDistritoId: string = '';
  public inputDistrito: string = '';
  public inputCantonId: number = 0;
  public inputValoracion: string = 'Bueno';

  public metodoGETDistritos() {
    this.http.get('http://localhost/distritos', {}).subscribe((distritosResponse) => {
      const distritos = distritosResponse as Distrito[];
      this.Distritos.set(distritos);
      this.filtrarDistritos();
    });
  }

  public metodoGETCantones() {
    let cuerpo = {};
    this.http.get('http://localhost/cantones', cuerpo).subscribe((Cantones) => {
      const arr = Cantones as Canton[];
      arr.forEach((Canton) => {
       this.Cantones.update((Cantones) => [...Cantones, Canton]);
      });      
    });    
  }

  public getNombreCanton(cantonId: number): string {
    const canton = this.Cantones().find(p => Number(p.CantonId) === cantonId);
    return canton ? canton.Canton : 'Desconocido';
  }

  public agregarDistrito() {
    const cuerpo = {
      Distrito: this.inputDistrito,
      CantonId: this.inputCantonId,
      Valoracion: this.inputValoracion
    };

    this.http.post<any>('http://localhost/distritos', cuerpo).subscribe({
      next: (res) => {
        this.Distritos.update((distritos) => [...distritos, res.resultado]);
        this.metodoGETDistritos();
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
          text: err.error?.error || 'No se pudo agregar el distrito.',
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

  public modificarDistrito() {
    const cuerpo = {
      Distrito: this.inputDistrito,
      CantonId: this.inputCantonId,
      Valoracion: this.inputValoracion
    };

    this.http.put<any>('http://localhost/distritos/' + this.inputDistritoId, cuerpo).subscribe({
      next: (res) => {
        this.metodoGETDistritos();
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
          text: err.error?.error || 'No se pudo modificar el distrito.',
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

  public borrarDistrito(Id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al distrito de forma permanente.',
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

        this.http.request<any>('delete', 'http://localhost/distritos/' + Id, { body: cuerpo }).subscribe({
          next: (res) => {
            this.Distritos.update((distritos) => distritos.filter((distrito) => distrito.DistritoId !== Id));
            this.filtrarDistritos();
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
              text: err.error?.error || 'No se pudo eliminar el distrito.',
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

  public filtrarDistritos() {
    const term = this.searchTerm.toLowerCase();
    this.distritosFiltrados = this.Distritos().filter((distrito) => {
      switch (this.filterField) {
        case 'Canton':
          return distrito.CantonId.toString().toLowerCase().includes(term);
        case 'Valoracion':
          return (distrito.Valoracion ?? '').toLowerCase().includes(term);
        default:
          return distrito.Distrito.toLowerCase().includes(term);
      }
    });
  }

  public resetInputs() {
    this.inputDistritoId = '';
    this.inputDistrito = '';
    this.inputCantonId = 0;
    this.inputValoracion = 'Bueno';
  }

  public openModal() {
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
    this.resetInputs();
  }

  public editDistrito(distrito: Distrito) {
    this.inputDistritoId = distrito.DistritoId?.toString() || '';
    this.inputDistrito = distrito.Distrito;
    this.inputCantonId = distrito.CantonId;
    this.inputValoracion = distrito.Valoracion ?? 'Bueno';
    this.openModal();
  }

  public trackByDistritoId(index: number, distrito: Distrito): string {
    return distrito.DistritoId?.toString() || '';
  }
}