/*
  Warnings:

  - You are about to drop the `NHLBracketPick` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NHLConference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NHLDivision` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NHLFranchise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NHLSeries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NHLTeam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NHLTeamInSeries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NHLBracketPick" DROP CONSTRAINT "NHLBracketPick_teamId_round_season_seriesCode_fkey";

-- DropForeignKey
ALTER TABLE "NHLBracketPick" DROP CONSTRAINT "NHLBracketPick_userId_fkey";

-- DropForeignKey
ALTER TABLE "NHLDivision" DROP CONSTRAINT "NHLDivision_conferenceId_fkey";

-- DropForeignKey
ALTER TABLE "NHLFranchise" DROP CONSTRAINT "NHLFranchise_mostRecentTeamId_fkey";

-- DropForeignKey
ALTER TABLE "NHLTeam" DROP CONSTRAINT "NHLTeam_conferenceId_fkey";

-- DropForeignKey
ALTER TABLE "NHLTeam" DROP CONSTRAINT "NHLTeam_divisionId_fkey";

-- DropForeignKey
ALTER TABLE "NHLTeamInSeries" DROP CONSTRAINT "NHLTeamInSeries_round_season_seriesCode_fkey";

-- DropForeignKey
ALTER TABLE "NHLTeamInSeries" DROP CONSTRAINT "NHLTeamInSeries_teamId_fkey";

-- DropTable
DROP TABLE "NHLBracketPick";

-- DropTable
DROP TABLE "NHLConference";

-- DropTable
DROP TABLE "NHLDivision";

-- DropTable
DROP TABLE "NHLFranchise";

-- DropTable
DROP TABLE "NHLSeries";

-- DropTable
DROP TABLE "NHLTeam";

-- DropTable
DROP TABLE "NHLTeamInSeries";

-- CreateTable
CREATE TABLE "NhlBracketPick" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "round" INTEGER NOT NULL,
    "season" TEXT NOT NULL,
    "seriesCode" TEXT NOT NULL,

    CONSTRAINT "NhlBracketPick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NhlTeam" (
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

    CONSTRAINT "NhlTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NhlConference" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "NhlConference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NhlDivision" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nameShort" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "conferenceId" INTEGER NOT NULL,

    CONSTRAINT "NhlDivision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NhlFranchise" (
    "id" INTEGER NOT NULL,
    "firstSeasonId" INTEGER NOT NULL,
    "lastSeasonId" INTEGER,
    "mostRecentTeamId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "NhlFranchise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NhlSeries" (
    "round" INTEGER NOT NULL,
    "season" TEXT NOT NULL,
    "seriesCode" TEXT NOT NULL,

    CONSTRAINT "NhlSeries_pkey" PRIMARY KEY ("season","round","seriesCode")
);

-- CreateTable
CREATE TABLE "NhlTeamInSeries" (
    "teamId" INTEGER NOT NULL,
    "round" INTEGER NOT NULL,
    "season" TEXT NOT NULL,
    "seriesCode" TEXT NOT NULL,

    CONSTRAINT "NhlTeamInSeries_pkey" PRIMARY KEY ("teamId","round","season","seriesCode")
);

-- CreateIndex
CREATE UNIQUE INDEX "NhlFranchise_mostRecentTeamId_key" ON "NhlFranchise"("mostRecentTeamId");

-- AddForeignKey
ALTER TABLE "NhlBracketPick" ADD CONSTRAINT "NhlBracketPick_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhlBracketPick" ADD CONSTRAINT "NhlBracketPick_teamId_round_season_seriesCode_fkey" FOREIGN KEY ("teamId", "round", "season", "seriesCode") REFERENCES "NhlTeamInSeries"("teamId", "round", "season", "seriesCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhlTeam" ADD CONSTRAINT "NhlTeam_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "NhlConference"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhlTeam" ADD CONSTRAINT "NhlTeam_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "NhlDivision"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhlDivision" ADD CONSTRAINT "NhlDivision_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "NhlConference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhlFranchise" ADD CONSTRAINT "NhlFranchise_mostRecentTeamId_fkey" FOREIGN KEY ("mostRecentTeamId") REFERENCES "NhlTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhlTeamInSeries" ADD CONSTRAINT "NhlTeamInSeries_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "NhlTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhlTeamInSeries" ADD CONSTRAINT "NhlTeamInSeries_round_season_seriesCode_fkey" FOREIGN KEY ("round", "season", "seriesCode") REFERENCES "NhlSeries"("round", "season", "seriesCode") ON DELETE RESTRICT ON UPDATE CASCADE;
