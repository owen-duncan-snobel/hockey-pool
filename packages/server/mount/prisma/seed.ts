import { PrismaClient, Prisma } from '@prisma/client'
import axios from 'axios'
import {
  NHL_CONFERENCES_URL, NHL_DIVISIONS_URL, NHL_FRANCHISES_URL, NHL_TEAMS_URL,
} from '../src/constants/playoffs'

const prisma = new PrismaClient()

type NHLConference = Prisma.NhlConferenceCreateManyInput & {
  id: number
  name: string
  link: string
  abbreviation: string
  shortName: string
  active: boolean
}

type NHLDivision = {
  id: number
  name: string
  nameShort: string
  link: string
  abbreviation: string
  conference: {
    id: number
    name: string
    link: string
  }
  active: boolean
}

type NHLFranchise = {
  franchiseId: number
  firstSeasonId: number
  lastSeasonId?: number
  mostRecentTeamId: number
  teamName: string
  locationName: string
  link: string
}

type NHLTeam = {
  id: number
  name: string
  link: string
  venue: {
    name: string
    link: string
    city: string
    timeZone: {
      id: string
      offset: number
      tz: string
    }
  },
  abbreviation: string
  teamName: string
  locationName: string
  firstYearOfPlay: string
  division: {
    id: number
    name: string
    nameShort: string
    link: string
    abbreviation: string
  }
  conference: {
    id: number
    name: string
    link: string
  }
  franchise: {
    franchiseId: string
    teamName: string
    link: string
  }
  shortName: string
  officialSiteUrl: string
  franchiseId: number
  active: boolean
}

export const getData = async ({ url }: { url: string }) => {
  const response = await axios.get(url)
  const { data } = response
  return data
}

const handleConferences = async (): Promise<Prisma.NhlConferenceCreateManyInput[]> => {
  const data = await getData({ url: NHL_CONFERENCES_URL })
  const { conferences } = data
  return conferences
}

const handleDivisions = async (): Promise<Prisma.NhlDivisionCreateManyInput[]> => {
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

const handleFranchises = async (): Promise<Prisma.NhlFranchiseCreateManyInput[]> => {
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

const handleTeams = async () => {
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
  }))
  return teamsCreateInput
}

async function main() {
  const conferences = await handleConferences()
  const divisions = await handleDivisions()
  const franchises = await handleFranchises()
  const teams = await handleTeams()

  await prisma.nhlConference.createMany({
    data: conferences,
  })
  await prisma.nhlDivision.createMany({
    data: divisions,
  })
  await prisma.$transaction(
    teams.map((t) => prisma.nhlTeam.create({ data: t })),
  )
  await prisma.$transaction(
    franchises.map((f) => prisma.nhlFranchise.create({
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
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })

  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
