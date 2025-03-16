export interface OfertaAcademica {
    OfertaAcademicaId?: number;
    PeriodoAcademicoId: number;
    PeriodoAcademico?: PeriodoAcademico; // Relación con PeriodoAcademico
    Cursos?: Curso[]; // Relación con Curso
    CreadoEn?: Date; // Cambiado a Date para reflejar DateTime
    ActualizadoEn?: Date; // Cambiado a Date para reflejar DateTime
    Estado?: boolean;
}

export interface PeriodoAcademico {
    PeriodoAcademicoId: number;
    Nombre: string;
}

export interface Curso {
    CursoId: number;
    Nombre: string;
}