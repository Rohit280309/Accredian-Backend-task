/*
  Warnings:

  - You are about to alter the column `friendPhone` on the `referral` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `referral` MODIFY `friendPhone` INTEGER NULL;
