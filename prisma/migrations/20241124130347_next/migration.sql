/*
  Warnings:

  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_couponId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_productId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_userId_fkey";

-- DropTable
DROP TABLE "Log";
