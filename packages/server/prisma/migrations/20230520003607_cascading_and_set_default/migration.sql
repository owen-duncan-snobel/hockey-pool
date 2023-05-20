-- DropForeignKey
ALTER TABLE "NhlBracketPick" DROP CONSTRAINT "NhlBracketPick_teamId_round_season_seriesCode_fkey";

-- DropForeignKey
ALTER TABLE "NhlDivision" DROP CONSTRAINT "NhlDivision_conferenceId_fkey";

-- DropForeignKey
ALTER TABLE "NhlFranchise" DROP CONSTRAINT "NhlFranchise_mostRecentTeamId_fkey";

-- DropForeignKey
ALTER TABLE "NhlTeam" DROP CONSTRAINT "NhlTeam_conferenceId_fkey";

-- DropForeignKey
ALTER TABLE "NhlTeam" DROP CONSTRAINT "NhlTeam_divisionId_fkey";

-- DropForeignKey
ALTER TABLE "NhlTeamInSeries" DROP CONSTRAINT "NhlTeamInSeries_round_season_seriesCode_fkey";

-- AddForeignKey
ALTER TABLE "NhlBracketPick" ADD CONSTRAINT "NhlBracketPick_teamId_round_season_seriesCode_fkey" FOREIGN KEY ("teamId", "round", "season", "seriesCode") REFERENCES "NhlTeamInSeries"("teamId", "round", "season", "seriesCode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhlTeam" ADD CONSTRAINT "NhlTeam_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "NhlConference"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhlTeam" ADD CONSTRAINT "NhlTeam_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "NhlDivision"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhlDivision" ADD CONSTRAINT "NhlDivision_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "NhlConference"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhlFranchise" ADD CONSTRAINT "NhlFranchise_mostRecentTeamId_fkey" FOREIGN KEY ("mostRecentTeamId") REFERENCES "NhlTeam"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhlTeamInSeries" ADD CONSTRAINT "NhlTeamInSeries_round_season_seriesCode_fkey" FOREIGN KEY ("round", "season", "seriesCode") REFERENCES "NhlSeries"("round", "season", "seriesCode") ON DELETE CASCADE ON UPDATE CASCADE;
