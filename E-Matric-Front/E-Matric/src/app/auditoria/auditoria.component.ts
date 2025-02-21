import { Component } from '@angular/core';

@Component({
  selector: 'app-auditoria',
  standalone: true,
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.css'
})
export class AuditoriaComponent {
   // La propiedad que contiene el nombre del componente
   title = 'Auditoría';
   subtitle = 'Auditoría de la aplicación';
}
