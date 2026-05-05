/*
  Warnings:

  - You are about to drop the column `trajanje` on the `obrazovniprofil` table. All the data in the column will be lost.
  - Added the required column `trajanje` to the `Smer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `obrazovniprofil` DROP COLUMN `trajanje`;

-- AlterTable
ALTER TABLE `smer` ADD COLUMN `trajanje` INTEGER NOT NULL;
