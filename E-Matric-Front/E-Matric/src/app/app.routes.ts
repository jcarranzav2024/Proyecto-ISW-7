import { Routes } from '@angular/router';

import { AuditoriaComponent } from './auditoria/auditoria.component';
import { CantonesComponent } from './cantones/cantones.component';
import { CursoComponent } from './curso/curso.component';
import { DistritosComponent } from './distritos/distritos.component';
import { DocenteComponent } from './docente/docente.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { HistoricoAcademicoComponent } from './historico-academico/historico-academico.component';
import { HorarioComponent } from './horario/horario.component';
import { MateriaComponent } from './materia/materia.component';
import { MatriculaComponent } from './matricula/matricula.component';
import { OfertaAcademicaComponent } from './oferta-academica/oferta-academica.component';
import { PeriodoAcademicoComponent } from './periodo-academico/periodo-academico.component';
import { PlanEstudioComponent } from './plan-estudio/plan-estudio.component';
import { ProvinciasComponent } from './provincias/provincias.component';
import { UsuarioComponent } from './usuario/usuario.component';



export const routes: Routes = [
    {
        path: 'auditoria',
        component: AuditoriaComponent
    },
    {
        path: 'cantones',
        component: CantonesComponent
    },
    {
        path: 'curso',
        component: CursoComponent
    },
    {
        path: 'distritos',
        component: DistritosComponent
    },
    {
        path: 'docente',
        component: DocenteComponent
    },
    {
        path: 'estudiante',
        component: EstudianteComponent  
    },
    {
        path: 'historico-academico',
        component: HistoricoAcademicoComponent
    },
    {
        path: 'horario',
        component: HorarioComponent
    },
    {
        path: 'materia',
        component: MateriaComponent
    },
    {
        path: 'matricula',
        component: MatriculaComponent
    },
    {
        path: 'oferta-academica',
        component: OfertaAcademicaComponent
    },
    {
        path: 'periodo-academico',
        component: PeriodoAcademicoComponent
    },
    {
        path: 'plan-estudio',
        component: PlanEstudioComponent
    },
    {
        path: 'provincias',
        component: ProvinciasComponent
    },
    {
        path: 'usuario',
        component: UsuarioComponent
    }
];
