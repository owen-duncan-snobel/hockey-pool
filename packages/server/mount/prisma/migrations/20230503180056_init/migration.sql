/*
  Warnings:

  - You are about to drop the column `venueId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `Venue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_venueId_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "venueId";

-- DropTable
DROP TABLE "Venue";
