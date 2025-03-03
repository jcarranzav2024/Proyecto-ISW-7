import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Canton } from '../model/canton';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cantones',
  imports: [],
  templateUrl: './cantones.component.html',
  styleUrl: './cantones.component.css'
})
export class CantonesComponent {
 // La propiedad que contiene el nombre del componente
 title = 'Cantones';
 subtitle = 'Cantones de la aplicación';

 public Cantones = signal<Canton[]>([]);
 constructor(private http: HttpClient) {
  this.metodoGETCantones();
};

public metodoGETCantones() {
  let cuerpo = {};
  this.http.get('http://localhost/cantones', cuerpo).subscribe((Cantones) => {
    const arr = Cantones as Canton[];
    arr.forEach((Canton) => {
      this.agregarCantonALaSenial(Canton.Canton,Canton.ProvinciaId, Canton.CantonId, Canton.FechaDeCreacion, Canton.ActualizadoEn);
    });
  });
};

public agregarCanton(event: Event) {
  let tag = event.target as HTMLInputElement;
  let cuerpo = {
    Canton: tag.value,
    ProvinciaId: 1,
  };
  this.http.post('http://localhost/cantones', cuerpo).subscribe(() => {
    this.Cantones.update((Cantones) => [...Cantones, cuerpo]);
  });
};

public agregarCantonALaSenial(Canton: string, ProvinciaId: number, CantonId?: string, FechaDeCreacion?: string
  , ActualizadoEn?: string) {
  let nuevoCanton = {
    CantonId: CantonId,
    Canton: Canton,
    ProvinciaId: ProvinciaId,
    FechaDeCreacion: FechaDeCreacion,
    ActualizadoEn: ActualizadoEn,
  };
  this.Cantones.update((Cantones) => [...Cantones, nuevoCanton]);
};

public modificarCanton(Id: any, event: Event) {
  let tag = event.target as HTMLInputElement;
  let cuerpo = {
    Canton: tag.value,
  };
  this.http.put('http://localhost/cantones/' + Id, cuerpo).subscribe(() => {
    this.Cantones.update((Cantones) => {
      return Cantones.map((Canton) => {
        if (Canton.CantonId === Id) {
          return { ...Canton, Canton: tag.value };
        }
        return Canton;
      });
    });
  });
};

public borrarCanton(Id: any) {
  console.log(Id);
  this.http.delete('http://localhost/cantones/' + Id).subscribe(() => {
    this.Cantones.update((Cantones) => Cantones.filter((Canton) => Canton.CantonId !== Id));
  });
};


}
