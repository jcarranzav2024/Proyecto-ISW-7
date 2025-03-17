import { Component, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OfertaAcademica } from '../model/ofertaAcademica';
import{ Curso } from '../model/curso';
import{ PeriodoAcademico } from '../model/periodoAcademico';
import { Materia } from '../model/materia';
import { Docente } from '../model/docente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oferta-academica',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './oferta-academica.component.html',
  styleUrls: ['./oferta-academica.component.css']
})
export class OfertaAcademicaComponent {
  public title = 'Oferta Académica';
  public Ofertas = signal<OfertaAcademica[]>([]);
  public ofertasFiltradas: OfertaAcademica[] = [];
  public periodosAcademicos: PeriodoAcademico[] = [];
  public materias: Materia[] = [];
  public cursos: Curso[] = [];
  public docentes: Docente[] = [];
  public cursosDisponibles: Curso[] = [];
  public cursosAsignados: Curso[] = [];
  public searchTerm: string = '';
  public filterField: string = 'PeriodoAcademicoId';
  public isModalOpen: boolean = false;
  public isDetallesModalOpen = false;
  public ofertaSeleccionada: any = null;

  constructor(private http: HttpClient) {
    this.metodoGETOfertas();
    this.metodoGETPeriodosAcademicos();
    this.metodoGETCursos();
    this.metodoGetMaterias();
    this.metodoGetDocentes();

  }

  public inputOfertaId: string = '';
  public inputPeriodoAcademicoId: number | null = null;

  public metodoGETOfertas() {
    this.http.get('http://localhost/ofertasacademicas', {}).subscribe((ofertasResponse) => {
      const ofertas = ofertasResponse as OfertaAcademica[];
      this.Ofertas.set(ofertas);
      this.filtrarOfertas();
      console.log(ofertas);
    });
  }

  public metodoGetDocentes() {
    this.http.get('http://localhost/docentes', {}).subscribe((docentesResponse) => {
      this.docentes = docentesResponse as Docente[];
    });
  }

  getNombreDocente(docenteId: string): string {
    const docente = this.docentes.find(d => Number(d.DocenteId) === Number(docenteId)); 
    return docente ? docente.Nombre+" "+docente.Apellido1 : 'Desconocido';
  }

  public metodoGetMaterias() {
    this.http.get('http://localhost/materias', {}).subscribe((materiasResponse) => {
      this.materias = materiasResponse as Materia[];
    });
  }

  getNombreMateria(materiaId: string): string {
    const materia = this.materias.find(m => Number(m.MateriaId) === Number(materiaId)); 
    return materia ? materia.Nombre : 'Desconocido';
  }

  public metodoGETPeriodosAcademicos() {
    this.http.get('http://localhost/periodosacademicos', {}).subscribe((periodosResponse) => {
      this.periodosAcademicos = periodosResponse as PeriodoAcademico[];
    });
  }

  getNombrePeriodoAcademico(periodoId: number): string {
    const periodo = this.periodosAcademicos.find(p => Number(p.PeriodoAcademicoId) === periodoId);
    return periodo ? periodo.Nombre : 'Desconocido';
  }

  public metodoGETCursos() {
    this.http.get('http://localhost/cursos', {}).subscribe((cursosResponse) => {
      this.cursos = cursosResponse as Curso[];
      this.cursosDisponibles = [...this.cursos];
    });
  }

