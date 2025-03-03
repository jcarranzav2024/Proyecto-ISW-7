import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../model/estudiante';

@Component({
  selector: 'app-estudiante',
  imports: [],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent {
  // La propiedad que contiene el nombre del componente
  title = 'Estudiante';
  subtitle = 'Estudiantes de la aplicación';

  public Estudiantes = signal<Estudiante[]>([]);
  constructor(private http: HttpClient) {
    this.metodoGETEstudiantes();
  }

  public metodoGETEstudiantes() {
    let cuerpo = {};
    this.http.get('http://localhost/estudiantes', cuerpo).subscribe((Estudiantes) => {
      const arr = Estudiantes as Estudiante[];
      arr.forEach((Estudiante) => {
        this.agregarEstudianteALaSenial(Estudiante.EstudianteId, Estudiante.Identificacion, Estudiante.Nombre, Estudiante.Apellido1, Estudiante.Apellido2, Estudiante.Correo, Estudiante.Direccion, Estudiante.Telefono, Estudiante.CreadoEn, Estudiante.ActualizadoEn);
      });
    });
  }

  public agregarEstudianteALaSenial(EstudianteId: number = 0, Identificacion: string, Nombre: string, Apellido1: string, Apellido2: string, Correo: string, Direccion: string, Telefono: string, CreadoEn?: string, ActualizadoEn?: string) {
    let nuevoEstudiante = {
      EstudianteId: EstudianteId,
      Identificacion: Identificacion,
      Nombre: Nombre,
      Apellido1: Apellido1,
      Apellido2: Apellido2,
      Correo: Correo,
      Direccion: Direccion,
      Telefono: Telefono,
      CreadoEn: CreadoEn,
      ActualizadoEn: ActualizadoEn
    };
    this.Estudiantes.update((Estudiantes) => [...Estudiantes, nuevoEstudiante]);
  }

  public agregarEstudiante(identificacion: string, nombre: string, apellido1: string, apellido2: string, correo: string, direccion: string, telefono: string) {
    if (!identificacion || !nombre || !apellido1 || !apellido2 || !correo || !direccion || !telefono) {
      alert('Todos los campos son obligatorios');
      return;
    }

    let cuerpo = {
      Identificacion: identificacion,
      Nombre: nombre,
      Apellido1: apellido1,
      Apellido2: apellido2,
      Correo: correo,
      Direccion: direccion,
      Telefono: telefono
    };
    this.http.post('http://localhost/estudiantes', cuerpo).subscribe({
      next: () => {
        this.Estudiantes.update((Estudiantes) => [...Estudiantes, cuerpo]);
      },
      error: (error) => {
        console.error('Error al agregar el Estudiante:', error);
        alert(`Error al agregar el Estudiante: ${error.message}`);
      }
    });
  }

  public modificarEstudiante(Id: any, event: Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      [tag.name]: tag.value
    };
    this.http.put('http://localhost/estudiantes/' + Id, cuerpo).subscribe(() => {
      this.Estudiantes.update((Estudiantes) => {
        return Estudiantes.map((Estudiante) => {
          if (Estudiante.EstudianteId === Id) {
            return { ...Estudiante, ...cuerpo };
          }
          return Estudiante;
        });
      });
    });
  }

  public borrarEstudiante(Id: any) {
    console.log(Id);
    this.http.delete('http://localhost/estudiantes/' + Id).subscribe(() => {
      this.Estudiantes.update((Estudiantes) => Estudiantes.filter((Estudiante) => Estudiante.EstudianteId !== Id));
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
