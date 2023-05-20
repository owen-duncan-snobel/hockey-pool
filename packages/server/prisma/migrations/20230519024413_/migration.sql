/*
  Warnings:

  - You are about to drop the `Conference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Division` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Franchise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Series` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamsInSeries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BracketPick" DROP CONSTRAINT "BracketPick_teamId_round_season_seriesCode_fkey";

-- DropForeignKey
ALTER TABLE "Division" DROP CONSTRAINT "Division_conferenceId_fkey";

-- DropForeignKey
ALTER TABLE "Franchise" DROP CONSTRAINT "Franchise_mostRecentTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_conferenceId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_divisionId_fkey";

-- DropForeignKey
ALTER TABLE "TeamsInSeries" DROP CONSTRAINT "TeamsInSeries_round_season_seriesCode_fkey";

-- DropForeignKey
ALTER TABLE "TeamsInSeries" DROP CONSTRAINT "TeamsInSeries_teamId_fkey";

-- DropTable
DROP TABLE "Conference";

-- DropTable
DROP TABLE "Division";

-- DropTable
DROP TABLE "Franchise";

-- DropTable
DROP TABLE "Series";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "TeamsInSeries";

-- CreateTable
CREATE TABLE "NHLTeam" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "conferenceId" INTEGER,
    "divisionId" INTEGER,
    "locationName" TEXT NOT NULL,
    "firstYearOfPlay" TEXT NOT NULL,
    "officialSiteUrl" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "logo" TEXT,

    CONSTRAINT "NHLTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NHLConference" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "NHLConference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NHLDivision" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nameShort" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "conferenceId" INTEGER NOT NULL,

    CONSTRAINT "NHLDivision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NHLFranchise" (
    "id" INTEGER NOT NULL,
    "firstSeasonId" INTEGER NOT NULL,
    "lastSeasonId" INTEGER,
    "mostRecentTeamId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "NHLFranchise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NHLSeries" (
    "round" INTEGER NOT NULL,
    "season" TEXT NOT NULL,
    "seriesCode" TEXT NOT NULL,

    CONSTRAINT "NHLSeries_pkey" PRIMARY KEY ("season","round","seriesCode")
);

-- CreateTable
CREATE TABLE "NHLTeamInSeries" (
    "teamId" INTEGER NOT NULL,
    "round" INTEGER NOT NULL,
    "season" TEXT NOT NULL,
    "seriesCode" TEXT NOT NULL,

    CONSTRAINT "NHLTeamInSeries_pkey" PRIMARY KEY ("teamId","round","season","seriesCode")
);

-- CreateIndex
CREATE UNIQUE INDEX "NHLFranchise_mostRecentTeamId_key" ON "NHLFranchise"("mostRecentTeamId");

-- AddForeignKey
ALTER TABLE "BracketPick" ADD CONSTRAINT "BracketPick_teamId_round_season_seriesCode_fkey" FOREIGN KEY ("teamId", "round", "season", "seriesCode") REFERENCES "NHLTeamInSeries"("teamId", "round", "season", "seriesCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NHLTeam" ADD CONSTRAINT "NHLTeam_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "NHLConference"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NHLTeam" ADD CONSTRAINT "NHLTeam_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "NHLDivision"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NHLDivision" ADD CONSTRAINT "NHLDivision_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "NHLConference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NHLFranchise" ADD CONSTRAINT "NHLFranchise_mostRecentTeamId_fkey" FOREIGN KEY ("mostRecentTeamId") REFERENCES "NHLTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NHLTeamInSeries" ADD CONSTRAINT "NHLTeamInSeries_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "NHLTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NHLTeamInSeries" ADD CONSTRAINT "NHLTeamInSeries_round_season_seriesCode_fkey" FOREIGN KEY ("round", "season", "seriesCode") REFERENCES "NHLSeries"("round", "season", "seriesCode") ON DELETE RESTRICT ON UPDATE CASCADE;
