-- CreateTable
CREATE TABLE `ObrazovniProfil` (
    `id` VARCHAR(191) NOT NULL,
    `naziv` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `trajanje` VARCHAR(191) NOT NULL,
    `vrsta` ENUM('STRUCNO', 'GIMNAZIJA', 'UMETNICKO', 'SPORTSKO', 'JEZICKO') NOT NULL,
    `opis` VARCHAR(191) NOT NULL,
    `tags` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ObrazovniProfil_naziv_key`(`naziv`),
    UNIQUE INDEX `ObrazovniProfil_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Smer` (
    `id` VARCHAR(191) NOT NULL,
    `naziv` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `obrazovniProfilId` VARCHAR(191) NOT NULL,
    `opsteInformacije` TEXT NOT NULL,
    `ciljevi` TEXT NOT NULL,
    `poslovnaProhodnost` TEXT NOT NULL,
    `obrazovnaProhodnost` TEXT NOT NULL,
    `nastavniPlanProgram` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Smer_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Slika` (
    `id` VARCHAR(191) NOT NULL,
    `smerId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `naziv` VARCHAR(191) NULL,
    `redosled` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Smer` ADD CONSTRAINT `Smer_obrazovniProfilId_fkey` FOREIGN KEY (`obrazovniProfilId`) REFERENCES `ObrazovniProfil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Slika` ADD CONSTRAINT `Slika_smerId_fkey` FOREIGN KEY (`smerId`) REFERENCES `Smer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
