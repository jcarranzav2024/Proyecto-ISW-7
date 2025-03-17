
import { Curso } from './curso';
import { OfertaAcademica } from './ofertaAcademica';

export interface CursoOfertaAcademica {
    CursoId: number;
    OfertaAcademicaId: number;
    Curso?: Curso; // Relación con Curso
    OfertaAcademica?: OfertaAcademica; // Relación con OfertaAcademica
}