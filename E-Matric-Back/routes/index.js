

const routerMaterias = require('./materias.js');
const routerPlanEstudios = require('./planestudios.js');
const routerCursos = require('./cursos.js');
const routerHorarios = require('./horarios.js');
const routerPeriodosAcademicos = require('./periodosacademicos.js');
const routerOfertasAcademicas = require('./ofertasacademicas.js');
const routerMatriculas = require('./matriculas.js');
const routerHistoricosAcademicos = require('./historicosacademicos.js');
const routerAuditorias = require('./auditorias.js');
const routerUsuarios = require('./usuarios.js');
const routerEstudiantes = require('./estudiantes.js');
const routerDocentes = require('./docentes.js');
const routerProvincias = require('./provincias.js');
const routerCantones = require('./cantones.js');
const routerDistritos = require('./distritos.js');
const routerCarreras = require('./carreras.js');

function routerAPI(app) {

 
  app.use('/materias', routerMaterias);
  app.use('/planestudios', routerPlanEstudios);
  app.use('/cursos', routerCursos);
  app.use('/horarios', routerHorarios);
  app.use('/periodosacademicos', routerPeriodosAcademicos);
  app.use('/ofertasacademicas', routerOfertasAcademicas);
  app.use('/matriculas', routerMatriculas);
  app.use('/historicosacademicos', routerHistoricosAcademicos);
  app.use('/auditorias', routerAuditorias);
  app.use('/usuarios', routerUsuarios);
  app.use('/estudiantes', routerEstudiantes);
  app.use('/docentes', routerDocentes);
  app.use('/provincias', routerProvincias);
  app.use('/cantones', routerCantones);
  app.use('/distritos', routerDistritos);
  app.use('/carreras', routerCarreras);
}

module.exports = routerAPI;