export interface Usuario {
    UsuarioId?: number;
    Identificacion: string;
    Login: string;
    Contrasena: string;
    Email: string;
    Rol: string;
    CreadoEn?: string;
    ActualizadoEn?: string;
    Estado?: boolean;
}