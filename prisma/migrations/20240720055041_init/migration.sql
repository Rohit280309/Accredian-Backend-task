/*
  Warnings:

  - You are about to drop the column `email` on the `referral` table. All the data in the column will be lost.
  - You are about to drop the column `referredId` on the `referral` table. All the data in the column will be lost.
  - You are about to drop the column `referrerId` on the `referral` table. All the data in the column will be lost.
  - Added the required column `referredEmail` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referrerEmail` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `referral` DROP FOREIGN KEY `Referral_referredId_fkey`;

-- DropForeignKey
ALTER TABLE `referral` DROP FOREIGN KEY `Referral_referrerId_fkey`;

-- AlterTable
ALTER TABLE `referral` DROP COLUMN `email`,
    DROP COLUMN `referredId`,
    DROP COLUMN `referrerId`,
    ADD COLUMN `referredEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `referrerEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referrerEmail_fkey` FOREIGN KEY (`referrerEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referredEmail_fkey` FOREIGN KEY (`referredEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