  public agregarOferta() {
    if (!this.validarFormulario()) return;

    const cuerpo = {
      PeriodoAcademicoId: this.inputPeriodoAcademicoId,
      Cursos: this.cursosAsignados.map(curso => curso.CursoId),
      UsuarioId: 1
    };

    this.http.post<any>('http://localhost/ofertasacademicas', cuerpo).subscribe({
      next: (res) => {
        this.Ofertas.update((ofertas) => [...ofertas, res.resultado]);
        this.metodoGETOfertas();
        this.closeModal();
        Swal.fire({
          title: 'Éxito',
          text: res.message,
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          customClass: {
            popup: 'swal2-toast swal2-success'
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        const errorMessage = err.error?.errores?.length > 0
          ? err.error.errores.join(', ')
          : 'No se pudo agregar la oferta académica.';
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          customClass: {
            popup: 'swal2-toast swal2-error'
          }
        });
      }
    });
  }

  public modificarOferta() {
    if (!this.validarFormulario()) return;

    const cuerpo = {
      PeriodoAcademicoId: this.inputPeriodoAcademicoId,
      Cursos: this.cursosAsignados.map(curso => curso.CursoId),
      UsuarioId: 1
    };

    this.http.put<any>('http://localhost/ofertasacademicas/' + this.inputOfertaId, cuerpo).subscribe({
      next: (res) => {
        this.metodoGETOfertas();
        this.closeModal();
        Swal.fire({
          title: 'Éxito',
          text: res.message,
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          customClass: {
            popup: 'swal2-toast swal2-success'
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        const errorMessage = err.error?.errores?.length > 0
          ? err.error.errores.join(', ')
          : 'No se pudo modificar la oferta académica.';
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          customClass: {
            popup: 'swal2-toast swal2-error'
          }
        });
      }
    });
  }

  public desactivarOferta(id: any, estado: boolean) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción ${estado ? 'activará' : 'desactivará'} la oferta académica.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${estado ? 'activar' : 'desactivar'}`,
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      timer: 5000,
      timerProgressBar: true
    }).then((result) => {
      if (result.isConfirmed) {
        const cuerpo = {
          Estado: estado,
          UsuarioId: 1
        };

        this.http.put<any>('http://localhost/ofertasacademicas/' + id, cuerpo).subscribe({
          next: (res) => {
            this.metodoGETOfertas();
            Swal.fire({
              title: 'Éxito',
              text: res.message,
              icon: 'success',
              timer: 3000,
              timerProgressBar: true,
              toast: true,
              position: 'top-end',
              customClass: {
                popup: 'swal2-toast swal2-success'
              }
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: err.error?.error || 'No se pudo modificar el estado de la oferta académica.',
              icon: 'error',
              timer: 3000,
              timerProgressBar: true,
              toast: true,
              position: 'top-end',
              customClass: {
                popup: 'swal2-toast swal2-error'
              }
            });
          }
        });
      }
    });
  }

  public filtrarOfertas() {
    const term = this.searchTerm.toLowerCase();

    this.ofertasFiltradas = this.Ofertas().filter(oferta => {
      const campo = (oferta as any)[this.filterField]?.toString().toLowerCase() || '';
      return term === '' || campo.includes(term);
    });
  }

  public resetInputs() {
    this.inputOfertaId = '';
    this.inputPeriodoAcademicoId = null;
    this.cursosAsignados = [];
    this.cursosDisponibles = [...this.cursos];
  }

  public openModal() {
    this.resetInputs();
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
    this.resetInputs();
  }

  public editOferta(oferta: OfertaAcademica) {
    this.inputOfertaId = oferta.OfertaAcademicaId?.toString() || '';
    this.inputPeriodoAcademicoId = oferta.PeriodoAcademicoId;

    // Asignar los cursos asignados y disponibles
    this.cursosAsignados = (oferta.CursoOfertaAcademica ?? []).map((co: any) => co.Curso);
    this.cursosDisponibles = this.cursos.filter(curso => !this.cursosAsignados.some(asignado => asignado.CursoId === curso.CursoId));

    this.isModalOpen = true;
  }

  public trackByOfertaId(index: number, oferta: OfertaAcademica) {
    return oferta.OfertaAcademicaId;
  }

  public agregarCurso(curso: Curso) {
    this.cursosAsignados.push(curso);
    this.cursosDisponibles = this.cursosDisponibles.filter(c => c.CursoId !== curso.CursoId);
  }

  public removerCurso(curso: Curso) {
    this.cursosDisponibles.push(curso);
    this.cursosAsignados = this.cursosAsignados.filter(c => c.CursoId !== curso.CursoId);
  }

  private validarFormulario(): boolean {
    const errores: string[] = [];

    // Validación de Periodo Académico
    if (!this.inputPeriodoAcademicoId) {
      errores.push('El Periodo Académico es obligatorio.');
    }

    // Validación de Cursos
    if (this.cursosAsignados.length === 0) {
      errores.push('Debe seleccionar al menos un curso.');
    }

    // Mostrar errores si existen
    if (errores.length > 0) {
      Swal.fire({
        title: 'Campos inválidos',
        html: errores.map(e => `<div>${e}</div>`).join(''),
        icon: 'warning',
        timer: 4000,
        timerProgressBar: true,
        toast: false,
        position: 'center',
        customClass: {
          popup: 'swal2-toast swal2-warning'
        }
      });
      return false;
    }

    return true;
  }

  mostrarDetalles(oferta: any) {
    this.ofertaSeleccionada = {
      ...oferta,
      Cursos: oferta.CursoOfertaAcademica.map((co: any) => co.Curso)
    };
    this.isDetallesModalOpen = true;
  }

  closeDetallesModal() {
    this.isDetallesModalOpen = false;
    this.ofertaSeleccionada = null;
  }
}
