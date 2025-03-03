import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Distrito } from '../model/distrito';

@Component({
  selector: 'app-distritos',
  imports: [],
  templateUrl: './distritos.component.html',
  styleUrl: './distritos.component.css'
})
export class DistritosComponent {
  // La propiedad que contiene el nombre del componente
  title = 'Distritos';
  subtitle = 'Distritos de la aplicación';

  public Distritos = signal<Distrito[]>([]);
  constructor(private http: HttpClient) {
    this.metodoGETDistritos();
  }

  public metodoGETDistritos() {
    let cuerpo = {};
    this.http.get('http://localhost/distritos', cuerpo).subscribe((Distritos) => {
      const arr = Distritos as Distrito[];
      arr.forEach((Distrito) => {
        this.agregarDistritoALaSenial(Distrito.Distrito, Distrito.CantonId, Distrito.DistritoId, Distrito.FechaDeCreacion, Distrito.ActualizadoEn);
      });
    });
  }

 public agregarDistrito(distrito: string, cantonId: string, valoracion: string) {
    if (!distrito || !cantonId || !valoracion) {
      alert('Todos los campos son obligatorios');
      return;
    }

    let cuerpo = {
      Distrito: distrito,
      CantonId: Number(cantonId), // Convertir a número
      Valoracion: valoracion
    };
    this.http.post('http://localhost/distritos', cuerpo).subscribe(() => {
      this.Distritos.update((Distritos) => [...Distritos, cuerpo]);
    }, (error) => {
      console.error('Error al agregar distrito:', error);
      alert(`Error al agregar distrito: ${error.message}`);
    });
  }

  public agregarDistritoALaSenial(Distrito: string, CantonId: number, DistritoId?: string, FechaDeCreacion?: string, ActualizadoEn?: string) {
    let nuevoDistrito = {
      DistritoId: DistritoId,
      Distrito: Distrito,
      CantonId: CantonId,
      FechaDeCreacion: FechaDeCreacion,
      ActualizadoEn: ActualizadoEn,
    };
    this.Distritos.update((Distritos) => [...Distritos, nuevoDistrito]);
  }

  public modificarDistrito(Id: any, event: Event) {
    let tag = event.target as HTMLInputElement;
    let cuerpo = {
      Distrito: tag.value,
      CantonId: 101, // Asumiendo que CantonId es 1, ajustar según sea necesario
      Valoracion: "Bueno" // Asumiendo un valor de ejemplo para Valoracion, ajustar según sea necesario
    };
    this.http.put('http://localhost/distritos/' + Id, cuerpo).subscribe(() => {
      this.Distritos.update((Distritos) => {
        return Distritos.map((Distrito) => {
          if (Distrito.DistritoId === Id) {
            return { ...Distrito, Distrito: tag.value, CantonId: cuerpo.CantonId, Valoracion: cuerpo.Valoracion };
          }
          return Distrito;
        });
      });
    });
  }

  public borrarDistrito(Id: any) {
    console.log(Id);
    this.http.delete('http://localhost/distritos/' + Id).subscribe(() => {
      this.Distritos.update((Distritos) => Distritos.filter((Distrito) => Distrito.DistritoId !== Id));
    });
  }
}