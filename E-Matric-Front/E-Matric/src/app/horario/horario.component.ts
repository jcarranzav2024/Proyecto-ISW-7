import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Horario } from '../model/horario';

@Component({
  selector: 'app-horario',
  imports: [],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})
export class HorarioComponent {
  // La propiedad que contiene el nombre del componente
  title = 'Horario';
  subtitle = 'Horarios de la aplicación';

  public Horarios = signal<Horario[]>([]);
  constructor(private http: HttpClient) {
    this.metodoGETHorarios();
  }

  public metodoGETHorarios() {
    let cuerpo = {};
    this.http.get('http://localhost/horarios', cuerpo).subscribe((Horarios) => {
      const arr = Horarios as Horario[];
      arr.forEach((Horario) => {
        this.agregarHorarioALaSenial(Horario.HorarioId, Horario.Dia, Horario.HoraInicio, Horario.HoraFin, Horario.CreadoEn);
      });
    });
  }

  public agregarHorarioALaSenial(HorarioId: number = 0, Dia: string, HoraInicio: string, HoraFin: string, CreadoEn?: string) {
    let nuevoHorario = {
      HorarioId: HorarioId,
      Dia: Dia,
      HoraInicio: HoraInicio,
      HoraFin: HoraFin,
      CreadoEn: CreadoEn,      
    };
    this.Horarios.update((Horarios) => [...Horarios, nuevoHorario]);
  }

  public agregarHorario(dia: string, horaInicio: string, horaFin: string) {
    if (!dia || !horaInicio || !horaFin) {
      alert('Todos los campos son obligatorios');
      return;
    }

    let cuerpo = {
      Dia: dia,
      HoraInicio: horaInicio,
      HoraFin: horaFin
    };
    this.http.post('http://localhost/horarios', cuerpo).subscribe({
      next: () => {
        this.Horarios.update((Horarios) => [...Horarios, cuerpo]);
      },
      error: (error) => {
        console.error('Error al agregar el Horario:', error);
        alert(`Error al agregar el Horario: ${error.message}`);
      }
    });
  }

  public modificarHorario(Id: any, event: Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      [tag.name]: tag.value
    };
    this.http.put('http://localhost/horarios/' + Id, cuerpo).subscribe(() => {
      this.Horarios.update((Horarios) => {
        return Horarios.map((Horario) => {
          if (Horario.HorarioId === Id) {
            return { ...Horario, ...cuerpo };
          }
          return Horario;
        });
      });
    });
  }

  public borrarHorario(Id: any) {
    console.log(Id);
    this.http.delete('http://localhost/horarios/' + Id).subscribe(() => {
      this.Horarios.update((Horarios) => Horarios.filter((Horario) => Horario.HorarioId !== Id));
    });
  }

  public nextField(event: Event, nextFieldId: string) {
    event.preventDefault();
    const nextField = document.getElementById(nextFieldId) as HTMLInputElement;
    if (nextField) {
      nextField.focus();
    } else {
      console.error(`El campo con id ${nextFieldId} no se encontró.`);
    }
  }
}
