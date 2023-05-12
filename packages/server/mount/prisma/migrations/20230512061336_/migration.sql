/*
  Warnings:

  - The primary key for the `Series` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TeamsInSeries` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "TeamsInSeries" DROP CONSTRAINT "TeamsInSeries_round_season_seriesCode_fkey";

-- AlterTable
ALTER TABLE "Series" DROP CONSTRAINT "Series_pkey",
ALTER COLUMN "season" SET DATA TYPE TEXT,
ADD CONSTRAINT "Series_pkey" PRIMARY KEY ("season", "round", "seriesCode");

-- AlterTable
ALTER TABLE "TeamsInSeries" DROP CONSTRAINT "TeamsInSeries_pkey",
ALTER COLUMN "season" SET DATA TYPE TEXT,
ADD CONSTRAINT "TeamsInSeries_pkey" PRIMARY KEY ("teamId", "round", "season", "seriesCode");

-- AddForeignKey
ALTER TABLE "TeamsInSeries" ADD CONSTRAINT "TeamsInSeries_round_season_seriesCode_fkey" FOREIGN KEY ("round", "season", "seriesCode") REFERENCES "Series"("round", "season", "seriesCode") ON DELETE RESTRICT ON UPDATE CASCADE;
