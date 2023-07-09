/*
  Warnings:

  - You are about to drop the column `winner` on the `NhlTeamInSeries` table. All the data in the column will be lost.
  - Made the column `seriesLosses` on table `NhlTeamInSeries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seriesWins` on table `NhlTeamInSeries` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "NhlTeamInSeries" DROP COLUMN "winner",
ALTER COLUMN "seriesLosses" SET NOT NULL,
ALTER COLUMN "seriesWins" SET NOT NULL;
