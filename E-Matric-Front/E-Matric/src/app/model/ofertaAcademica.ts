import { Curso } from './curso';
import { PeriodoAcademico } from './periodoAcademico';
import { CursoOfertaAcademica } from './cursoOfertaAcademica';
import { Carrera } from './carrera';

export interface OfertaAcademica {
    OfertaAcademicaId?: number;
    PeriodoAcademicoId: number;
    PeriodoAcademico?: PeriodoAcademico;
    CarreraId:number; 
    Carrera?: Carrera;
    Cursos?: Curso[]; // Relación con Curso a través de CursoOfertaAcademica
    CursoOfertaAcademica?: CursoOfertaAcademica[]; // Relación con la tabla intermedia
    CreadoEn?: Date; // Cambiado a Date para reflejar DateTime
    ActualizadoEn?: Date; // Cambiado a Date para reflejar DateTime
    Estado?: boolean;
}








