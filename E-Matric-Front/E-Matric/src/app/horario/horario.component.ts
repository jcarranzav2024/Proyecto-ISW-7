import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../model/horario';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})
export class HorarioComponent {
  public title = 'Horarios';
  public Horarios = signal<Horario[]>([]);
  public horariosFiltrados: Horario[] = [];
  public searchTerm: string = '';
  public filterField: string = 'Dia';
  public isModalOpen: boolean = false;

  constructor(private http: HttpClient) {
    this.metodoGETHorarios();
  }

  public inputHorarioId: string = '';
  public inputNombre: string = '';
  public inputDia: string = '';
  public inputHoraInicio: string = '';
  public inputHoraFin: string = '';

  public metodoGETHorarios() {
    this.http.get('http://localhost/horarios', {}).subscribe((horariosResponse) => {
      const horarios = horariosResponse as Horario[];
      this.Horarios.set(horarios);
      this.filtrarHorarios();
    });
  }

  public agregarHorario() {
    if (!this.validarFormulario()) return;

    const cuerpo = {
      Nombre: this.inputNombre,
      Dia: this.inputDia,
      HoraInicio: this.inputHoraInicio,
      HoraFin: this.inputHoraFin
    };

    console.log(cuerpo);

    this.http.post<any>('http://localhost/horarios', cuerpo).subscribe({
      next: (res) => {
        this.Horarios.update((horarios) => [...horarios, res.resultado]);
        this.metodoGETHorarios();
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
          text: err.error?.error || 'No se pudo agregar el horario.',
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

  public modificarHorario() {
    if (!this.validarFormulario()) return;

    const cuerpo = {
      Nombre: this.inputNombre,
      Dia: this.inputDia,
      HoraInicio: this.inputHoraInicio,
      HoraFin: this.inputHoraFin,
      UsuarioId: 1
    };

    this.http.put<any>('http://localhost/horarios/' + this.inputHorarioId, cuerpo).subscribe({
      next: (res) => {
        this.metodoGETHorarios();
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
          text: err.error?.error || 'No se pudo modificar el horario.',
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

  public borrarHorario(Id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el horario de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      timer: 5000, // 5 segundos para que se cierre automáticamente
      timerProgressBar: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete<any>('http://localhost/horarios/' + Id).subscribe({
          next: (res) => {
            this.Horarios.update((horarios) => horarios.filter((horario) => horario.HorarioId !== Id));
            this.filtrarHorarios();
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
              text: err.error?.error || 'No se pudo eliminar el horario.',
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

  public filtrarHorarios() {
    const term = this.searchTerm.toLowerCase();
    this.horariosFiltrados = this.Horarios().filter((horario) => {
      switch (this.filterField) {
        case 'Nombre':
          return horario.Nombre.toLowerCase().includes(term);
        case 'Dia':
          return horario.Dia.toLowerCase().includes(term);
        case 'HoraInicio':
          return horario.HoraInicio.toLowerCase().includes(term);     
        case 'HoraFin':
          return horario.HoraFin.toLowerCase().includes(term);
        default:
          return horario.Dia.toLowerCase().includes(term);
      }
    });
  }

  public resetInputs() {
    this.inputHorarioId = '';
    this.inputDia = '';
    this.inputHoraInicio = '';
    this.inputHoraFin = '';
    this.inputNombre = '';
  }

  public openModal() {
    this.isModalOpen = true;
  }

  public closeModal() {
    this.resetInputs();
    this.isModalOpen = false;
  }

  public editHorario(horario: Horario) {
    this.inputHorarioId = horario.HorarioId?.toString() || '';
    this.inputNombre = horario.Nombre;
    this.inputDia = horario.Dia;
    this.inputHoraInicio = horario.HoraInicio;
    this.inputHoraFin = horario.HoraFin;
    this.isModalOpen = true;
  }

  public updateNombre() {
    this.inputNombre = `${this.inputDia} - ${this.inputHoraInicio} a ${this.inputHoraFin}`;
  }
  
    public trackByHorarioId(index: number, horario: Horario) {
      return horario.HorarioId;
    }

  public validarFormulario(): boolean {
    if (!this.inputDia || !this.inputHoraInicio || !this.inputHoraFin) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios.',
        icon: 'error',
        timer: 3000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        customClass: {
          popup: 'swal2-toast swal2-error'
        }
      });
      return false;
    }
    return true;
  }
}
