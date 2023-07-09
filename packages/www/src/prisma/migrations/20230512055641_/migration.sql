/*
  Warnings:

  - You are about to drop the `Playoff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Playoff";

-- CreateTable
CREATE TABLE "Series" (
    "round" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,
    "seriesCode" TEXT NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("season","round","seriesCode")
);

-- CreateTable
CREATE TABLE "TeamsInSeries" (
    "teamId" INTEGER NOT NULL,
    "round" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,
    "seriesCode" TEXT NOT NULL,

    CONSTRAINT "TeamsInSeries_pkey" PRIMARY KEY ("teamId","round","season","seriesCode")
);

-- AddForeignKey
ALTER TABLE "TeamsInSeries" ADD CONSTRAINT "TeamsInSeries_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamsInSeries" ADD CONSTRAINT "TeamsInSeries_round_season_seriesCode_fkey" FOREIGN KEY ("round", "season", "seriesCode") REFERENCES "Series"("round", "season", "seriesCode") ON DELETE RESTRICT ON UPDATE CASCADE;
