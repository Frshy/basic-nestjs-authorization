/*
  Warnings:

  - You are about to drop the column `additionalInformations` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `additionalInformations`,
    ADD COLUMN `note` VARCHAR(191) NULL;
