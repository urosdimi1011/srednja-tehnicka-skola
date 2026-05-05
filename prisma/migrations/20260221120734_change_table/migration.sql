/*
  Warnings:

  - You are about to alter the column `trajanje` on the `obrazovniprofil` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `obrazovniprofil` MODIFY `trajanje` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `smer` ADD COLUMN `glavnaSlika` VARCHAR(191) NULL,
    MODIFY `opsteInformacije` TEXT NULL,
    MODIFY `ciljevi` TEXT NULL,
    MODIFY `poslovnaProhodnost` TEXT NULL,
    MODIFY `obrazovnaProhodnost` TEXT NULL;
