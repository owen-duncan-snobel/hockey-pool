/*
  Warnings:

  - You are about to drop the column `winner` on the `NhlBracketPick` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NhlBracketPick" DROP COLUMN "winner";

-- AlterTable
ALTER TABLE "NhlSeries" ADD COLUMN     "winningTeamId" INTEGER;
