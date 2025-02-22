import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  standalone: true,  // 🚀 Necesario para Standalone Components
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
   // La propiedad que contiene el nombre del componente
   title = 'Usuario';
   subtitle = 'Usuarios de la aplicación';
}

