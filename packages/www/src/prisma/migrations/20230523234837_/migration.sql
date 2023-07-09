-- AlterTable
ALTER TABLE "NhlTeamInSeries" ADD COLUMN     "seriesLosses" INTEGER DEFAULT 0,
ADD COLUMN     "seriesWins" INTEGER DEFAULT 0;
