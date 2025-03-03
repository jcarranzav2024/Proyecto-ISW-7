import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Docente } from '../model/docente';

@Component({
  selector: 'app-docente',
  imports: [],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent {
  // La propiedad que contiene el nombre del componente
  title = 'Docente';
  subtitle = 'Docentes de la aplicación';

  public Docentes = signal<Docente[]>([]);
  constructor(private http: HttpClient) {
    this.metodoGETDocentes();
  }

  public metodoGETDocentes() {
    let cuerpo = {};
    this.http.get('http://localhost/docentes', cuerpo).subscribe((Docentes) => {
      const arr = Docentes as Docente[];
      arr.forEach((Docente) => {
        this.agregarDocenteALaSenial(Docente.DocenteId, Docente.Identificacion, Docente.Nombre, Docente.Apellido1, Docente.Apellido2, Docente.Correo, Docente.Direccion, Docente.Telefono, Docente.CreadoEn, Docente.ActualizadoEn);
      });
    });
  }

  public agregarDocenteALaSenial(DocenteId: number = 0, Identificacion: string, Nombre: string, Apellido1: string, Apellido2: string, Correo: string, Direccion: string, Telefono: string, CreadoEn?: string, ActualizadoEn?: string) {
    let nuevoDocente = {
      DocenteId: DocenteId,
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
    this.Docentes.update((Docentes) => [...Docentes, nuevoDocente]);
  }

  
  public agregarDocente(identificacion: string, nombre: string, apellido1: string, apellido2: string, correo: string, direccion: string, telefono: string) {
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
    this.http.post('http://localhost/docentes', cuerpo).subscribe({
      next: () => {
        this.Docentes.update((Docentes) => [...Docentes, cuerpo]);
      },
      error: (error) => {
        console.error('Error al agregar el Docente:', error);
        alert(`Error al agregar el Docente: ${error.message}`);
      }
    });
  }


  public modificarDocente(Id: any, event: Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      [tag.name]: tag.value
    };
    this.http.put('http://localhost/docentes/' + Id, cuerpo).subscribe(() => {
      this.Docentes.update((Docentes) => {
        return Docentes.map((Docente) => {
          if (Docente.DocenteId === Id) {
            return { ...Docente, ...cuerpo };
          }
          return Docente;
        });
      });
    });
  }

  public borrarDocente(Id: any) {
    console.log(Id);
    this.http.delete('http://localhost/docentes/' + Id).subscribe(() => {
      this.Docentes.update((Docentes) => Docentes.filter((Docente) => Docente.DocenteId !== Id));
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
