/*
  Warnings:

  - Added the required column `updatedAt` to the `NhlBracketPick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `NhlSeries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `NhlTeamInSeries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NhlBracketPick" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "NhlSeries" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentGameId" INTEGER,
ADD COLUMN     "gameLabel" TEXT,
ADD COLUMN     "gameNumber" INTEGER,
ADD COLUMN     "gameTime" TIMESTAMP(3),
ADD COLUMN     "seriesStatus" TEXT,
ADD COLUMN     "seriesStatusShort" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "NhlTeamInSeries" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
