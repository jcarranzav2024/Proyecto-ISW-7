import { Component, signal } from '@angular/core'; // Importa Component y signal de Angular core
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para hacer solicitudes HTTP
import { Curso } from '../model/curso'; // Importa el modelo Curso

@Component({
  selector: 'app-curso', // Define el selector del componente
  imports: [], // Importaciones adicionales (vacío en este caso)
  templateUrl: './curso.component.html', // Ruta al archivo de plantilla HTML
  styleUrl: './curso.component.css' // Ruta al archivo de estilos CSS
})
export class CursoComponent {
  // La propiedad que contiene el nombre del componente
  title = 'Curso'; // Título del componente
  subtitle = 'Cursos de la aplicación'; // Subtítulo del componente

  public Cursos = signal<Curso[]>([]); // Define una señal que contiene un array de objetos Curso
  constructor(private http: HttpClient) { // Constructor que inyecta el servicio HttpClient
    this.metodoGETCursos(); // Llama al método para obtener los cursos al inicializar el componente
  }


  public metodoGETCursos() {
    let cuerpo = {}; // Cuerpo de la solicitud GET (vacío en este caso)
    this.http.get('http://localhost/cursos', cuerpo).subscribe((Cursos) => { // Hace una solicitud GET para obtener los cursos
      const arr = Cursos as Curso[]; // Convierte la respuesta en un array de objetos Curso
      arr.forEach((Curso) => { // Itera sobre cada curso
        this.agregarCursoALaSenial(Curso.CursoId, Curso.MateriaId, Curso.DocenteId, Curso.Cupo, Curso.Aula, Curso.HorarioId , Curso.CreadoEn, Curso.ActualizadoEn); // Agrega cada curso a la señal
      });
      console.log(typeof(arr));
    });
  };

  public agregarCursoALaSenial( CursoId: number=0,MateriaId: string, DocenteId: string,Cupo: string, Aula: string,HorarioId: string, CreadoEn?: string, ActualizadoEn?: string
    ) {
    let nuevoCurso= {      // Asigna el ID del curso
      CursoId: CursoId , // Asigna el ID del curso (opcional)
      MateriaId: MateriaId, // Asigna el ID de la materia
      DocenteId: DocenteId, // Asigna el ID del docente 
      Cupo: Cupo, // Asigna el cupo del curso
      Aula: Aula,
      HorarioId, // Asigna el aula del curso
      CreadoEn: CreadoEn || '', // Asigna la fecha de creación (opcional)
      ActualizadoEn: ActualizadoEn || '', // Asigna la fecha de actualización (opcional)
     
    };
    this.Cursos.update((Cursos) => [...Cursos, nuevoCurso]); // Actualiza la señal para incluir el nuevo curso
  };

  public agregarCurso(MateriaId: string, DocenteId: string, Cupo: string, Aula: string, HorarioId: string) {
    if (!MateriaId || !DocenteId || !Cupo || !Aula || !HorarioId) {
      alert('Todos los campos son obligatorios');
      return;
    }

    let cuerpo = {
      MateriaId: MateriaId,
      DocenteId: DocenteId,
      Cupo: Cupo,
      Aula: Aula,
      HorarioId: HorarioId,
    };

    this.http.post('http://localhost/cursos', cuerpo).subscribe({
      next: () => {
        this.Cursos.update((Cursos) => [...Cursos, cuerpo]);
      },
      error: (error) => {
        console.error('Error al agregar el curso:', error);
        alert(`Error al agregar el curso: ${error.message}`);
      }
    });
  }
  

  public modificarCurso(Id: any, event: Event) {
    let tag = event.target as HTMLInputElement; // Obtiene el valor del input del evento
    let propiedad = tag.name; // Obtiene el nombre de la propiedad a modificar
    let valor = tag.value; // Obtiene el valor del input
  
    let cuerpo: any = {};
    cuerpo[propiedad] = valor; // Asigna el valor del input a la propiedad correspondiente
  
    this.http.put('http://localhost/cursos/' + Id, cuerpo).subscribe(() => { // Hace una solicitud PUT para modificar el curso
      this.Cursos.update((Cursos) => {
        return Cursos.map((Curso) => { // Itera sobre los cursos
          if (Number(Curso.CursoId) === Id) { // Si el ID del curso coincide
            return { ...Curso, ...cuerpo }; // Actualiza la propiedad correspondiente del curso
          }
          return Curso; // Retorna el curso sin cambios si no coincide el ID
        });
      });
    });
  };

  public borrarCurso(Id: any) {
    console.log(Id); // Imprime el ID del curso a eliminar
    this.http.delete('http://localhost/cursos/' + Id).subscribe(() => { // Hace una solicitud DELETE para eliminar el curso
      this.Cursos.update((Cursos) => Cursos.filter((Curso) => Curso.CursoId !== Id)); // Actualiza la señal para eliminar el curso correspondiente
    });
  };

  public nextField(event: Event, nextFieldId: string) {
    event.preventDefault();
    const nextField = document.getElementById(nextFieldId) as HTMLInputElement;
    if (nextField) {
      nextField.focus();
    } else {
      console.error(`El campo con id ${nextFieldId} no se encontró.`);
    }
  }
}
