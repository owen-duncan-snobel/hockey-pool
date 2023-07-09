-- CreateTable
CREATE TABLE "BracketPick" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "round" INTEGER NOT NULL,
    "season" TEXT NOT NULL,
    "seriesCode" TEXT NOT NULL,

    CONSTRAINT "BracketPick_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BracketPick" ADD CONSTRAINT "BracketPick_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketPick" ADD CONSTRAINT "BracketPick_teamId_round_season_seriesCode_fkey" FOREIGN KEY ("teamId", "round", "season", "seriesCode") REFERENCES "TeamsInSeries"("teamId", "round", "season", "seriesCode") ON DELETE RESTRICT ON UPDATE CASCADE;
