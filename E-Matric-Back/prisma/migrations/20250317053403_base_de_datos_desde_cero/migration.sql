-- CreateTable
CREATE TABLE `Materia` (
    `MateriaId` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Codigo` VARCHAR(191) NOT NULL,
    `Creditos` INTEGER NOT NULL,
    `CreadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Materia_Nombre_key`(`Nombre`),
    UNIQUE INDEX `Materia_Codigo_key`(`Codigo`),
    PRIMARY KEY (`MateriaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanEstudio` (
    `PlanEstudioId` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,
    `CreadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `PlanEstudio_Nombre_key`(`Nombre`),
    PRIMARY KEY (`PlanEstudioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carrera` (
    `CarreraId` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Codigo` VARCHAR(191) NOT NULL,
    `CreadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Carrera_Nombre_key`(`Nombre`),
    PRIMARY KEY (`CarreraId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `CursoId` INTEGER NOT NULL AUTO_INCREMENT,
    `MateriaId` INTEGER NOT NULL,
    `DocenteId` INTEGER NULL,
    `Cupo` INTEGER NOT NULL,
    `Aula` VARCHAR(191) NOT NULL,
    `HorarioId` INTEGER NULL,
    `CreadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`CursoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OfertaAcademica` (
    `OfertaAcademicaId` INTEGER NOT NULL AUTO_INCREMENT,
    `PeriodoAcademicoId` INTEGER NOT NULL,
    `CarreraId` INTEGER NULL,
    `CreadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`OfertaAcademicaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CursoOfertaAcademica` (
    `CursoId` INTEGER NOT NULL,
    `OfertaAcademicaId` INTEGER NOT NULL,

    PRIMARY KEY (`CursoId`, `OfertaAcademicaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horario` (
    `HorarioId` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Dia` VARCHAR(191) NOT NULL,
    `HoraInicio` TIME NOT NULL,
    `HoraFin` TIME NOT NULL,
    `CreadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`HorarioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PeriodoAcademico` (
    `PeriodoAcademicoId` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `CreadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`PeriodoAcademicoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matricula` (
    `MatriculaId` INTEGER NOT NULL AUTO_INCREMENT,
    `EstudianteId` INTEGER NULL,
    `CursoId` INTEGER NULL,
    `Tipo` ENUM('Matriculado', 'Activo', 'Retirado', 'Finalizado') NOT NULL DEFAULT 'Matriculado',
    `FechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`MatriculaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoricoAcademico` (
    `HistoricoAcademicoId` INTEGER NOT NULL AUTO_INCREMENT,
    `EstudianteId` INTEGER NULL,
    `CursoId` INTEGER NULL,
    `Nota` DOUBLE NOT NULL,
    `CreadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`HistoricoAcademicoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auditoria` (
    `AuditoriaId` INTEGER NOT NULL AUTO_INCREMENT,
    `Accion` VARCHAR(191) NOT NULL,
    `UsuarioId` INTEGER NOT NULL,
    `Fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CreadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`AuditoriaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `UsuarioId` INTEGER NOT NULL AUTO_INCREMENT,
    `Identificacion` VARCHAR(191) NOT NULL,
    `Login` VARCHAR(191) NOT NULL,
    `Contrasena` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Rol` ENUM('Administrador', 'Colaborador', 'Usuario') NOT NULL,
    `CreadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Usuario_Identificacion_key`(`Identificacion`),
    UNIQUE INDEX `Usuario_Email_key`(`Email`),
    PRIMARY KEY (`UsuarioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estudiante` (
    `EstudianteId` INTEGER NOT NULL AUTO_INCREMENT,
    `Identificacion` VARCHAR(191) NOT NULL,
    `Nombre` VARCHAR(191) NOT NULL,
    `Apellido1` VARCHAR(191) NOT NULL,
    `Apellido2` VARCHAR(191) NOT NULL,
    `Correo` VARCHAR(191) NOT NULL,
    `Direccion` VARCHAR(191) NOT NULL,
    `Telefono` VARCHAR(191) NOT NULL,
    `CreadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Estudiante_Identificacion_key`(`Identificacion`),
    UNIQUE INDEX `Estudiante_Correo_key`(`Correo`),
    UNIQUE INDEX `Estudiante_Telefono_key`(`Telefono`),
    PRIMARY KEY (`EstudianteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Docente` (
    `DocenteId` INTEGER NOT NULL AUTO_INCREMENT,
    `Identificacion` VARCHAR(191) NOT NULL,
    `Nombre` VARCHAR(191) NOT NULL,
    `Apellido1` VARCHAR(191) NOT NULL,
    `Apellido2` VARCHAR(191) NOT NULL,
    `Correo` VARCHAR(191) NOT NULL,
    `Direccion` VARCHAR(191) NOT NULL,
    `Telefono` VARCHAR(191) NOT NULL,
    `CreadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Docente_Identificacion_key`(`Identificacion`),
    UNIQUE INDEX `Docente_Correo_key`(`Correo`),
    UNIQUE INDEX `Docente_Telefono_key`(`Telefono`),
    PRIMARY KEY (`DocenteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provincias` (
    `ProvinciaId` INTEGER NOT NULL AUTO_INCREMENT,
    `Provincia` VARCHAR(191) NOT NULL,
    `FechaDeCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`ProvinciaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cantones` (
    `CantonId` INTEGER NOT NULL AUTO_INCREMENT,
    `Canton` VARCHAR(191) NOT NULL,
    `ProvinciaId` INTEGER NULL,
    `FechaDeCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`CantonId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Distritos` (
    `DistritoId` INTEGER NOT NULL AUTO_INCREMENT,
    `Distrito` VARCHAR(191) NOT NULL,
    `CantonId` INTEGER NULL,
    `FechaDeCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ActualizadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Valoracion` ENUM('Excelente', 'Bueno', 'Regular') NOT NULL DEFAULT 'Bueno',
    `Estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`DistritoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MateriasEnPlan` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MateriasEnPlan_AB_unique`(`A`, `B`),
    INDEX `_MateriasEnPlan_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Historico` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Historico_AB_unique`(`A`, `B`),
    INDEX `_Historico_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CursoOfertaAcademica` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CursoOfertaAcademica_AB_unique`(`A`, `B`),
    INDEX `_CursoOfertaAcademica_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_MateriaId_fkey` FOREIGN KEY (`MateriaId`) REFERENCES `Materia`(`MateriaId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_DocenteId_fkey` FOREIGN KEY (`DocenteId`) REFERENCES `Docente`(`DocenteId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OfertaAcademica` ADD CONSTRAINT `OfertaAcademica_PeriodoAcademicoId_fkey` FOREIGN KEY (`PeriodoAcademicoId`) REFERENCES `PeriodoAcademico`(`PeriodoAcademicoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CursoOfertaAcademica` ADD CONSTRAINT `CursoOfertaAcademica_CursoId_fkey` FOREIGN KEY (`CursoId`) REFERENCES `Curso`(`CursoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CursoOfertaAcademica` ADD CONSTRAINT `CursoOfertaAcademica_OfertaAcademicaId_fkey` FOREIGN KEY (`OfertaAcademicaId`) REFERENCES `OfertaAcademica`(`OfertaAcademicaId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_CursoId_fkey` FOREIGN KEY (`CursoId`) REFERENCES `Curso`(`CursoId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoricoAcademico` ADD CONSTRAINT `HistoricoAcademico_EstudianteId_fkey` FOREIGN KEY (`EstudianteId`) REFERENCES `Estudiante`(`EstudianteId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoricoAcademico` ADD CONSTRAINT `HistoricoAcademico_CursoId_fkey` FOREIGN KEY (`CursoId`) REFERENCES `Curso`(`CursoId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Auditoria` ADD CONSTRAINT `Auditoria_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cantones` ADD CONSTRAINT `Cantones_ProvinciaId_fkey` FOREIGN KEY (`ProvinciaId`) REFERENCES `Provincias`(`ProvinciaId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Distritos` ADD CONSTRAINT `Distritos_CantonId_fkey` FOREIGN KEY (`CantonId`) REFERENCES `Cantones`(`CantonId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MateriasEnPlan` ADD CONSTRAINT `_MateriasEnPlan_A_fkey` FOREIGN KEY (`A`) REFERENCES `Materia`(`MateriaId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MateriasEnPlan` ADD CONSTRAINT `_MateriasEnPlan_B_fkey` FOREIGN KEY (`B`) REFERENCES `PlanEstudio`(`PlanEstudioId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Historico` ADD CONSTRAINT `_Historico_A_fkey` FOREIGN KEY (`A`) REFERENCES `Curso`(`CursoId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Historico` ADD CONSTRAINT `_Historico_B_fkey` FOREIGN KEY (`B`) REFERENCES `HistoricoAcademico`(`HistoricoAcademicoId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CursoOfertaAcademica` ADD CONSTRAINT `_CursoOfertaAcademica_A_fkey` FOREIGN KEY (`A`) REFERENCES `Curso`(`CursoId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CursoOfertaAcademica` ADD CONSTRAINT `_CursoOfertaAcademica_B_fkey` FOREIGN KEY (`B`) REFERENCES `OfertaAcademica`(`OfertaAcademicaId`) ON DELETE CASCADE ON UPDATE CASCADE;
