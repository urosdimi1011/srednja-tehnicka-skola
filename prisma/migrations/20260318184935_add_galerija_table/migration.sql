-- CreateTable
CREATE TABLE `galerija_album` (
    `id` VARCHAR(191) NOT NULL,
    `naziv` VARCHAR(191) NOT NULL,
    `opis` TEXT NULL,
    `kategorija` VARCHAR(191) NOT NULL DEFAULT 'Остало',
    `coverSlika` VARCHAR(191) NULL,
    `vidljiv` BOOLEAN NOT NULL DEFAULT true,
    `redosled` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `galerija_slika` (
    `id` VARCHAR(191) NOT NULL,
    `albumId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `naziv` VARCHAR(191) NULL,
    `redosled` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `galerija_slika` ADD CONSTRAINT `galerija_slika_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `galerija_album`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
