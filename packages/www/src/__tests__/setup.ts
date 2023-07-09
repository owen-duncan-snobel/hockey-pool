import axios from 'axios'
import { Prisma, PrismaClient } from '@prisma/client'
import {
  NHL_BRACKET_VALUES,
  NHL_CONFERENCES_URL, NHL_DIVISIONS_URL, NHL_FRANCHISES_URL, NHL_TEAMS_URL, NHL_TEAM_LOGOS_URL,
} from '../constants/playoffs'
import { NHLDivision } from '../types/playoffs'
import prisma from '../libs/prisma/prisma'
// import { createOrUpdateSeries, syncPlayoffSeriesWithTeams } from '../v1/services/nhlseries.service'

export const getData = async ({ url }: { url: string }) => {
  const response = await axios.get(url)
  const { data } = response
  return data
}

export const handleConferences = async (): Promise<Prisma.NhlConferenceCreateManyInput[]> => {
  const data = await getData({ url: NHL_CONFERENCES_URL })
  const { conferences } = data
  return conferences
}

export const handleDivisions = async (): Promise<Prisma.NhlDivisionCreateManyInput[]> => {
  const data = await getData({ url: NHL_DIVISIONS_URL })
  const divisons: NHLDivision[] = data.divisions
  const divisionsCreateManyInput: Prisma.NhlDivisionCreateManyInput[] = divisons.map((d: any) => ({
    abbreviation: d.abbreviation,
    conferenceId: d.conference.id,
    id: d.id,
    link: d.link,
    name: d.name,
    nameShort: d.nameShort,
  }))
  return divisionsCreateManyInput
}

export const handleFranchises = async (): Promise<Prisma.NhlFranchiseCreateManyInput[]> => {
  const data = await getData({ url: NHL_FRANCHISES_URL })
  const { franchises } = data
  const franchisesCreateManyInput: Prisma.NhlFranchiseCreateManyInput[] = franchises.map((f: any) => ({
    firstSeasonId: f.firstSeasonId,
    id: f.franchiseId,
    link: f.link,
    mostRecentTeamId: f.mostRecentTeamId,
  }))
  return franchisesCreateManyInput
}

export const handleTeams = async () => {
  const data = await getData({ url: NHL_TEAMS_URL })
  const { teams } = data
  const teamsCreateInput: Prisma.NhlTeamCreateInput[] = teams.map((t: any) => ({
    abbreviation: t.abbreviation,
    active: t.active,
    conference: {
      connect: {
        id: t.conference.id,
      },
    },
    division: {
      connect: {
        id: t.division.id,
      },
    },
    firstYearOfPlay: t.firstYearOfPlay,
    locationName: t.locationName,
    // franchise: {
    //   connect: {
    //     mostRecentTeamId: t.id
    //   }
    // },
    id: t.id,
    link: t.link,
    name: t.name,
    officialSiteUrl: t.officialSiteUrl,
    teamName: t.teamName,
    logo: t.name ? `${NHL_TEAM_LOGOS_URL}/${encodeURIComponent(t.name)}.png` : '',
  }))
  return teamsCreateInput
}

async function setup(prismaClient: PrismaClient) {
  const conferences = await handleConferences()
  const divisions = await handleDivisions()
  const franchises = await handleFranchises()
  const teams = await handleTeams()
  await prismaClient.nhlConference.createMany({
    data: conferences,
    skipDuplicates: true,
  })
  await prismaClient.nhlDivision.createMany({
    data: divisions,
    skipDuplicates: true,
  })
  await prismaClient.$transaction(
    teams.map((t) => prismaClient.nhlTeam.create({ data: t })),
  )
  await prismaClient.$transaction(
    franchises.map((f) => prismaClient.nhlFranchise.create({
      data: {
        firstSeasonId: f.firstSeasonId,
        id: f.id,
        link: f.link,
        team: {
          connectOrCreate: {
            create: {
              abbreviation: '',
              active: false,
              id: f.mostRecentTeamId,
              link: '',
              name: '',
              officialSiteUrl: '',
              teamName: '',
              firstYearOfPlay: '',
              locationName: '',
            },
            where: {
              id: f.mostRecentTeamId,
            },
          },
        },
      },
    })),
  )

  // populates the most current year's playoff series
  // await createOrUpdateSeries()
  // // populates the playoff series with teams
  // await syncPlayoffSeriesWithTeams()
}

export default setup
