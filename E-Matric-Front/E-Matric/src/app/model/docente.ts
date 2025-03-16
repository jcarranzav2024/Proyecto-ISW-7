export interface Docente {
  DocenteId?: number;
  Identificacion: string;
  Nombre: string;
  Apellido1: string;
  Apellido2: string;
  Correo: string;
  Direccion: string;
  Telefono: string;
  CreadoEn?: string;
  ActualizadoEn?: string;
  Estado?: boolean;
}