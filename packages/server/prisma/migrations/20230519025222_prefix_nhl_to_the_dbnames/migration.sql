/*
  Warnings:

  - You are about to drop the `BracketPick` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BracketPick" DROP CONSTRAINT "BracketPick_teamId_round_season_seriesCode_fkey";

-- DropForeignKey
ALTER TABLE "BracketPick" DROP CONSTRAINT "BracketPick_userId_fkey";

-- DropTable
DROP TABLE "BracketPick";

-- CreateTable
CREATE TABLE "NHLBracketPick" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "round" INTEGER NOT NULL,
    "season" TEXT NOT NULL,
    "seriesCode" TEXT NOT NULL,

    CONSTRAINT "NHLBracketPick_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NHLBracketPick" ADD CONSTRAINT "NHLBracketPick_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NHLBracketPick" ADD CONSTRAINT "NHLBracketPick_teamId_round_season_seriesCode_fkey" FOREIGN KEY ("teamId", "round", "season", "seriesCode") REFERENCES "NHLTeamInSeries"("teamId", "round", "season", "seriesCode") ON DELETE RESTRICT ON UPDATE CASCADE;
