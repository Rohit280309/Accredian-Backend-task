/*
  Warnings:

  - The values [SIGNUP_COMPLETED] on the enum `Referral_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropForeignKey
ALTER TABLE `referral` DROP FOREIGN KEY `Referral_referredEmail_fkey`;

-- AlterTable
ALTER TABLE `referral` MODIFY `status` ENUM('PENDING', 'SENT', 'COMPLETED') NOT NULL;
