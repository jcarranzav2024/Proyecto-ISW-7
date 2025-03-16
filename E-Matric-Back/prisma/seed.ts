// import { faker } from '@faker-js/faker'; 
import { PrismaClient, TipoMatricula } from "@prisma/client";


import { fakerES_MX } from "@faker-js/faker";


const prisma = new PrismaClient({ log: ["query"] })

// Creación de datos de prueba para la base de datos de Prisma 

// ************************************************************** Direcciones ***********************************************************

async function main() {
  // Crear Provincias
  await prisma.provincias.createMany({
    data: [
      { ProvinciaId: 1, Provincia: 'San José' },
      { ProvinciaId: 2, Provincia: 'Alajuela' },
      { ProvinciaId: 3, Provincia: 'Cartago' },
      { ProvinciaId: 4, Provincia: 'Heredia' },
      { ProvinciaId: 5, Provincia: 'Guanacaste' },
      { ProvinciaId: 6, Provincia: 'Puntarenas' },
      { ProvinciaId: 7, Provincia: 'Limón' },
    ],
  })

  // Crear Cantones para cada provincia
  const cantonesData = [
    { CantonId: 101, ProvinciaId: 1, Canton: 'San José' },
    { CantonId: 102, ProvinciaId: 1, Canton: 'Escazú' },
    { CantonId: 103, ProvinciaId: 1, Canton: 'Desamparados' },
    { CantonId: 104, ProvinciaId: 1, Canton: 'Puriscal' },
    { CantonId: 105, ProvinciaId: 1, Canton: 'Tarrazú' },
    { CantonId: 106, ProvinciaId: 1, Canton: 'Aserrí' },
    { CantonId: 107, ProvinciaId: 1, Canton: 'Mora' },
    { CantonId: 108, ProvinciaId: 1, Canton: 'Goicoechea' },
    { CantonId: 109, ProvinciaId: 1, Canton: 'Santa Ana' },
    { CantonId: 110, ProvinciaId: 1, Canton: 'Alajuelita' },
    { CantonId: 111, ProvinciaId: 1, Canton: 'Vázquez de Coronado' },
    { CantonId: 112, ProvinciaId: 1, Canton: 'Acosta' },
    { CantonId: 113, ProvinciaId: 1, Canton: 'Tibás' },
    { CantonId: 114, ProvinciaId: 1, Canton: 'Moravia' },
    { CantonId: 115, ProvinciaId: 1, Canton: 'Montes de Oca' },
    { CantonId: 116, ProvinciaId: 1, Canton: 'Turrubares' },
    { CantonId: 117, ProvinciaId: 1, Canton: 'Dota' },
    { CantonId: 118, ProvinciaId: 1, Canton: 'Curridabat' },
    { CantonId: 119, ProvinciaId: 1, Canton: 'Pérez Zeledón' },
    { CantonId: 120, ProvinciaId: 1, Canton: 'León Cortés Castro' },
    { CantonId: 201, ProvinciaId: 2, Canton: 'Alajuela' },
    { CantonId: 202, ProvinciaId: 2, Canton: 'San Ramón' },
    { CantonId: 203, ProvinciaId: 2, Canton: 'Grecia' },
    { CantonId: 204, ProvinciaId: 2, Canton: 'San Mateo' },
    { CantonId: 205, ProvinciaId: 2, Canton: 'Atenas' },
    { CantonId: 206, ProvinciaId: 2, Canton: 'Naranjo' },
    { CantonId: 207, ProvinciaId: 2, Canton: 'Palmares' },
    { CantonId: 208, ProvinciaId: 2, Canton: 'Poás' },
    { CantonId: 209, ProvinciaId: 2, Canton: 'Orotina' },
    { CantonId: 210, ProvinciaId: 2, Canton: 'San Carlos' },
    { CantonId: 211, ProvinciaId: 2, Canton: 'Zarcero' },
    { CantonId: 212, ProvinciaId: 2, Canton: 'Sarchí' },
    { CantonId: 213, ProvinciaId: 2, Canton: 'Upala' },
    { CantonId: 214, ProvinciaId: 2, Canton: 'Los Chiles' },
    { CantonId: 215, ProvinciaId: 2, Canton: 'Guatuso' },
    { CantonId: 216, ProvinciaId: 2, Canton: 'Río Cuarto' },
    { CantonId: 301, ProvinciaId: 3, Canton: 'Cartago' },
    { CantonId: 302, ProvinciaId: 3, Canton: 'Paraíso' },
    { CantonId: 303, ProvinciaId: 3, Canton: 'La Unión' },
    { CantonId: 304, ProvinciaId: 3, Canton: 'Jiménez' },
    { CantonId: 305, ProvinciaId: 3, Canton: 'Turrialba' },
    { CantonId: 306, ProvinciaId: 3, Canton: 'Alvarado' },
    { CantonId: 307, ProvinciaId: 3, Canton: 'Oreamuno' },
    { CantonId: 308, ProvinciaId: 3, Canton: 'El Guarco' },
    { CantonId: 401, ProvinciaId: 4, Canton: 'Heredia' },
    { CantonId: 402, ProvinciaId: 4, Canton: 'Barva' },
    { CantonId: 403, ProvinciaId: 4, Canton: 'Santo Domingo' },
    { CantonId: 404, ProvinciaId: 4, Canton: 'Santa Bárbara' },
    { CantonId: 405, ProvinciaId: 4, Canton: 'San Rafael' },
    { CantonId: 406, ProvinciaId: 4, Canton: 'San Isidro' },
    { CantonId: 407, ProvinciaId: 4, Canton: 'Belén' },
    { CantonId: 408, ProvinciaId: 4, Canton: 'Flores' },
    { CantonId: 409, ProvinciaId: 4, Canton: 'San Pablo' },
    { CantonId: 410, ProvinciaId: 4, Canton: 'Sarapiquí' },
    { CantonId: 501, ProvinciaId: 5, Canton: 'Liberia' },
    { CantonId: 502, ProvinciaId: 5, Canton: 'Nicoya' },
    { CantonId: 503, ProvinciaId: 5, Canton: 'Santa Cruz' },
    { CantonId: 504, ProvinciaId: 5, Canton: 'Bagaces' },
    { CantonId: 505, ProvinciaId: 5, Canton: 'Carrillo' },
    { CantonId: 506, ProvinciaId: 5, Canton: 'Cañas' },
    { CantonId: 507, ProvinciaId: 5, Canton: 'Abangares' },
    { CantonId: 508, ProvinciaId: 5, Canton: 'Tilarán' },
    { CantonId: 509, ProvinciaId: 5, Canton: 'Nandayure' },
    { CantonId: 510, ProvinciaId: 5, Canton: 'La Cruz' },
    { CantonId: 511, ProvinciaId: 5, Canton: 'Hojancha' },
    { CantonId: 601, ProvinciaId: 6, Canton: 'Puntarenas' },
    { CantonId: 602, ProvinciaId: 6, Canton: 'Esparza' },
    { CantonId: 603, ProvinciaId: 6, Canton: 'Buenos Aires' },
    { CantonId: 604, ProvinciaId: 6, Canton: 'Montes de Oro' },
    { CantonId: 605, ProvinciaId: 6, Canton: 'Osa' },
    { CantonId: 606, ProvinciaId: 6, Canton: 'Quepos' },
    { CantonId: 607, ProvinciaId: 6, Canton: 'Golfito' },
    { CantonId: 608, ProvinciaId: 6, Canton: 'Coto Brus' },
    { CantonId: 609, ProvinciaId: 6, Canton: 'Parrita' },
    { CantonId: 610, ProvinciaId: 6, Canton: 'Corredores' },
    { CantonId: 611, ProvinciaId: 6, Canton: 'Garabito' },
    { CantonId: 612, ProvinciaId: 6, Canton: 'Monteverde' },
    { CantonId: 701, ProvinciaId: 7, Canton: 'Limón' },
    { CantonId: 702, ProvinciaId: 7, Canton: 'Pococí' },
    { CantonId: 703, ProvinciaId: 7, Canton: 'Siquirres' },
    { CantonId: 704, ProvinciaId: 7, Canton: 'Talamanca' },
    { CantonId: 705, ProvinciaId: 7, Canton: 'Matina' },
    { CantonId: 706, ProvinciaId: 7, Canton: 'Guácimo' },

  ];
  // Crear Cantones
  await prisma.cantones.createMany({
    data: cantonesData,
  });



  // Crear Distritos para cada cantón
  const distritosData = [
    { DistritoId: 10101, CantonId: 101, Distrito: 'Carmen' },
    { DistritoId: 10102, CantonId: 101, Distrito: 'Merced' },
    { DistritoId: 10103, CantonId: 101, Distrito: 'Hospital' },
    { DistritoId: 10104, CantonId: 101, Distrito: 'Catedral' },
    { DistritoId: 10105, CantonId: 101, Distrito: 'Zapote' },
    { DistritoId: 10106, CantonId: 101, Distrito: 'San Francisco de Dos Ríos' },
    { DistritoId: 10107, CantonId: 101, Distrito: 'Uruca' },
    { DistritoId: 10108, CantonId: 101, Distrito: 'Mata Redonda' },
    { DistritoId: 10109, CantonId: 101, Distrito: 'Pavas' },
    { DistritoId: 10110, CantonId: 101, Distrito: 'Hatillo' },
    { DistritoId: 10111, CantonId: 101, Distrito: 'San Sebastián' },
    { DistritoId: 10201, CantonId: 102, Distrito: 'Escazú' },
    { DistritoId: 10202, CantonId: 102, Distrito: 'San Antonio' },
    { DistritoId: 10203, CantonId: 102, Distrito: 'San Rafael' },
    { DistritoId: 10301, CantonId: 103, Distrito: 'Desamparados' },
    { DistritoId: 10302, CantonId: 103, Distrito: 'San Miguel' },
    { DistritoId: 10303, CantonId: 103, Distrito: 'San Juan de Dios' },
    { DistritoId: 10304, CantonId: 103, Distrito: 'San Rafael Arriba' },
    { DistritoId: 10305, CantonId: 103, Distrito: 'San Antonio' },
    { DistritoId: 10306, CantonId: 103, Distrito: 'Frailes' },
    { DistritoId: 10307, CantonId: 103, Distrito: 'Patarra' },
    { DistritoId: 10308, CantonId: 103, Distrito: 'San Cristobal' },
    { DistritoId: 10309, CantonId: 103, Distrito: 'Rosario' },
    { DistritoId: 10310, CantonId: 103, Distrito: 'Damas' },
    { DistritoId: 10311, CantonId: 103, Distrito: 'San Rafael Abajo' },
    { DistritoId: 10312, CantonId: 103, Distrito: 'Gravilias' },
    { DistritoId: 10313, CantonId: 103, Distrito: 'Los Guido' },
    { DistritoId: 10401, CantonId: 104, Distrito: 'Santiago' },
    { DistritoId: 10402, CantonId: 104, Distrito: 'Mercedes Sur' },
    { DistritoId: 10403, CantonId: 104, Distrito: 'Barbacoas' },
    { DistritoId: 10404, CantonId: 104, Distrito: 'Grifo Alto' },
    { DistritoId: 10405, CantonId: 104, Distrito: 'San Rafael' },
    { DistritoId: 10406, CantonId: 104, Distrito: 'Candelarita' },
    { DistritoId: 10407, CantonId: 104, Distrito: 'Desamparaditos' },
    { DistritoId: 10408, CantonId: 104, Distrito: 'San Antonio' },
    { DistritoId: 10409, CantonId: 104, Distrito: 'Chires' },
    { DistritoId: 10501, CantonId: 105, Distrito: 'San Marcos' },
    { DistritoId: 10502, CantonId: 105, Distrito: 'San Lorenzo' },
    { DistritoId: 10503, CantonId: 105, Distrito: 'San Carlos' },
    { DistritoId: 10601, CantonId: 106, Distrito: 'Aserrí' },
    { DistritoId: 10602, CantonId: 106, Distrito: 'Tarbaca' },
    { DistritoId: 10603, CantonId: 106, Distrito: 'Vuelta de Jorco' },
    { DistritoId: 10604, CantonId: 106, Distrito: 'San Gabriel' },
    { DistritoId: 10605, CantonId: 106, Distrito: 'Legua' },
    { DistritoId: 10606, CantonId: 106, Distrito: 'Monterrey' },
    { DistritoId: 10607, CantonId: 106, Distrito: 'Salitrillos' },
    { DistritoId: 10701, CantonId: 107, Distrito: 'Colón' },
    { DistritoId: 10702, CantonId: 107, Distrito: 'Guayabo' },
    { DistritoId: 10703, CantonId: 107, Distrito: 'Tabarcia' },
    { DistritoId: 10704, CantonId: 107, Distrito: 'Piedras Negras' },
    { DistritoId: 10705, CantonId: 107, Distrito: 'Picagres' },
    { DistritoId: 10706, CantonId: 107, Distrito: 'Jaris' },
    { DistritoId: 10707, CantonId: 107, Distrito: 'Quitirrisí' },
    { DistritoId: 10801, CantonId: 108, Distrito: 'Guadalupe' },
    { DistritoId: 10802, CantonId: 108, Distrito: 'San Francisco' },
    { DistritoId: 10803, CantonId: 108, Distrito: 'Calle Blancos' },
    { DistritoId: 10804, CantonId: 108, Distrito: 'Mata de Plátano' },
    { DistritoId: 10805, CantonId: 108, Distrito: 'Ipis' },
    { DistritoId: 10806, CantonId: 108, Distrito: 'Rancho Redondo' },
    { DistritoId: 10807, CantonId: 108, Distrito: 'Purral' },
    { DistritoId: 10901, CantonId: 109, Distrito: 'Santa Ana' },
    { DistritoId: 10902, CantonId: 109, Distrito: 'Salitral' },
    { DistritoId: 10903, CantonId: 109, Distrito: 'Pozos' },
    { DistritoId: 10904, CantonId: 109, Distrito: 'Uruca' },
    { DistritoId: 10905, CantonId: 109, Distrito: 'Piedades' },
    { DistritoId: 10906, CantonId: 109, Distrito: 'Brasil' },
    { DistritoId: 11001, CantonId: 110, Distrito: 'Alajuelita' },
    { DistritoId: 11002, CantonId: 110, Distrito: 'San Josecito' },
    { DistritoId: 11003, CantonId: 110, Distrito: 'San Antonio' },
    { DistritoId: 11004, CantonId: 110, Distrito: 'Concepción' },
    { DistritoId: 11005, CantonId: 110, Distrito: 'San Felipe' },
    { DistritoId: 11101, CantonId: 111, Distrito: 'San Isidro' },
    { DistritoId: 11102, CantonId: 111, Distrito: 'San Rafael' },
    { DistritoId: 11103, CantonId: 111, Distrito: 'Dulce Nombre de Jesús' },
    { DistritoId: 11104, CantonId: 111, Distrito: 'Patalillo' },
    { DistritoId: 11105, CantonId: 111, Distrito: 'Cascajal' },
    { DistritoId: 11201, CantonId: 112, Distrito: 'San Ignacio' },
    { DistritoId: 11202, CantonId: 112, Distrito: 'Guaitil' },
    { DistritoId: 11203, CantonId: 112, Distrito: 'Palmichal' },
    { DistritoId: 11204, CantonId: 112, Distrito: 'Cangrejal' },
    { DistritoId: 11205, CantonId: 112, Distrito: 'Sabanillas' },
    { DistritoId: 11301, CantonId: 113, Distrito: 'San Juan' },
    { DistritoId: 11302, CantonId: 113, Distrito: 'Cinco Esquinas' },
    { DistritoId: 11303, CantonId: 113, Distrito: 'Anselmo Llorente' },
    { DistritoId: 11304, CantonId: 113, Distrito: 'León XIII' },
    { DistritoId: 11305, CantonId: 113, Distrito: 'Colima' },
    { DistritoId: 11401, CantonId: 114, Distrito: 'San Vicente' },
    { DistritoId: 11402, CantonId: 114, Distrito: 'San Jerónimo' },
    { DistritoId: 11403, CantonId: 114, Distrito: 'La Trinidad' },
    { DistritoId: 11501, CantonId: 115, Distrito: 'San Pedro' },
    { DistritoId: 11502, CantonId: 115, Distrito: 'Sabanilla' },
    { DistritoId: 11503, CantonId: 115, Distrito: 'Mercedes' },
    { DistritoId: 11504, CantonId: 115, Distrito: 'San Rafael' },
    { DistritoId: 11601, CantonId: 116, Distrito: 'San Pablo' },
    { DistritoId: 11602, CantonId: 116, Distrito: 'San Pedro' },
    { DistritoId: 11603, CantonId: 116, Distrito: 'San Juan de Mata' },
    { DistritoId: 11604, CantonId: 116, Distrito: 'San Luis' },
    { DistritoId: 11605, CantonId: 116, Distrito: 'Carara' },
    { DistritoId: 11701, CantonId: 117, Distrito: 'Santa María' },
    { DistritoId: 11702, CantonId: 117, Distrito: 'Jardín' },
    { DistritoId: 11703, CantonId: 117, Distrito: 'Copey' },
    { DistritoId: 11801, CantonId: 118, Distrito: 'Curridabat' },
    { DistritoId: 11802, CantonId: 118, Distrito: 'Granadilla' },
    { DistritoId: 11803, CantonId: 118, Distrito: 'Sánchez' },
    { DistritoId: 11804, CantonId: 118, Distrito: 'Tirrases' },
    { DistritoId: 11901, CantonId: 119, Distrito: 'San Isidro de El General' },
    { DistritoId: 11902, CantonId: 119, Distrito: 'El General' },
    { DistritoId: 11903, CantonId: 119, Distrito: 'Daniel Flores' },
    { DistritoId: 11904, CantonId: 119, Distrito: 'Rivas' },
    { DistritoId: 11905, CantonId: 119, Distrito: 'San Pedro' },
    { DistritoId: 11906, CantonId: 119, Distrito: 'Platanares' },
    { DistritoId: 11907, CantonId: 119, Distrito: 'Pejibaye' },
    { DistritoId: 11908, CantonId: 119, Distrito: 'Cajón' },
    { DistritoId: 11909, CantonId: 119, Distrito: 'Barú' },
    { DistritoId: 11910, CantonId: 119, Distrito: 'Río Nuevo' },
    { DistritoId: 11911, CantonId: 119, Distrito: 'Paramo' },
    { DistritoId: 11912, CantonId: 119, Distrito: 'La  Amistad' },
    { DistritoId: 12001, CantonId: 120, Distrito: 'San Pablo' },
    { DistritoId: 12002, CantonId: 120, Distrito: 'San Andrés' },
    { DistritoId: 12003, CantonId: 120, Distrito: 'Llano Bonito' },
    { DistritoId: 12004, CantonId: 120, Distrito: 'San Isidro' },
    { DistritoId: 12005, CantonId: 120, Distrito: 'Santa Cruz' },
    { DistritoId: 12006, CantonId: 120, Distrito: 'San Antonio' },
    { DistritoId: 20101, CantonId: 201, Distrito: 'Alajuela' },
    { DistritoId: 20102, CantonId: 201, Distrito: 'San José' },
    { DistritoId: 20103, CantonId: 201, Distrito: 'Carrizal' },
    { DistritoId: 20104, CantonId: 201, Distrito: 'San Antonio' },
    { DistritoId: 20105, CantonId: 201, Distrito: 'Guácima' },
    { DistritoId: 20106, CantonId: 201, Distrito: 'San Isidro' },
    { DistritoId: 20107, CantonId: 201, Distrito: 'Sabanilla' },
    { DistritoId: 20108, CantonId: 201, Distrito: 'San Rafael' },
    { DistritoId: 20109, CantonId: 201, Distrito: 'Río Segundo' },
    { DistritoId: 20110, CantonId: 201, Distrito: 'Desamparados' },
    { DistritoId: 20111, CantonId: 201, Distrito: 'Turrucares' },
    { DistritoId: 20112, CantonId: 201, Distrito: 'Tambor' },
    { DistritoId: 20113, CantonId: 201, Distrito: 'Garita' },
    { DistritoId: 20114, CantonId: 201, Distrito: 'Sarapiquí' },
    { DistritoId: 20201, CantonId: 202, Distrito: 'San Ramón' },
    { DistritoId: 20202, CantonId: 202, Distrito: 'Santiago' },
    { DistritoId: 20203, CantonId: 202, Distrito: 'San Juan' },
    { DistritoId: 20204, CantonId: 202, Distrito: 'Piedades Norte' },
    { DistritoId: 20205, CantonId: 202, Distrito: 'Piedades Sur' },
    { DistritoId: 20206, CantonId: 202, Distrito: 'San Rafael' },
    { DistritoId: 20207, CantonId: 202, Distrito: 'San Isidro' },
    { DistritoId: 20208, CantonId: 202, Distrito: 'Ángeles' },
    { DistritoId: 20209, CantonId: 202, Distrito: 'Alfaro' },
    { DistritoId: 20210, CantonId: 202, Distrito: 'Volio' },
    { DistritoId: 20211, CantonId: 202, Distrito: 'Concepción' },
    { DistritoId: 20212, CantonId: 202, Distrito: 'Zapotal' },
    { DistritoId: 20213, CantonId: 202, Distrito: 'Peñas Blancas' },
    { DistritoId: 20214, CantonId: 202, Distrito: 'San Lorenzo' },
    { DistritoId: 20301, CantonId: 203, Distrito: 'Grecia' },
    { DistritoId: 20302, CantonId: 203, Distrito: 'San Isidro' },
    { DistritoId: 20303, CantonId: 203, Distrito: 'San José' },
    { DistritoId: 20304, CantonId: 203, Distrito: 'San Roque' },
    { DistritoId: 20305, CantonId: 203, Distrito: 'Tacares' },
    { DistritoId: 20307, CantonId: 203, Distrito: 'Puente de Piedra' },
    { DistritoId: 20308, CantonId: 203, Distrito: 'Bolivar' },
    { DistritoId: 20401, CantonId: 204, Distrito: 'San Mateo' },
    { DistritoId: 20402, CantonId: 204, Distrito: 'Desmonte' },
    { DistritoId: 20403, CantonId: 204, Distrito: 'Jesús María' },
    { DistritoId: 20404, CantonId: 204, Distrito: 'Labrador' },
    { DistritoId: 20501, CantonId: 205, Distrito: 'Atenas' },
    { DistritoId: 20502, CantonId: 205, Distrito: 'Jesús' },
    { DistritoId: 20503, CantonId: 205, Distrito: 'Mercedes' },
    { DistritoId: 20504, CantonId: 205, Distrito: 'San Isidro' },
    { DistritoId: 20505, CantonId: 205, Distrito: 'Concepción' },
    { DistritoId: 20506, CantonId: 205, Distrito: 'San José' },
    { DistritoId: 20507, CantonId: 205, Distrito: 'Santa Eulalia' },
    { DistritoId: 20508, CantonId: 205, Distrito: 'Escobal' },
    { DistritoId: 20601, CantonId: 206, Distrito: 'Naranjo' },
    { DistritoId: 20602, CantonId: 206, Distrito: 'San Miguel' },
    { DistritoId: 20603, CantonId: 206, Distrito: 'San José' },
    { DistritoId: 20604, CantonId: 206, Distrito: 'Cirrí Sur' },
    { DistritoId: 20605, CantonId: 206, Distrito: 'San Jerónimo' },
    { DistritoId: 20606, CantonId: 206, Distrito: 'San Juan' },
    { DistritoId: 20607, CantonId: 206, Distrito: 'El Rosario' },
    { DistritoId: 20608, CantonId: 206, Distrito: 'Palmitos' },
    { DistritoId: 20701, CantonId: 207, Distrito: 'Palmares' },
    { DistritoId: 20702, CantonId: 207, Distrito: 'Zaragoza' },
    { DistritoId: 20703, CantonId: 207, Distrito: 'Buenos Aires' },
    { DistritoId: 20704, CantonId: 207, Distrito: 'Santiago' },
    { DistritoId: 20705, CantonId: 207, Distrito: 'Candelaria' },
    { DistritoId: 20706, CantonId: 207, Distrito: 'Esquipulas' },
    { DistritoId: 20707, CantonId: 207, Distrito: 'La Granja' },
    { DistritoId: 20801, CantonId: 208, Distrito: 'San Pedro' },
    { DistritoId: 20802, CantonId: 208, Distrito: 'San Juan' },
    { DistritoId: 20803, CantonId: 208, Distrito: 'San Rafael' },
    { DistritoId: 20804, CantonId: 208, Distrito: 'Carrillos' },
    { DistritoId: 20805, CantonId: 208, Distrito: 'Sabana Redonda' },
    { DistritoId: 20901, CantonId: 209, Distrito: 'Orotina' },
    { DistritoId: 20902, CantonId: 209, Distrito: 'El Mastate' },
    { DistritoId: 20903, CantonId: 209, Distrito: 'Hacienda Vieja' },
    { DistritoId: 20904, CantonId: 209, Distrito: 'Coyolar' },
    { DistritoId: 20905, CantonId: 209, Distrito: 'La Ceiba' },
    { DistritoId: 21001, CantonId: 210, Distrito: 'Quesada' },
    { DistritoId: 21002, CantonId: 210, Distrito: 'Florencia' },
    { DistritoId: 21003, CantonId: 210, Distrito: 'Buenavista' },
    { DistritoId: 21004, CantonId: 210, Distrito: 'Aguas Zarcas' },
    { DistritoId: 21005, CantonId: 210, Distrito: 'Venecia' },
    { DistritoId: 21006, CantonId: 210, Distrito: 'Pital' },
    { DistritoId: 21007, CantonId: 210, Distrito: 'La Fortuna' },
    { DistritoId: 21008, CantonId: 210, Distrito: 'La Tigra' },
    { DistritoId: 21009, CantonId: 210, Distrito: 'La Palmera' },
    { DistritoId: 21010, CantonId: 210, Distrito: 'Venado' },
    { DistritoId: 21011, CantonId: 210, Distrito: 'Cutris' },
    { DistritoId: 21012, CantonId: 210, Distrito: 'Monterrey' },
    { DistritoId: 21013, CantonId: 210, Distrito: 'Pocosol' },
    { DistritoId: 21101, CantonId: 211, Distrito: 'Zarcero' },
    { DistritoId: 21102, CantonId: 211, Distrito: 'Laguna' },
    { DistritoId: 21103, CantonId: 211, Distrito: 'Tapesco' },
    { DistritoId: 21104, CantonId: 211, Distrito: 'Guadalupe' },
    { DistritoId: 21105, CantonId: 211, Distrito: 'Palmira' },
    { DistritoId: 21106, CantonId: 211, Distrito: 'Zapote' },
    { DistritoId: 21107, CantonId: 211, Distrito: 'Brisas' },
    { DistritoId: 21201, CantonId: 212, Distrito: 'Sarchí Norte' },
    { DistritoId: 21202, CantonId: 212, Distrito: 'Sarchí Sur' },
    { DistritoId: 21203, CantonId: 212, Distrito: 'Toro Amarillo' },
    { DistritoId: 21204, CantonId: 212, Distrito: 'San Pedro' },
    { DistritoId: 21205, CantonId: 212, Distrito: 'Rodríguez' },
    { DistritoId: 21301, CantonId: 213, Distrito: 'Upala' },
    { DistritoId: 21302, CantonId: 213, Distrito: 'Aguas Claras' },
    { DistritoId: 21303, CantonId: 213, Distrito: 'San José O Pizote' },
    { DistritoId: 21304, CantonId: 213, Distrito: 'Bijagua' },
    { DistritoId: 21305, CantonId: 213, Distrito: 'Delicias' },
    { DistritoId: 21306, CantonId: 213, Distrito: 'Dos Ríos' },
    { DistritoId: 21307, CantonId: 213, Distrito: 'Yolillal' },
    { DistritoId: 21308, CantonId: 213, Distrito: 'Canalete' },
    { DistritoId: 21401, CantonId: 214, Distrito: 'Los Chiles' },
    { DistritoId: 21402, CantonId: 214, Distrito: 'Caño Negro' },
    { DistritoId: 21403, CantonId: 214, Distrito: 'El Amparo' },
    { DistritoId: 21404, CantonId: 214, Distrito: 'San Jorge' },
    { DistritoId: 21501, CantonId: 215, Distrito: 'San Rafael' },
    { DistritoId: 21502, CantonId: 215, Distrito: 'Buenavista' },
    { DistritoId: 21503, CantonId: 215, Distrito: 'Cote' },
    { DistritoId: 21504, CantonId: 215, Distrito: 'Katira' },
    { DistritoId: 21601, CantonId: 216, Distrito: 'Río Cuarto' },
    { DistritoId: 21602, CantonId: 216, Distrito: 'Santa Rita' },
    { DistritoId: 21603, CantonId: 216, Distrito: 'Santa Isabel' },
    { DistritoId: 30101, CantonId: 301, Distrito: 'Oriental' },
    { DistritoId: 30102, CantonId: 301, Distrito: 'Occidental' },
    { DistritoId: 30103, CantonId: 301, Distrito: 'Carmen' },
    { DistritoId: 30104, CantonId: 301, Distrito: 'San Nicolás' },
    { DistritoId: 30105, CantonId: 301, Distrito: 'Aguacaliente o San Francisco' },
    { DistritoId: 30106, CantonId: 301, Distrito: 'Guadalupe o Arenilla' },
    { DistritoId: 30107, CantonId: 301, Distrito: 'Corralillo' },
    { DistritoId: 30108, CantonId: 301, Distrito: 'Tierra Blanca' },
    { DistritoId: 30109, CantonId: 301, Distrito: 'Dulce Nombre' },
    { DistritoId: 30110, CantonId: 301, Distrito: 'Llano Grande' },
    { DistritoId: 30111, CantonId: 301, Distrito: 'Quebradilla' },
    { DistritoId: 30201, CantonId: 302, Distrito: 'Paraíso' },
    { DistritoId: 30202, CantonId: 302, Distrito: 'Santiago' },
    { DistritoId: 30203, CantonId: 302, Distrito: 'Orosi' },
    { DistritoId: 30204, CantonId: 302, Distrito: 'Cachí' },
    { DistritoId: 30205, CantonId: 302, Distrito: 'Llanos de Santa Lucía' },
    { DistritoId: 30206, CantonId: 302, Distrito: 'Birrisito' },
    { DistritoId: 30301, CantonId: 303, Distrito: 'Tres Ríos' },
    { DistritoId: 30302, CantonId: 303, Distrito: 'San Diego' },
    { DistritoId: 30303, CantonId: 303, Distrito: 'San Juan' },
    { DistritoId: 30304, CantonId: 303, Distrito: 'San Rafael' },
    { DistritoId: 30305, CantonId: 303, Distrito: 'Concepción' },
    { DistritoId: 30306, CantonId: 303, Distrito: 'Dulce Nombre' },
    { DistritoId: 30307, CantonId: 303, Distrito: 'San Ramón' },
    { DistritoId: 30308, CantonId: 303, Distrito: 'Río Azul' },
    { DistritoId: 30401, CantonId: 304, Distrito: 'Juan Viñas' },
    { DistritoId: 30402, CantonId: 304, Distrito: 'Tucurrique' },
    { DistritoId: 30403, CantonId: 304, Distrito: 'Pejibaye' },
    { DistritoId: 30501, CantonId: 305, Distrito: 'Turrialba' },
    { DistritoId: 30502, CantonId: 305, Distrito: 'La Suiza' },
    { DistritoId: 30503, CantonId: 305, Distrito: 'Peralta' },
    { DistritoId: 30504, CantonId: 305, Distrito: 'Santa Cruz' },
    { DistritoId: 30505, CantonId: 305, Distrito: 'Santa Teresita' },
    { DistritoId: 30506, CantonId: 305, Distrito: 'Pavones' },
    { DistritoId: 30507, CantonId: 305, Distrito: 'Tuis' },
    { DistritoId: 30508, CantonId: 305, Distrito: 'Tayutic' },
    { DistritoId: 30509, CantonId: 305, Distrito: 'Santa Rosa' },
    { DistritoId: 30510, CantonId: 305, Distrito: 'Tres Equis' },
    { DistritoId: 30511, CantonId: 305, Distrito: 'La Isabel' },
    { DistritoId: 30512, CantonId: 305, Distrito: 'Chirripó' },
    { DistritoId: 30601, CantonId: 306, Distrito: 'Pacayas' },
    { DistritoId: 30602, CantonId: 306, Distrito: 'Cervantes' },
    { DistritoId: 30603, CantonId: 306, Distrito: 'Capellades' },
    { DistritoId: 30701, CantonId: 307, Distrito: 'San Rafael' },
    { DistritoId: 30702, CantonId: 307, Distrito: 'Cot' },
    { DistritoId: 30703, CantonId: 307, Distrito: 'Potrero Cerrado' },
    { DistritoId: 30704, CantonId: 307, Distrito: 'Cipreses' },
    { DistritoId: 30705, CantonId: 307, Distrito: 'Santa Rosa' },
    { DistritoId: 30801, CantonId: 308, Distrito: 'El Tejar' },
    { DistritoId: 30802, CantonId: 308, Distrito: 'San Isidro' },
    { DistritoId: 30803, CantonId: 308, Distrito: 'Tobosi' },
    { DistritoId: 30804, CantonId: 308, Distrito: 'Patio de Agua' },
    { DistritoId: 40101, CantonId: 401, Distrito: 'Heredia' },
    { DistritoId: 40102, CantonId: 401, Distrito: 'Mercedes' },
    { DistritoId: 40103, CantonId: 401, Distrito: 'San Francisco' },
    { DistritoId: 40104, CantonId: 401, Distrito: 'Ulloa' },
    { DistritoId: 40105, CantonId: 401, Distrito: 'Varablanca' },
    { DistritoId: 40201, CantonId: 402, Distrito: 'Barva' },
    { DistritoId: 40202, CantonId: 402, Distrito: 'San Pedro' },
    { DistritoId: 40203, CantonId: 402, Distrito: 'San Pablo' },
    { DistritoId: 40204, CantonId: 402, Distrito: 'San Roque' },
    { DistritoId: 40205, CantonId: 402, Distrito: 'Santa Lucía' },
    { DistritoId: 40206, CantonId: 402, Distrito: 'San José de la Montaña' },
    { DistritoId: 40301, CantonId: 403, Distrito: 'Santo Domingo' },
    { DistritoId: 40302, CantonId: 403, Distrito: 'San Vicente' },
    { DistritoId: 40303, CantonId: 403, Distrito: 'San Miguel' },
    { DistritoId: 40304, CantonId: 403, Distrito: 'Paracito' },
    { DistritoId: 40305, CantonId: 403, Distrito: 'Santo Tomás' },
    { DistritoId: 40306, CantonId: 403, Distrito: 'Santa Rosa' },
    { DistritoId: 40307, CantonId: 403, Distrito: 'Tures' },
    { DistritoId: 40308, CantonId: 403, Distrito: 'Pará' },
    { DistritoId: 40401, CantonId: 404, Distrito: 'Santa Bárbara' },
    { DistritoId: 40402, CantonId: 404, Distrito: 'San Pedro' },
    { DistritoId: 40403, CantonId: 404, Distrito: 'San Juan' },
    { DistritoId: 40404, CantonId: 404, Distrito: 'Jesús' },
    { DistritoId: 40405, CantonId: 404, Distrito: 'Santo Domingo' },
    { DistritoId: 40406, CantonId: 404, Distrito: 'Purabá' },
    { DistritoId: 40501, CantonId: 405, Distrito: 'San Rafael' },
    { DistritoId: 40502, CantonId: 405, Distrito: 'San Josecito' },
    { DistritoId: 40503, CantonId: 405, Distrito: 'Santiago' },
    { DistritoId: 40504, CantonId: 405, Distrito: 'Ángeles' },
    { DistritoId: 40505, CantonId: 405, Distrito: 'Concepción' },
    { DistritoId: 40601, CantonId: 406, Distrito: 'San Isidro' },
    { DistritoId: 40602, CantonId: 406, Distrito: 'San José' },
    { DistritoId: 40603, CantonId: 406, Distrito: 'Concepción' },
    { DistritoId: 40604, CantonId: 406, Distrito: 'San Francisco' },
    { DistritoId: 40701, CantonId: 407, Distrito: 'San Antonio' },
    { DistritoId: 40702, CantonId: 407, Distrito: 'La Ribera' },
    { DistritoId: 40703, CantonId: 407, Distrito: 'La Asunción' },
    { DistritoId: 40801, CantonId: 408, Distrito: 'San Joaquín' },
    { DistritoId: 40802, CantonId: 408, Distrito: 'Barrantes' },
    { DistritoId: 40803, CantonId: 408, Distrito: 'Llorente' },
    { DistritoId: 40901, CantonId: 409, Distrito: 'San Pablo' },
    { DistritoId: 40902, CantonId: 409, Distrito: 'Rincón de Sabanilla' },
    { DistritoId: 41001, CantonId: 410, Distrito: 'Puerto Viejo' },
    { DistritoId: 41002, CantonId: 410, Distrito: 'La Virgen' },
    { DistritoId: 41003, CantonId: 410, Distrito: 'Las Horquetas' },
    { DistritoId: 41004, CantonId: 410, Distrito: 'Llanuras del Gaspar' },
    { DistritoId: 41005, CantonId: 410, Distrito: 'Cureña' },
    { DistritoId: 50101, CantonId: 501, Distrito: 'Liberia' },
    { DistritoId: 50102, CantonId: 501, Distrito: 'Cañas Dulces' },
    { DistritoId: 50103, CantonId: 501, Distrito: 'Mayorga' },
    { DistritoId: 50104, CantonId: 501, Distrito: 'Nacascolo' },
    { DistritoId: 50105, CantonId: 501, Distrito: 'Curubandé' },
    { DistritoId: 50201, CantonId: 502, Distrito: 'Nicoya' },
    { DistritoId: 50202, CantonId: 502, Distrito: 'Mansión' },
    { DistritoId: 50203, CantonId: 502, Distrito: 'San Antonio' },
    { DistritoId: 50204, CantonId: 502, Distrito: 'Quebrada Honda' },
    { DistritoId: 50205, CantonId: 502, Distrito: 'Sámara' },
    { DistritoId: 50206, CantonId: 502, Distrito: 'Nosara' },
    { DistritoId: 50207, CantonId: 502, Distrito: 'Belén de Nosarita' },
    { DistritoId: 50301, CantonId: 503, Distrito: 'Santa Cruz' },
    { DistritoId: 50302, CantonId: 503, Distrito: 'Bolsón' },
    { DistritoId: 50303, CantonId: 503, Distrito: 'Veintisiete de Abril' },
    { DistritoId: 50304, CantonId: 503, Distrito: 'Tempate' },
    { DistritoId: 50305, CantonId: 503, Distrito: 'Cartagena' },
    { DistritoId: 50306, CantonId: 503, Distrito: 'Cuajiniquil' },
    { DistritoId: 50307, CantonId: 503, Distrito: 'Diriá' },
    { DistritoId: 50308, CantonId: 503, Distrito: 'Cabo Velas' },
    { DistritoId: 50309, CantonId: 503, Distrito: 'Tamarindo' },
    { DistritoId: 50401, CantonId: 504, Distrito: 'Bagaces' },
    { DistritoId: 50402, CantonId: 504, Distrito: 'La Fortuna' },
    { DistritoId: 50403, CantonId: 504, Distrito: 'Mogote' },
    { DistritoId: 50404, CantonId: 504, Distrito: 'Río Naranjo' },
    { DistritoId: 50501, CantonId: 505, Distrito: 'Filadelfia' },
    { DistritoId: 50502, CantonId: 505, Distrito: 'Palmira' },
    { DistritoId: 50503, CantonId: 505, Distrito: 'Sardinal' },
    { DistritoId: 50504, CantonId: 505, Distrito: 'Belén' },
    { DistritoId: 50601, CantonId: 506, Distrito: 'Cañas' },
    { DistritoId: 50602, CantonId: 506, Distrito: 'Palmira' },
    { DistritoId: 50603, CantonId: 506, Distrito: 'San Miguel' },
    { DistritoId: 50604, CantonId: 506, Distrito: 'Bebedero' },
    { DistritoId: 50605, CantonId: 506, Distrito: 'Porozal' },
    { DistritoId: 50701, CantonId: 507, Distrito: 'Las Juntas' },
    { DistritoId: 50702, CantonId: 507, Distrito: 'Sierra' },
    { DistritoId: 50703, CantonId: 507, Distrito: 'San Juan' },
    { DistritoId: 50704, CantonId: 507, Distrito: 'Colorado' },
    { DistritoId: 50801, CantonId: 508, Distrito: 'Tilarán' },
    { DistritoId: 50802, CantonId: 508, Distrito: 'Quebrada Grande' },
    { DistritoId: 50803, CantonId: 508, Distrito: 'Tronadora' },
    { DistritoId: 50804, CantonId: 508, Distrito: 'Santa Rosa' },
    { DistritoId: 50805, CantonId: 508, Distrito: 'Líbano' },
    { DistritoId: 50806, CantonId: 508, Distrito: 'Tierras Morenas' },
    { DistritoId: 50807, CantonId: 508, Distrito: 'Arenal' },
    { DistritoId: 50808, CantonId: 508, Distrito: 'Cabeceras' },
    { DistritoId: 50901, CantonId: 509, Distrito: 'Carmona' },
    { DistritoId: 50902, CantonId: 509, Distrito: 'Santa Rita' },
    { DistritoId: 50903, CantonId: 509, Distrito: 'Zapotal' },
    { DistritoId: 50904, CantonId: 509, Distrito: 'San Pablo' },
    { DistritoId: 50905, CantonId: 509, Distrito: 'Porvenir' },
    { DistritoId: 50906, CantonId: 509, Distrito: 'Bejuco' },
    { DistritoId: 51001, CantonId: 510, Distrito: 'La Cruz' },
    { DistritoId: 51002, CantonId: 510, Distrito: 'Santa Cecilia' },
    { DistritoId: 51003, CantonId: 510, Distrito: 'La Garita' },
    { DistritoId: 51004, CantonId: 510, Distrito: 'Santa Elena' },
    { DistritoId: 51101, CantonId: 511, Distrito: 'Hojancha' },
    { DistritoId: 51102, CantonId: 511, Distrito: 'Monte Romo' },
    { DistritoId: 51103, CantonId: 511, Distrito: 'Puerto Carrillo' },
    { DistritoId: 51104, CantonId: 511, Distrito: 'Huacas' },
    { DistritoId: 51105, CantonId: 511, Distrito: 'Matambú' },
    { DistritoId: 60101, CantonId: 601, Distrito: 'Puntarenas' },
    { DistritoId: 60102, CantonId: 601, Distrito: 'Pitahaya' },
    { DistritoId: 60103, CantonId: 601, Distrito: 'Chomes' },
    { DistritoId: 60104, CantonId: 601, Distrito: 'Lepanto' },
    { DistritoId: 60105, CantonId: 601, Distrito: 'Paquera' },
    { DistritoId: 60106, CantonId: 601, Distrito: 'Manzanillo' },
    { DistritoId: 60107, CantonId: 601, Distrito: 'Guacimal' },
    { DistritoId: 60108, CantonId: 601, Distrito: 'Barranca' },
    { DistritoId: 60110, CantonId: 601, Distrito: 'Isla del Coco' },
    { DistritoId: 60111, CantonId: 601, Distrito: 'Cóbano' },
    { DistritoId: 60112, CantonId: 601, Distrito: 'Chacarita' },
    { DistritoId: 60113, CantonId: 601, Distrito: 'Chira' },
    { DistritoId: 60114, CantonId: 601, Distrito: 'Acapulco' },
    { DistritoId: 60115, CantonId: 601, Distrito: 'El Roble' },
    { DistritoId: 60116, CantonId: 601, Distrito: 'Arancibia' },
    { DistritoId: 60201, CantonId: 602, Distrito: 'Espíritu Santo' },
    { DistritoId: 60202, CantonId: 602, Distrito: 'San Juan Grande' },
    { DistritoId: 60203, CantonId: 602, Distrito: 'Macacona' },
    { DistritoId: 60204, CantonId: 602, Distrito: 'San Rafael' },
    { DistritoId: 60205, CantonId: 602, Distrito: 'San Jerónimo' },
    { DistritoId: 60206, CantonId: 602, Distrito: 'Caldera' },
    { DistritoId: 60301, CantonId: 603, Distrito: 'Buenos Aires' },
    { DistritoId: 60302, CantonId: 603, Distrito: 'Volcán' },
    { DistritoId: 60303, CantonId: 603, Distrito: 'Potrero Grande' },
    { DistritoId: 60304, CantonId: 603, Distrito: 'Boruca' },
    { DistritoId: 60305, CantonId: 603, Distrito: 'Pilas' },
    { DistritoId: 60306, CantonId: 603, Distrito: 'Colinas' },
    { DistritoId: 60307, CantonId: 603, Distrito: 'Chánguena' },
    { DistritoId: 60308, CantonId: 603, Distrito: 'Biolley' },
    { DistritoId: 60309, CantonId: 603, Distrito: 'Brunka' },
    { DistritoId: 60401, CantonId: 604, Distrito: 'Miramar' },
    { DistritoId: 60402, CantonId: 604, Distrito: 'La Unión' },
    { DistritoId: 60403, CantonId: 604, Distrito: 'San Isidro' },
    { DistritoId: 60501, CantonId: 605, Distrito: 'Puerto Cortés' },
    { DistritoId: 60502, CantonId: 605, Distrito: 'Palmar' },
    { DistritoId: 60503, CantonId: 605, Distrito: 'Sierpe' },
    { DistritoId: 60504, CantonId: 605, Distrito: 'Bahía Ballena' },
    { DistritoId: 60505, CantonId: 605, Distrito: 'Piedras Blancas' },
    { DistritoId: 60506, CantonId: 605, Distrito: 'Bahía Drake' },
    { DistritoId: 60601, CantonId: 606, Distrito: 'Quepos' },
    { DistritoId: 60602, CantonId: 606, Distrito: 'Savegre' },
    { DistritoId: 60603, CantonId: 606, Distrito: 'Naranjito' },
    { DistritoId: 60701, CantonId: 607, Distrito: 'Golfito' },
    { DistritoId: 60702, CantonId: 607, Distrito: 'Puerto Jiménez' },
    { DistritoId: 60703, CantonId: 607, Distrito: 'Guaycará' },
    { DistritoId: 60704, CantonId: 607, Distrito: 'Pavón' },
    { DistritoId: 60801, CantonId: 608, Distrito: 'San Vito' },
    { DistritoId: 60802, CantonId: 608, Distrito: 'Sabalito' },
    { DistritoId: 60803, CantonId: 608, Distrito: 'Aguabuena' },
    { DistritoId: 60804, CantonId: 608, Distrito: 'Limoncito' },
    { DistritoId: 60805, CantonId: 608, Distrito: 'Pittier' },
    { DistritoId: 60806, CantonId: 608, Distrito: 'Gutiérrez Braun' },
    { DistritoId: 60901, CantonId: 609, Distrito: 'Parrita' },
    { DistritoId: 61001, CantonId: 610, Distrito: 'Corredor' },
    { DistritoId: 61002, CantonId: 610, Distrito: 'La Cuesta' },
    { DistritoId: 61003, CantonId: 610, Distrito: 'Canoas' },
    { DistritoId: 61004, CantonId: 610, Distrito: 'Laurel' },
    { DistritoId: 61101, CantonId: 611, Distrito: 'Jacó' },
    { DistritoId: 61102, CantonId: 611, Distrito: 'Tárcoles' },
    { DistritoId: 61103, CantonId: 611, Distrito: 'Lagunillas' },
    { DistritoId: 61201, CantonId: 612, Distrito: 'Monteverde' },
    { DistritoId: 70101, CantonId: 701, Distrito: 'Limón' },
    { DistritoId: 70102, CantonId: 701, Distrito: 'Valle La Estrella' },
    { DistritoId: 70103, CantonId: 701, Distrito: 'Río Blanco' },
    { DistritoId: 70104, CantonId: 701, Distrito: 'Matama' },
    { DistritoId: 70201, CantonId: 702, Distrito: 'Guápiles' },
    { DistritoId: 70202, CantonId: 702, Distrito: 'Jiménez' },
    { DistritoId: 70203, CantonId: 702, Distrito: 'Rita' },
    { DistritoId: 70204, CantonId: 702, Distrito: 'Roxana' },
    { DistritoId: 70205, CantonId: 702, Distrito: 'Cariari' },
    { DistritoId: 70206, CantonId: 702, Distrito: 'Colorado' },
    { DistritoId: 70207, CantonId: 702, Distrito: 'La Colonia' },
    { DistritoId: 70301, CantonId: 703, Distrito: 'Siquirres' },
    { DistritoId: 70302, CantonId: 703, Distrito: 'Pacuarito' },
    { DistritoId: 70303, CantonId: 703, Distrito: 'Florida' },
    { DistritoId: 70304, CantonId: 703, Distrito: 'Germania' },
    { DistritoId: 70305, CantonId: 703, Distrito: 'El Cairo' },
    { DistritoId: 70306, CantonId: 703, Distrito: 'Alegría' },
    { DistritoId: 70307, CantonId: 703, Distrito: 'Reventazón' },
    { DistritoId: 70401, CantonId: 704, Distrito: 'Bratsi' },
    { DistritoId: 70402, CantonId: 704, Distrito: 'Sixaola' },
    { DistritoId: 70403, CantonId: 704, Distrito: 'Cahuita' },
    { DistritoId: 70404, CantonId: 704, Distrito: 'Telire' },
    { DistritoId: 70501, CantonId: 705, Distrito: 'Matina' },
    { DistritoId: 70502, CantonId: 705, Distrito: 'Batán' },
    { DistritoId: 70503, CantonId: 705, Distrito: 'Carrandí' },
    { DistritoId: 70601, CantonId: 706, Distrito: 'Guácimo' },
    { DistritoId: 70602, CantonId: 706, Distrito: 'Mercedes' },
    { DistritoId: 70603, CantonId: 706, Distrito: 'Pocora' },



  ];
  // Crear Distritos
  await prisma.distritos.createMany({
    data: distritosData,
  });


  // ************************************************************** Usuarios **************************************************************

  // Generar identificación con el primer dígito entre 1 y 7
  const identificacionesUsadas = new Set<string>(); // Almacena identificaciones únicas

  function generarIdentificacion(): string {
    let identificacion: string;

    do {
      const primerDigito = fakerES_MX.number.int({ min: 1, max: 7 }).toString();
      const otrosDigitos = fakerES_MX.string.numeric(8);
      identificacion = primerDigito + otrosDigitos;
    } while (identificacionesUsadas.has(identificacion)); // Repetir si ya existe

    identificacionesUsadas.add(identificacion); // Guardar la nueva identificación
    return identificacion;
  }


  // Generar un apellido simple (solo la primera palabra)
  function generarApellidoSimple() {
    return fakerES_MX.person.lastName().split(" ")[0]; // Solo la primera palabra
  }


  // Generar un número de teléfono en formato de Costa Rica
  function generarTelefono(): string {
    const prefijo = '+506';
    const primerDigito = fakerES_MX.helpers.arrayElement(['6', '7', '8']); // Prefijos válidos en CR
    const numero = fakerES_MX.string.numeric(3) + '-' + fakerES_MX.string.numeric(4); // Formato XXXX-XXXX
    return `${prefijo} ${primerDigito}${numero}`;
  }


  // Obtener una dirección aleatoria asegurando la relación Provincia → Cantón → Distrito
  async function getRandomDireccion() {
    // Obtener todas las provincias disponibles
    const provincias = await prisma.provincias.findMany({
      select: {
        ProvinciaId: true,
        Provincia: true,
        Cantones: {
          select: {
            CantonId: true,
            Canton: true,
            Distritos: {
              select: {
                DistritoId: true,
                Distrito: true,
              },
            },
          },
        },
      },
    });

    if (provincias.length === 0) {
      throw new Error("No hay provincias en la base de datos.");
    }

    // Seleccionar una provincia aleatoria
    const provincia = fakerES_MX.helpers.arrayElement(provincias);

    // Filtrar cantones que pertenecen a la provincia seleccionada
    const cantones = provincia.Cantones;

    if (cantones.length === 0) {
      throw new Error(`La provincia ${provincia.Provincia} no tiene cantones.`);
    }

    // Seleccionar un cantón aleatorio de la provincia
    const canton = fakerES_MX.helpers.arrayElement(cantones);

    // Filtrar distritos que pertenecen al cantón seleccionado
    const distritos = canton.Distritos;

    if (distritos.length === 0) {
      throw new Error(`El cantón ${canton.Canton} en ${provincia.Provincia} no tiene distritos.`);
    }

    // Seleccionar un distrito aleatorio del cantón
    const distrito = fakerES_MX.helpers.arrayElement(distritos);

    return {
      direccion: `${provincia.Provincia}, ${canton.Canton}, ${distrito.Distrito}`,
      provincia: provincia.Provincia,
      canton: canton.Canton,
      distrito: distrito.Distrito,
    };
  }


  // Crear usuarios
  await prisma.usuario.createMany({
    data: [
      { Identificacion: '530248379', Login: 'amonge', Contrasena: 'Administrator', Email: 'Anita_Monge@gmail.com', Rol: 'Administrador' },
      { Identificacion: '626485133', Login: 'uarguello', Contrasena: 'Administrator', Email: 'Uriel_Arguello@gmail.com', Rol: 'Administrador' },
    ],
  });

  //crear docentes
  await prisma.docente.createMany({
    data: [
      { Identificacion: '530248379', Nombre: 'Ana Luisa', Apellido1: 'Monge', Apellido2: 'Mercado', Correo: 'Anita_Monge@gmail.com', Direccion: 'San José, Desamparados, San Miguel', Telefono: '+506 8909-6501' },
      { Identificacion: '626485133', Nombre: 'Uriel', Apellido1: 'Arguello', Apellido2: 'Herrera', Correo: 'Uriel_Arguello@gmail.com', Direccion: 'Limón, Matina, Carrandí', Telefono: '+506 6237-4730' },
    ],
  })


  async function seed() {

    // Crear 100 estudiantes aleatorios
    const estudiantes = [];

    for (let i = 0; i < 100; i++) {
      const { direccion } = await getRandomDireccion();

      estudiantes.push({
        Identificacion: generarIdentificacion(),
        Nombre: fakerES_MX.person.firstName(),
        Apellido1: generarApellidoSimple(),
        Apellido2: generarApellidoSimple(),
        Correo: fakerES_MX.internet.email(),
        Direccion: direccion,
        Telefono: generarTelefono(),
      });
    }

    await prisma.estudiante.createMany({ data: estudiantes });

    console.log('100 estudiantes creados con éxito');


    // Crear 100 docentes aleatorios

    const docentes = [];

    for (let i = 0; i < 100; i++) {
      const { direccion } = await getRandomDireccion();

      docentes.push({
        Identificacion: generarIdentificacion(),
        Nombre: fakerES_MX.person.firstName(),
        Apellido1: generarApellidoSimple(),
        Apellido2: generarApellidoSimple(),
        Correo: fakerES_MX.internet.email(),
        Direccion: direccion,
        Telefono: generarTelefono(),
      });
    }

    await prisma.docente.createMany({ data: docentes });

    console.log('100 docentes creados con éxito');

    

    //*******************************************************************PLANES DE ESTUDIO *********************************************************************/
    // Crear 100 Planes de Estudio de ejemplo
    await prisma.planEstudio.createMany({
      data: [
        { Nombre: 'Ingeniería en Sistemas de Computación', Descripcion: 'Programa enfocado en el desarrollo de software y administración de sistemas informáticos.' },
        { Nombre: 'Licenciatura en Administración de Empresas', Descripcion: 'Formación en gestión empresarial, finanzas y mercadeo.' },
        { Nombre: 'Ingeniería Civil', Descripcion: 'Estudios en diseño, construcción y mantenimiento de infraestructuras.' },
        { Nombre: 'Medicina General', Descripcion: 'Programa orientado al estudio de la salud y atención médica.' },
        { Nombre: 'Arquitectura', Descripcion: 'Plan de estudios centrado en el diseño y construcción de espacios habitables.' },
        { Nombre: 'Ingeniería Electrónica', Descripcion: 'Programa enfocado en circuitos, telecomunicaciones y sistemas electrónicos.' },
        { Nombre: 'Psicología', Descripcion: 'Formación en teorías psicológicas y prácticas terapéuticas.' },
        { Nombre: 'Contaduría Pública', Descripcion: 'Estudios en auditoría, impuestos y contabilidad financiera.' },
        { Nombre: 'Derecho', Descripcion: 'Programa que estudia las leyes, normativas y jurisprudencia.' },
        { Nombre: 'Ingeniería Industrial', Descripcion: 'Optimización de procesos productivos y gestión de operaciones.' },
        { Nombre: 'Ingeniería Mecánica', Descripcion: 'Estudios en diseño y mantenimiento de maquinaria.' },
        { Nombre: 'Ciencias de la Computación', Descripcion: 'Programa centrado en algoritmos, inteligencia artificial y big data.' },
        { Nombre: 'Física', Descripcion: 'Estudios en mecánica, electromagnetismo y física cuántica.' },
        { Nombre: 'Matemáticas', Descripcion: 'Formación avanzada en cálculo, álgebra y estadística.' },
        { Nombre: 'Química', Descripcion: 'Programa sobre la estructura y transformación de la materia.' },
        { Nombre: 'Biología', Descripcion: 'Estudios sobre seres vivos y su interacción con el entorno.' },
        { Nombre: 'Ingeniería Ambiental', Descripcion: 'Formación en gestión y mitigación de impactos ambientales.' },
        { Nombre: 'Ingeniería Biomédica', Descripcion: 'Desarrollo de tecnología para el sector salud.' },
        { Nombre: 'Ingeniería en Telecomunicaciones', Descripcion: 'Diseño y gestión de redes y sistemas de comunicación.' },
        { Nombre: 'Mercadotecnia', Descripcion: 'Estrategias de mercado, publicidad y comportamiento del consumidor.' },
        { Nombre: 'Nutrición', Descripcion: 'Estudio de la alimentación y su impacto en la salud.' },
        { Nombre: 'Ingeniería Aeroespacial', Descripcion: 'Desarrollo y mantenimiento de aeronaves y sistemas espaciales.' },
        { Nombre: 'Filosofía', Descripcion: 'Análisis de la existencia, conocimiento y ética.' },
        { Nombre: 'Ingeniería Agronómica', Descripcion: 'Optimización de producción agrícola y gestión de recursos naturales.' },
        { Nombre: 'Relaciones Internacionales', Descripcion: 'Estudio de la política global y cooperación internacional.' },
        { Nombre: 'Antropología', Descripcion: 'Investigación sobre la evolución y diversidad cultural humana.' },
        { Nombre: 'Ingeniería de Materiales', Descripcion: 'Estudio y desarrollo de nuevos materiales avanzados.' },
        { Nombre: 'Sociología', Descripcion: 'Análisis de la estructura y comportamiento de las sociedades.' },
        { Nombre: 'Historia', Descripcion: 'Estudio cronológico de eventos y civilizaciones.' },
        { Nombre: 'Ciencias Políticas', Descripcion: 'Análisis de sistemas políticos y toma de decisiones.' },
        { Nombre: 'Arte Digital', Descripcion: 'Creación y producción artística con herramientas digitales.' },
        { Nombre: 'Música', Descripcion: 'Estudios teóricos y prácticos en producción musical.' },
        { Nombre: 'Diseño Gráfico', Descripcion: 'Plan de estudios sobre comunicación visual y diseño multimedia.' },
        { Nombre: 'Ingeniería Geológica', Descripcion: 'Exploración y análisis de recursos geológicos.' },
        { Nombre: 'Ingeniería Petrolera', Descripcion: 'Desarrollo y extracción de recursos energéticos fósiles.' },
        { Nombre: 'Enfermería', Descripcion: 'Atención clínica y cuidado de pacientes en distintas áreas de la salud.' },
        { Nombre: 'Farmacia', Descripcion: 'Desarrollo y distribución de medicamentos y fármacos.' },
        { Nombre: 'Ingeniería Naval', Descripcion: 'Diseño y mantenimiento de embarcaciones y estructuras marítimas.' },
        { Nombre: 'Educación Primaria', Descripcion: 'Formación en pedagogía para la enseñanza en nivel primario.' },
        { Nombre: 'Educación Secundaria', Descripcion: 'Capacitación en enseñanza y didáctica para niveles medios.' },
        { Nombre: 'Pedagogía', Descripcion: 'Teorías educativas y metodologías de enseñanza.' },
        { Nombre: 'Cine y Televisión', Descripcion: 'Producción audiovisual y dirección cinematográfica.' },
        { Nombre: 'Ingeniería Textil', Descripcion: 'Desarrollo de materiales textiles y optimización de procesos de fabricación.' },
        { Nombre: 'Tecnología de Alimentos', Descripcion: 'Seguridad y producción de alimentos industrializados.' },
        { Nombre: 'Trabajo Social', Descripcion: 'Atención a comunidades y gestión de programas de bienestar social.' },
        { Nombre: 'Lenguas Extranjeras', Descripcion: 'Estudios en traducción e interpretación de idiomas.' },
        { Nombre: 'Turismo', Descripcion: 'Gestión y promoción del sector turístico y hotelero.' },
        { Nombre: 'Ingeniería en Energías Renovables', Descripcion: 'Implementación y desarrollo de energías limpias.' },
        { Nombre: 'Gestión Deportiva', Descripcion: 'Administración de eventos y programas deportivos.' },
        { Nombre: 'Animación 3D y Videojuegos', Descripcion: 'Diseño y desarrollo de contenido interactivo en 3D.' },
        { Nombre: 'Ingeniería en Inteligencia Artificial', Descripcion: 'Modelado y desarrollo de algoritmos de IA.' },
        { Nombre: 'Ingeniería en Ciberseguridad', Descripcion: 'Protección y análisis de sistemas informáticos.' },
        { Nombre: 'Neurociencia', Descripcion: 'Estudio del cerebro y las funciones cognitivas humanas.' },
        { Nombre: 'Robótica', Descripcion: 'Desarrollo de sistemas autónomos e inteligentes.' },
        { Nombre: 'Astrofísica', Descripcion: 'Estudio de los astros y el universo.' },
        { Nombre: 'Ingeniería en Energía', Descripcion: 'Estudios sobre generación y distribución de energía.' },
        { Nombre: 'Ingeniería en Transporte', Descripcion: 'Planificación y gestión de sistemas de transporte.' },
        { Nombre: 'Ingeniería en Automatización', Descripcion: 'Desarrollo de sistemas automáticos y control de procesos.' },
        { Nombre: 'Ingeniería en Biotecnología', Descripcion: 'Aplicación de la biología en procesos industriales.' },
        { Nombre: 'Ingeniería en Nanotecnología', Descripcion: 'Desarrollo y aplicación de materiales a escala nanométrica.' },
        { Nombre: 'Ingeniería en Mecatrónica', Descripcion: 'Integración de sistemas mecánicos, electrónicos y de control.' },
        { Nombre: 'Ingeniería en Sistemas de Información', Descripcion: 'Gestión y desarrollo de sistemas de información.' },
        { Nombre: 'Ingeniería en Logística', Descripcion: 'Optimización de cadenas de suministro y distribución.' },
        { Nombre: 'Ingeniería en Manufactura', Descripcion: 'Diseño y mejora de procesos de producción industrial.' },
        { Nombre: 'Ingeniería en Telecomunicaciones', Descripcion: 'Estudios en redes y sistemas de comunicación.' },
        { Nombre: 'Ingeniería en Software', Descripcion: 'Desarrollo y mantenimiento de aplicaciones de software.' },
        { Nombre: 'Ingeniería en Computación', Descripcion: 'Estudios en hardware y software de computadoras.' },
        { Nombre: 'Ingeniería en Sistemas', Descripcion: 'Diseño y gestión de sistemas complejos.' },
        { Nombre: 'Ingeniería en Electrónica', Descripcion: 'Estudios en circuitos y sistemas electrónicos.' },
        { Nombre: 'Ingeniería en Control', Descripcion: 'Desarrollo de sistemas de control automático.' },
        { Nombre: 'Ingeniería en Instrumentación', Descripcion: 'Diseño y aplicación de sistemas de medición.' },
        { Nombre: 'Ingeniería en Materiales', Descripcion: 'Estudios en propiedades y aplicaciones de materiales.' },
        { Nombre: 'Ingeniería en Metalurgia', Descripcion: 'Procesamiento y tratamiento de metales.' },
        { Nombre: 'Ingeniería en Minas', Descripcion: 'Exploración y explotación de recursos minerales.' },
        { Nombre: 'Ingeniería en Petróleo', Descripcion: 'Estudios en extracción y procesamiento de petróleo.' },
        { Nombre: 'Ingeniería en Gas', Descripcion: 'Gestión y distribución de gas natural.' },
        { Nombre: 'Ingeniería en Energía Renovable', Descripcion: 'Desarrollo de tecnologías de energía limpia.' },
        { Nombre: 'Ingeniería en Medio Ambiente', Descripcion: 'Gestión y mitigación de impactos ambientales.' },
        { Nombre: 'Ingeniería en Recursos Naturales', Descripcion: 'Estudios en conservación y uso sostenible de recursos.' },
        { Nombre: 'Ingeniería en Geología', Descripcion: 'Exploración y análisis de la tierra y sus recursos.' },
        { Nombre: 'Ingeniería en Geofísica', Descripcion: 'Estudios en propiedades físicas de la tierra.' },
        { Nombre: 'Ingeniería en Hidrología', Descripcion: 'Gestión y estudio de recursos hídricos.' },
        { Nombre: 'Ingeniería en Oceanografía', Descripcion: 'Estudios en procesos y recursos oceánicos.' },
        { Nombre: 'Ingeniería en Meteorología', Descripcion: 'Estudios en clima y fenómenos atmosféricos.' },
        { Nombre: 'Ingeniería en Sismología', Descripcion: 'Estudios en terremotos y movimientos sísmicos.' },
        { Nombre: 'Ingeniería en Vulcanología', Descripcion: 'Estudios en volcanes y actividad volcánica.' },
        { Nombre: 'Ingeniería en Astronomía', Descripcion: 'Estudios en astros y el universo.' },
        { Nombre: 'Ingeniería en Física', Descripcion: 'Estudios en leyes y principios físicos.' },
        { Nombre: 'Ingeniería en Química', Descripcion: 'Estudios en reacciones y propiedades químicas.' },
        { Nombre: 'Ingeniería en Biología', Descripcion: 'Estudios en organismos y procesos biológicos.' },
        { Nombre: 'Ingeniería en Ecología', Descripcion: 'Estudios en ecosistemas y biodiversidad.' },
        { Nombre: 'Ingeniería en Genética', Descripcion: 'Estudios en herencia y variación genética.' },
        { Nombre: 'Ingeniería en Microbiología', Descripcion: 'Estudios en microorganismos y sus aplicaciones.' },
        { Nombre: 'Ingeniería en Zoología', Descripcion: 'Estudios en animales y su comportamiento.' },
        { Nombre: 'Ingeniería en Botánica', Descripcion: 'Estudios en plantas y su fisiología.' },
        { Nombre: 'Ingeniería en Agricultura', Descripcion: 'Estudios en producción y gestión agrícola.' },
        { Nombre: 'Ingeniería en Silvicultura', Descripcion: 'Estudios en gestión y conservación de bosques.' },
        { Nombre: 'Ingeniería en Pesca', Descripcion: 'Estudios en gestión y explotación de recursos pesqueros.' },
        { Nombre: 'Ingeniería en Acuicultura', Descripcion: 'Estudios en cultivo y producción de organismos acuáticos.' },
        { Nombre: 'Ingeniería en Recursos Hídricos', Descripcion: 'Gestión y estudio de recursos de agua.' },
        { Nombre: 'Ingeniería en Energía Solar', Descripcion: 'Desarrollo y aplicación de tecnologías solares.' },
        { Nombre: 'Ingeniería en Energía Eólica', Descripcion: 'Desarrollo y aplicación de tecnologías eólicas.' },
        { Nombre: 'Ingeniería en Energía Geotérmica', Descripcion: 'Desarrollo y aplicación de tecnologías geotérmicas.' },
        { Nombre: 'Ingeniería en Energía Hidráulica', Descripcion: 'Desarrollo y aplicación de tecnologías hidráulicas.' },
        { Nombre: 'Ingeniería en Energía Nuclear', Descripcion: 'Estudios en generación y aplicación de energía nuclear.' },
      ],
      skipDuplicates: true,
    });

    console.log('100 Planes de Estudio creados con éxito');



    //******************************************************************* MATERIAS Y PLANES ******************************************************/

    await prisma.materia.createMany({
      data: [
        { Nombre: 'Matemáticas Aplicadas', Codigo: 'MAT101', Creditos: 4 },
        { Nombre: 'Física General', Codigo: 'FIS102', Creditos: 3 },
        { Nombre: 'Química Orgánica', Codigo: 'QUI103', Creditos: 4 },
        { Nombre: 'Biología Celular', Codigo: 'BIO104', Creditos: 3 },
        { Nombre: 'Introducción a la Programación', Codigo: 'INF105', Creditos: 4 },
        { Nombre: 'Estructuras de Datos', Codigo: 'INF106', Creditos: 5 },
        { Nombre: 'Bases de Datos', Codigo: 'INF107', Creditos: 4 },
        { Nombre: 'Redes de Computadoras', Codigo: 'INF108', Creditos: 4 },
        { Nombre: 'Sistemas Operativos', Codigo: 'INF109', Creditos: 5 },
        { Nombre: 'Inteligencia Artificial', Codigo: 'INF110', Creditos: 4 },
        { Nombre: 'Cálculo Diferencial', Codigo: 'MAT111', Creditos: 4 },
        { Nombre: 'Cálculo Integral', Codigo: 'MAT112', Creditos: 4 },
        { Nombre: 'Álgebra Lineal', Codigo: 'MAT113', Creditos: 3 },
        { Nombre: 'Probabilidad y Estadística', Codigo: 'MAT114', Creditos: 4 },
        { Nombre: 'Microeconomía', Codigo: 'ECO115', Creditos: 3 },
        { Nombre: 'Macroeconomía', Codigo: 'ECO116', Creditos: 3 },
        { Nombre: 'Derecho Empresarial', Codigo: 'DER117', Creditos: 3 },
        { Nombre: 'Contabilidad Financiera', Codigo: 'CON118', Creditos: 3 },
        { Nombre: 'Marketing Digital', Codigo: 'MKT119', Creditos: 3 },
        { Nombre: 'Administración de Empresas', Codigo: 'ADM120', Creditos: 4 },
        { Nombre: 'Ingeniería de Software', Codigo: 'INF121', Creditos: 5 },
        { Nombre: 'Macroeconomía 2', Codigo: 'ECO1163', Creditos: 3 },
        { Nombre: 'Derecho Empresarial 2', Codigo: 'DER1172', Creditos: 3 },
        { Nombre: 'Contabilidad Financiera 2', Codigo: 'CON1182', Creditos: 3 },
        { Nombre: 'Marketing Digital 2', Codigo: 'MKT1192', Creditos: 3 },
        { Nombre: 'Administración de Empresas 2', Codigo: 'ADM1202', Creditos: 4 },
        { Nombre: 'Ingeniería de Software 2', Codigo: 'INF1212', Creditos: 5 },
        { Nombre: 'Desarrollo Web', Codigo: 'INF122', Creditos: 4 },
        { Nombre: 'Desarrollo de Apps Móviles', Codigo: 'INF123', Creditos: 4 },
        { Nombre: 'Ciberseguridad', Codigo: 'INF124', Creditos: 5 },
        { Nombre: 'Ética Profesional', Codigo: 'ETI125', Creditos: 2 },
        { Nombre: 'Historia del Arte', Codigo: 'ART126', Creditos: 3 },
        { Nombre: 'Psicología General', Codigo: 'PSI127', Creditos: 3 },
        { Nombre: 'Filosofía Moderna', Codigo: 'FIL128', Creditos: 3 },
        { Nombre: 'Metodología de la Investigación', Codigo: 'MET129', Creditos: 3 },
        { Nombre: 'Energías Renovables', Codigo: 'ENE130', Creditos: 4 },
        { Nombre: 'Gestión de Proyectos', Codigo: 'PRO131', Creditos: 4 },
        { Nombre: 'Arquitectura de Computadores', Codigo: 'INF132', Creditos: 5 },
        { Nombre: 'Desarrollo de Videojuegos', Codigo: 'INF133', Creditos: 4 },
        { Nombre: 'Ingeniería de Requisitos', Codigo: 'INF134', Creditos: 4 },
        { Nombre: 'Big Data y Análisis de Datos', Codigo: 'INF135', Creditos: 5 },
        { Nombre: 'Blockchain y Criptomonedas', Codigo: 'INF136', Creditos: 4 },
        { Nombre: 'Gestión de Infraestructura IT', Codigo: 'INF137', Creditos: 4 },
        { Nombre: 'Automatización de Procesos', Codigo: 'INF138', Creditos: 4 },
        { Nombre: 'Diseño UX/UI', Codigo: 'DIS139', Creditos: 3 },
        { Nombre: 'Robótica', Codigo: 'ROB140', Creditos: 5 },
        { Nombre: 'Nanotecnología', Codigo: 'NAN141', Creditos: 4 },
        { Nombre: 'Biotecnología', Codigo: 'BIO142', Creditos: 4 },
        { Nombre: 'Gestión de la Calidad', Codigo: 'CAL143', Creditos: 3 },
        { Nombre: 'Producción Audiovisual', Codigo: 'AUD144', Creditos: 3 },
        { Nombre: 'Fotografía Profesional', Codigo: 'FOT145', Creditos: 2 },
        { Nombre: 'Dibujo Técnico', Codigo: 'DIB146', Creditos: 3 },
        { Nombre: 'Análisis de Algoritmos', Codigo: 'INF147', Creditos: 4 },
        { Nombre: 'Teoría de la Computación', Codigo: 'INF148', Creditos: 4 },
        { Nombre: 'Bioquímica', Codigo: 'BIO149', Creditos: 4 },
        { Nombre: 'Mecánica Cuántica', Codigo: 'FIS150', Creditos: 5 },
        { Nombre: 'Ecología', Codigo: 'BIO151', Creditos: 3 },
        { Nombre: 'Meteorología', Codigo: 'CLI152', Creditos: 3 },
        { Nombre: 'Neurociencia', Codigo: 'NEU153', Creditos: 4 },
        { Nombre: 'Astronomía', Codigo: 'AST154', Creditos: 4 },
        { Nombre: 'Geofísica', Codigo: 'GEO155', Creditos: 4 },
        { Nombre: 'Antropología', Codigo: 'ANT156', Creditos: 3 },
        { Nombre: 'Lingüística', Codigo: 'LIN157', Creditos: 3 },
        { Nombre: 'Derecho Penal', Codigo: 'DER158', Creditos: 3 },
        { Nombre: 'Nutrición', Codigo: 'NUT159', Creditos: 3 },
        { Nombre: 'Kinesiología', Codigo: 'KIN160', Creditos: 4 },
        { Nombre: 'Turismo Sostenible', Codigo: 'TUR161', Creditos: 3 },
        { Nombre: 'Ingeniería Ambiental', Codigo: 'AMB162', Creditos: 4 },
        { Nombre: 'Derecho Internacional', Codigo: 'DER163', Creditos: 3 },
        { Nombre: 'Psicología del Desarrollo', Codigo: 'PSI164', Creditos: 3 },
        { Nombre: 'Historia Contemporánea', Codigo: 'HIS165', Creditos: 3 },
        { Nombre: 'Geografía Humana', Codigo: 'GEO166', Creditos: 3 },
        { Nombre: 'Sociología', Codigo: 'SOC167', Creditos: 3 },
        { Nombre: 'Antropología Cultural', Codigo: 'ANT168', Creditos: 3 },
        { Nombre: 'Literatura Universal', Codigo: 'LIT169', Creditos: 3 },
        { Nombre: 'Historia de la Música', Codigo: 'MUS170', Creditos: 3 },
        { Nombre: 'Teoría Política', Codigo: 'POL171', Creditos: 3 },
        { Nombre: 'Derecho Constitucional', Codigo: 'DER172', Creditos: 3 },
        { Nombre: 'Derecho Civil', Codigo: 'DER173', Creditos: 3 },
        { Nombre: 'Derecho Laboral', Codigo: 'DER174', Creditos: 3 },
        { Nombre: 'Derecho Administrativo', Codigo: 'DER175', Creditos: 3 },
        { Nombre: 'Derecho Comercial', Codigo: 'DER176', Creditos: 3 },
        { Nombre: 'Derecho Tributario', Codigo: 'DER177', Creditos: 3 },
        { Nombre: 'Derecho de Familia', Codigo: 'DER178', Creditos: 3 },
        { Nombre: 'Derecho de Propiedad Intelectual', Codigo: 'DER179', Creditos: 3 },
        { Nombre: 'Derecho de la Competencia', Codigo: 'DER180', Creditos: 3 },
        { Nombre: 'Derecho de la Seguridad Social', Codigo: 'DER181', Creditos: 3 },
        { Nombre: 'Derecho de la Salud', Codigo: 'DER182', Creditos: 3 },
        { Nombre: 'Derecho de la Educación', Codigo: 'DER183', Creditos: 3 },
        { Nombre: 'Derecho de la Energía', Codigo: 'DER184', Creditos: 3 },
        { Nombre: 'Derecho de la Tecnología', Codigo: 'DER185', Creditos: 3 },
        { Nombre: 'Derecho de la Información', Codigo: 'DER186', Creditos: 3 },
        { Nombre: 'Derecho de la Comunicación', Codigo: 'DER187', Creditos: 3 },
        { Nombre: 'Derecho de la Propiedad', Codigo: 'DER188', Creditos: 3 },
        { Nombre: 'Derecho de la Responsabilidad Civil', Codigo: 'DER189', Creditos: 3 },
        { Nombre: 'Derecho de la Contratación', Codigo: 'DER190', Creditos: 3 },
        { Nombre: 'Derecho de la Empresa', Codigo: 'DER191', Creditos: 3 },
        { Nombre: 'Derecho de la Insolvencia', Codigo: 'DER192', Creditos: 3 },
        { Nombre: 'Derecho de la Competencia Desleal', Codigo: 'DER193', Creditos: 3 },
        { Nombre: 'Derecho de la Protección al Consumidor', Codigo: 'DER194', Creditos: 3 },
        { Nombre: 'Derecho de la Propiedad Industrial', Codigo: 'DER195', Creditos: 3 },
        { Nombre: 'Derecho de la Propiedad Intelectual', Codigo: 'DER196', Creditos: 3 },
        { Nombre: 'Derecho de la Propiedad Inmobiliaria', Codigo: 'DER197', Creditos: 3 },
        { Nombre: 'Derecho de la Propiedad Rural', Codigo: 'DER198', Creditos: 3 },
        { Nombre: 'Derecho de la Propiedad Urbana', Codigo: 'DER199', Creditos: 3 },
      ]
    });


    console.log('100 Materias creadas con éxito');


    // Consultar los Planes de Estudio y las Materias asociadas (actualizado después de crear las materias)
    const updatedPlanesEstudio = await prisma.planEstudio.findMany({
      include: {
        Materias: true,  // Incluir las materias asociadas a cada Plan de Estudio
      },
    });

    // Mostrar en la terminal los Planes de Estudio y sus respectivas materias
    console.log('\nPlanes de Estudio con sus Materias:');
    for (const plan of updatedPlanesEstudio) {
      console.log(`\nPlan de Estudio: ${plan.Nombre}`);
      console.log(`Descripción: ${plan.Descripcion}`);
      console.log('Materias:');
      plan.Materias.forEach((materia) => {
        console.log(`- ${materia.Nombre} (${materia.Codigo})`);
      });
    }

    console.log('\n100 Materias creadas con éxito');



    //*********************************************************** PERIODOS ********************************************************************/

    const cuatrimestres = ["I Cuatrimestre", "II Cuatrimestre", "III Cuatrimestre"];
    const anioInicio = new Date().getFullYear() - 2;
    const anioFin = 2070;
    const periodos = [];

    for (let anio = anioInicio; anio <= anioFin; anio++) {
      for (const cuatrimestre of cuatrimestres) {
        periodos.push({
          Nombre: `${cuatrimestre} ${anio}`
        });
      }
    }

    try {
      await prisma.periodoAcademico.createMany({
        data: periodos,
        skipDuplicates: true, // Evita duplicados si el script se ejecuta varias veces
      });

      console.log("✅ Periodos académicos creados correctamente.");
    } catch (error) {
      console.error("❌ Error al crear períodos académicos:", error);
    } finally {
      await prisma.$disconnect();
    }

    //***********************************************************HORARIOS ********************************************************************/

    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const turnos = [
      { inicio: "08:00", fin: "12:00" },
      { inicio: "13:00", fin: "17:00" },
      { inicio: "18:00", fin: "22:00" }
    ];

    const horarios = dias.flatMap((dia) =>
      turnos.map((turno) => ({
      Nombre: `${dia} - ${turno.inicio} a ${turno.fin}`,
      Dia: dia,
      HoraInicio: new Date(`1970-01-01T${turno.inicio}:00`),
      HoraFin: new Date(`1970-01-01T${turno.fin}:00`),
      }))
    );

    // Insertar los horarios en la base de datos
    await prisma.horario.createMany({
      data: horarios,
      skipDuplicates: true, // Evita insertar duplicados
    });

    console.log("✅ Horarios creados exitosamente");
    console.log(horarios);


    //*********************************************************** CURSOS ********************************************************************/

    // Obtener los datos existentes
    const docentesLista = await prisma.docente.findMany(); // Obtener todos los docentes
    const horariosLista = await prisma.horario.findMany(); // Obtener todos los horarios
    
    const materias = await prisma.materia.findMany(); // Obtener todas las materias

    if (docentesLista.length === 0 || horariosLista.length === 0 || materias.length === 0) {
      console.error("❌ Faltan datos para crear cursos (Docentes, Horarios, Ofertas académicas, Materias).");
      return;
    }

    const cursosData = [];
    const aulasOcupadas = new Map(); // Mapa de aulas ocupadas por cada horario (clave: `${aula}-${horaInicio}`, valor: true)

    // Creamos 100 cursos
    for (let i = 0; i < 150; i++) {
      const docenteAleatorio = docentesLista[Math.floor(Math.random() * docentesLista.length)];
      const materiaAleatoria = materias[Math.floor(Math.random() * materias.length)];

      // Generar aula aleatoria entre A1-A20
      const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
      const numeroAleatorio = Math.floor(Math.random() * 50) + 1;
      const aulaAleatoria = `${letraAleatoria}${numeroAleatorio}`;

      // Asignar un horario aleatorio
      const horarioAleatorio = horariosLista[Math.floor(Math.random() * horariosLista.length)];

      // Combinación única de aula y hora de inicio
      const key = `${aulaAleatoria}-${horarioAleatorio.HoraInicio}`;

      // Verificar si la combinación de aula y hora está ocupada
      if (!aulasOcupadas.has(key)) {
        // Si no está ocupada, podemos asignar este horario a la clase
        aulasOcupadas.set(key, true); // Marcamos como ocupada esta combinación de aula y hora

        cursosData.push({
          MateriaId: materiaAleatoria.MateriaId,
          DocenteId: docenteAleatorio.DocenteId,
          OfertaAcademicaId: null,
          Cupo: Math.floor(Math.random() * 5) + 20, // Entre 20 y 25 cupos
          Aula: aulaAleatoria,
          HorarioId: horarioAleatorio.HorarioId, // Asignamos el ID del horario
        });
      } else {
        // Si ya está ocupada, omitimos este curso (no lo agregamos a la lista)
        console.log(`⚠️ El horario ${horarioAleatorio.HoraInicio} en la ${aulaAleatoria} ya está ocupado. Saltando curso.`);
      }
    }

    // Insertar los cursos válidos en la base de datos
    if (cursosData.length > 0) {
      await prisma.curso.createMany({
        data: cursosData,
        skipDuplicates: true, // Evitar duplicados
      });

      console.log(`✅ ${cursosData.length} cursos creados con horarios aleatorios, docentes y oferta asignados.`);
    } else {
      console.log("❌ No se crearon cursos debido a conflictos con horarios y aulas.");
    }

    //*********************************************************** OFERTA ACADEMICA ********************************************************************/

    const periodosLista = await prisma.periodoAcademico.findMany({
      select: { PeriodoAcademicoId: true }
    });
    
    if (periodosLista.length === 0) {
      console.error("❌ No hay períodos académicos creados. Primero ejecuta el script de períodos.");
      return;
    }
    
    const cursosTotales = await prisma.curso.findMany({
      select: { CursoId: true, OfertaAcademicaId: true }
    });
    
    if (cursosTotales.length === 0) {
      console.error("❌ No hay cursos creados. Primero ejecuta el script de cursos.");
      return;
    }
    
    for (const periodo of periodosLista) {
      // Crear la oferta
      const oferta = await prisma.ofertaAcademica.create({
        data: {
          PeriodoAcademicoId: periodo.PeriodoAcademicoId,
        },
      });
    
      // Buscar cursos no asignados aún
      const cursosDisponibles = cursosTotales.filter(c => !c.OfertaAcademicaId);
      const cursosAleatorios = cursosDisponibles.sort(() => 0.5 - Math.random()).slice(0, 6);
    
      if (cursosAleatorios.length < 6) {
        console.warn(`⚠️ Solo hay ${cursosAleatorios.length} cursos disponibles para asignar a la oferta del periodo ${periodo.PeriodoAcademicoId}`);
      }
    
      for (const curso of cursosAleatorios) {
        await prisma.curso.update({
          where: { CursoId: curso.CursoId },
          data: { OfertaAcademicaId: oferta.OfertaAcademicaId },
        });
    
        // Actualiza la lista local para no reasignar el curso
        curso.OfertaAcademicaId = oferta.OfertaAcademicaId;
      }
    }
    
    // Verificación final
    const ofertas = await prisma.ofertaAcademica.findMany({
      include: {
        Cursos: true,
        PeriodoAcademico: true,
      },
    });
    
    for (const oferta of ofertas) {
      if (oferta.Cursos.length < 6) {
        console.warn(`⚠️ La oferta del periodo ${oferta.PeriodoAcademico.Nombre ?? oferta.PeriodoAcademicoId} solo tiene ${oferta.Cursos.length} cursos.`);
      } else {
        console.log(`✔️ Oferta del periodo ${oferta.PeriodoAcademico.Nombre ?? oferta.PeriodoAcademicoId} tiene ${oferta.Cursos.length} cursos asignados.`);
      }
    }
    

    //*********************************************************** MATRICULAS ********************************************************************/


    const estudiantesLista = await prisma.estudiante.findMany();
    const cursos = await prisma.curso.findMany();

    if (estudiantesLista.length === 0 || cursos.length === 0) {
      console.log("Debe haber al menos un estudiante y un curso en la base de datos.");
      return;
    }

    let matriculas = [];
    for (let i = 0; i < 100; i++) {
      const estudiante = estudiantesLista[Math.floor(Math.random() * estudiantesLista.length)];
      const curso = cursos[Math.floor(Math.random() * cursos.length)];

      matriculas.push({
        EstudianteId: estudiante.EstudianteId,
        CursoId: curso.CursoId,
        Tipo: TipoMatricula.Matriculado,
      });
    }

    await prisma.matricula.createMany({
      data: matriculas,
      skipDuplicates: true, // Evita duplicados si ya existen
    });

    console.log("100 matrículas creadas exitosamente.");

  }

  seed()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });



}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

