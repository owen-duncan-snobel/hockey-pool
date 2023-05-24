/*
  Warnings:

  - You are about to drop the column `winningTeamId` on the `NhlSeries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NhlSeries" DROP COLUMN "winningTeamId";

-- AlterTable
ALTER TABLE "NhlTeamInSeries" ADD COLUMN     "winner" BOOLEAN;
