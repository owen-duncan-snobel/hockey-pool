"use client"
import { NHLSeriesNodes } from '@/utils/playoffs'
import { IPlayoff, IPlayoffMatchupTeam, IPlayoffSeries } from '@backend/types/playoffs'
import Image from 'next/image'
import ReactFlow, { Background, Controls, addEdge, useEdgesState, useNodesState, Node, Edge, Handle, Position } from 'reactflow'
//import 'reactflow/dist/style.css'
import 'reactflow/dist/base.css'

const playoffData = {
  "copyright" : "NHL and the NHL Shield are registered trademarks of the National Hockey League. NHL and NHL team marks are the property of the NHL and its teams. © NHL 2023. All Rights Reserved.",
  "id" : 1,
  "name" : "Playoffs",
  "season" : "20222023",
  "defaultRound" : 2,
  "rounds" : [ {
    "number" : 1,
    "code" : 1,
    "names" : {
      "name" : "First Round",
      "shortName" : "R1"
    },
    "format" : {
      "name" : "BO7",
      "description" : "Best of 7",
      "numberOfGames" : 7,
      "numberOfWins" : 4
    },
    "series" : [ {
      "seriesNumber" : 1,
      "seriesCode" : "A",
      "names" : {
        "matchupName" : "Bruins (1) vs. Panthers (WC2)",
        "matchupShortName" : "BOS v FLA",
        "teamAbbreviationA" : "BOS",
        "teamAbbreviationB" : "FLA",
        "seriesSlug" : "bruins-vs-panthers-series-a"
      },
      "currentGame" : {
        "seriesSummary" : {
          "gamePk" : 2022030117,
          "gameNumber" : 7,
          "gameLabel" : "Game 7",
          "necessary" : true,
          "gameCode" : 117,
          "gameTime" : "2023-04-30T22:30:00Z",
          "seriesStatus" : "Panthers win 4-3",
          "seriesStatusShort" : "FLA wins 4-3"
        }
      },
      "conference" : {
        "id" : 6,
        "name" : "Eastern",
        "link" : "/api/v1/conferences/6"
      },
      "round" : {
        "number" : 1
      },
      "matchupTeams" : [ {
        "team" : {
          "id" : 6,
          "name" : "Boston Bruins",
          "link" : "/api/v1/teams/6"
        },
        "seed" : {
          "type" : "1",
          "rank" : 1,
          "isTop" : true
        },
        "seriesRecord" : {
          "wins" : 3,
          "losses" : 4
        }
      }, {
        "team" : {
          "id" : 13,
          "name" : "Florida Panthers",
          "link" : "/api/v1/teams/13"
        },
        "seed" : {
          "type" : "WC2",
          "rank" : 4,
          "isTop" : false
        },
        "seriesRecord" : {
          "wins" : 4,
          "losses" : 3
        }
      } ]
    }, {
      "seriesNumber" : 2,
      "seriesCode" : "B",
      "names" : {
        "matchupName" : "Maple Leafs (2) vs. Lightning (3)",
        "matchupShortName" : "TOR v TBL",
        "teamAbbreviationA" : "TOR",
        "teamAbbreviationB" : "TBL",
        "seriesSlug" : "maple-leafs-vs-lightning-series-b"
      },
      "currentGame" : {
        "seriesSummary" : {
          "gamePk" : 2022030126,
          "gameNumber" : 6,
          "gameLabel" : "Game 6",
          "necessary" : true,
          "gameCode" : 126,
          "gameTime" : "2023-04-29T23:00:00Z",
          "seriesStatus" : "Maple Leafs win 4-2",
          "seriesStatusShort" : "TOR wins 4-2"
        }
      },
      "conference" : {
        "id" : 6,
        "name" : "Eastern",
        "link" : "/api/v1/conferences/6"
      },
      "round" : {
        "number" : 1
      },
      "matchupTeams" : [ {
        "team" : {
          "id" : 10,
          "name" : "Toronto Maple Leafs",
          "link" : "/api/v1/teams/10"
        },
        "seed" : {
          "type" : "2",
          "rank" : 2,
          "isTop" : true
        },
        "seriesRecord" : {
          "wins" : 4,
          "losses" : 2
        }
      }, {
        "team" : {
          "id" : 14,
          "name" : "Tampa Bay Lightning",
          "link" : "/api/v1/teams/14"
        },
        "seed" : {
          "type" : "3",
          "rank" : 3,
          "isTop" : false
        },
        "seriesRecord" : {
          "wins" : 2,
          "losses" : 4
        }
      } ]
    }, {
      "seriesNumber" : 3,
      "seriesCode" : "C",
      "names" : {
        "matchupName" : "Hurricanes (1) vs. Islanders (WC1)",
        "matchupShortName" : "CAR v NYI",
        "teamAbbreviationA" : "CAR",
        "teamAbbreviationB" : "NYI",
        "seriesSlug" : "hurricanes-vs-islanders-series-c"
      },
      "currentGame" : {
        "seriesSummary" : {
          "gamePk" : 2022030136,
          "gameNumber" : 6,
          "gameLabel" : "Game 6",
          "necessary" : true,
          "gameCode" : 136,
          "gameTime" : "2023-04-28T23:00:00Z",
          "seriesStatus" : "Hurricanes win 4-2",
          "seriesStatusShort" : "CAR wins 4-2"
        }
      },
      "conference" : {
        "id" : 6,
        "name" : "Eastern",
        "link" : "/api/v1/conferences/6"
      },
      "round" : {
        "number" : 1
      },
      "matchupTeams" : [ {
        "team" : {
          "id" : 12,
          "name" : "Carolina Hurricanes",
          "link" : "/api/v1/teams/12"
        },
        "seed" : {
          "type" : "1",
          "rank" : 1,
          "isTop" : true
        },
        "seriesRecord" : {
          "wins" : 4,
          "losses" : 2
        }
      }, {
        "team" : {
          "id" : 2,
          "name" : "New York Islanders",
          "link" : "/api/v1/teams/2"
        },
        "seed" : {
          "type" : "WC1",
          "rank" : 4,
          "isTop" : false
        },
        "seriesRecord" : {
          "wins" : 2,
          "losses" : 4
        }
      } ]
    }, {
      "seriesNumber" : 4,
      "seriesCode" : "D",
      "names" : {
        "matchupName" : "Devils (2) vs. Rangers (3)",
        "matchupShortName" : "NJD v NYR",
        "teamAbbreviationA" : "NJD",
        "teamAbbreviationB" : "NYR",
        "seriesSlug" : "devils-vs-rangers-series-d"
      },
      "currentGame" : {
        "seriesSummary" : {
          "gamePk" : 2022030147,
          "gameNumber" : 7,
          "gameLabel" : "Game 7",
          "necessary" : true,
          "gameCode" : 147,
          "gameTime" : "2023-05-02T00:00:00Z",
          "seriesStatus" : "Devils win 4-3",
          "seriesStatusShort" : "NJD wins 4-3"
        }
      },
      "conference" : {
        "id" : 6,
        "name" : "Eastern",
        "link" : "/api/v1/conferences/6"
      },
      "round" : {
        "number" : 1
      },
      "matchupTeams" : [ {
        "team" : {
          "id" : 1,
          "name" : "New Jersey Devils",
          "link" : "/api/v1/teams/1"
        },
        "seed" : {
          "type" : "2",
          "rank" : 2,
          "isTop" : true
        },
        "seriesRecord" : {
          "wins" : 4,
          "losses" : 3
        }
      }, {
        "team" : {
          "id" : 3,
          "name" : "New York Rangers",
          "link" : "/api/v1/teams/3"
        },
        "seed" : {
          "type" : "3",
          "rank" : 3,
          "isTop" : false
        },
        "seriesRecord" : {
          "wins" : 3,
          "losses" : 4
        }
      } ]
    }, {
      "seriesNumber" : 5,
      "seriesCode" : "E",
      "names" : {
        "matchupName" : "Avalanche (1) vs. Kraken (WC1)",
        "matchupShortName" : "COL v SEA",
        "teamAbbreviationA" : "COL",
        "teamAbbreviationB" : "SEA",
        "seriesSlug" : "avalanche-vs-kraken-series-e"
      },
      "currentGame" : {
        "seriesSummary" : {
          "gamePk" : 2022030157,
          "gameNumber" : 7,
          "gameLabel" : "Game 7",
          "necessary" : true,
          "gameCode" : 157,
          "gameTime" : "2023-05-01T01:30:00Z",
          "seriesStatus" : "Kraken win 4-3",
          "seriesStatusShort" : "SEA wins 4-3"
        }
      },
      "conference" : {
        "id" : 5,
        "name" : "Western",
        "link" : "/api/v1/conferences/5"
      },
      "round" : {
        "number" : 1
      },
      "matchupTeams" : [ {
        "team" : {
          "id" : 21,
          "name" : "Colorado Avalanche",
          "link" : "/api/v1/teams/21"
        },
        "seed" : {
          "type" : "1",
          "rank" : 1,
          "isTop" : true
        },
        "seriesRecord" : {
          "wins" : 3,
          "losses" : 4
        }
      }, {
        "team" : {
          "id" : 55,
          "name" : "Seattle Kraken",
          "link" : "/api/v1/teams/55"
        },
        "seed" : {
          "type" : "WC1",
          "rank" : 4,
          "isTop" : false
        },
        "seriesRecord" : {
          "wins" : 4,
          "losses" : 3
        }
      } ]
    }, {
      "seriesNumber" : 6,
      "seriesCode" : "F",
      "names" : {
        "matchupName" : "Stars (2) vs. Wild (3)",
        "matchupShortName" : "DAL v MIN",
        "teamAbbreviationA" : "DAL",
        "teamAbbreviationB" : "MIN",
        "seriesSlug" : "stars-vs-wild-series-f"
      },
      "currentGame" : {
        "seriesSummary" : {
          "gamePk" : 2022030166,
          "gameNumber" : 6,
          "gameLabel" : "Game 6",
          "necessary" : true,
          "gameCode" : 166,
          "gameTime" : "2023-04-29T01:30:00Z",
          "seriesStatus" : "Stars win 4-2",
          "seriesStatusShort" : "DAL wins 4-2"
        }
      },
      "conference" : {
        "id" : 5,
        "name" : "Western",
        "link" : "/api/v1/conferences/5"
      },
      "round" : {
        "number" : 1
      },
      "matchupTeams" : [ {
        "team" : {
          "id" : 25,
          "name" : "Dallas Stars",
          "link" : "/api/v1/teams/25"
        },
        "seed" : {
          "type" : "2",
          "rank" : 2,
          "isTop" : true
        },
        "seriesRecord" : {
          "wins" : 4,
          "losses" : 2
        }
      }, {
        "team" : {
          "id" : 30,
          "name" : "Minnesota Wild",
          "link" : "/api/v1/teams/30"
        },
        "seed" : {
          "type" : "3",
          "rank" : 3,
          "isTop" : false
        },
        "seriesRecord" : {
          "wins" : 2,
          "losses" : 4
        }
      } ]
    }, {
      "seriesNumber" : 7,
      "seriesCode" : "G",
      "names" : {
        "matchupName" : "Golden Knights (1) vs. Jets (WC2)",
        "matchupShortName" : "VGK v WPG",
        "teamAbbreviationA" : "VGK",
        "teamAbbreviationB" : "WPG",
        "seriesSlug" : "golden-knights-vs-jets-series-g"
      },
      "currentGame" : {
        "seriesSummary" : {
          "gamePk" : 2022030175,
          "gameNumber" : 5,
          "gameLabel" : "Game 5",
          "necessary" : true,
          "gameCode" : 175,
          "gameTime" : "2023-04-28T02:00:00Z",
          "seriesStatus" : "Golden Knights win 4-1",
          "seriesStatusShort" : "VGK wins 4-1"
        }
      },
      "conference" : {
        "id" : 5,
        "name" : "Western",
        "link" : "/api/v1/conferences/5"
      },
      "round" : {
        "number" : 1
      },
      "matchupTeams" : [ {
        "team" : {
          "id" : 54,
          "name" : "Vegas Golden Knights",
          "link" : "/api/v1/teams/54"
        },
        "seed" : {
          "type" : "1",
          "rank" : 1,
          "isTop" : true
        },
        "seriesRecord" : {
          "wins" : 4,
          "losses" : 1
        }
      }, {
        "team" : {
          "id" : 52,
          "name" : "Winnipeg Jets",
          "link" : "/api/v1/teams/52"
        },
        "seed" : {
          "type" : "WC2",
          "rank" : 4,
          "isTop" : false
        },
        "seriesRecord" : {
          "wins" : 1,
          "losses" : 4
        }
      } ]
    }, {
      "seriesNumber" : 8,
      "seriesCode" : "H",
      "names" : {
        "matchupName" : "Oilers (2) vs. Kings (3)",
        "matchupShortName" : "EDM v LAK",
        "teamAbbreviationA" : "EDM",
        "teamAbbreviationB" : "LAK",
        "seriesSlug" : "oilers-vs-kings-series-h"
      },
      "currentGame" : {
        "seriesSummary" : {
          "gamePk" : 2022030186,
          "gameNumber" : 6,
          "gameLabel" : "Game 6",
          "necessary" : true,
          "gameCode" : 186,
          "gameTime" : "2023-04-30T02:00:00Z",
          "seriesStatus" : "Oilers win 4-2",
          "seriesStatusShort" : "EDM wins 4-2"
        }
      },
      "conference" : {
        "id" : 5,
        "name" : "Western",
        "link" : "/api/v1/conferences/5"
      },
      "round" : {
        "number" : 1
      },
      "matchupTeams" : [ {
        "team" : {
          "id" : 22,
          "name" : "Edmonton Oilers",
          "link" : "/api/v1/teams/22"
        },
        "seed" : {
          "type" : "2",
          "rank" : 2,
          "isTop" : true
        },
        "seriesRecord" : {
          "wins" : 4,
          "losses" : 2
        }
      }, {
        "team" : {
          "id" : 26,
          "name" : "Los Angeles Kings",
          "link" : "/api/v1/teams/26"
        },
        "seed" : {
          "type" : "3",
          "rank" : 3,
          "isTop" : false
        },
        "seriesRecord" : {
          "wins" : 2,
          "losses" : 4
        }
      } ]
    } ]
  }, {
    "number" : 2,
    "code" : 2,
    "names" : {
      "name" : "Second Round",
      "shortName" : "R2"
    },
    "format" : {
      "name" : "BO7",
      "description" : "Best of 7",
      "numberOfGames" : 7,
      "numberOfWins" : 4
    },
    "series" : [ {
      "seriesNumber" : 1,
      "seriesCode" : "I",
      "names" : {
        "matchupName" : "Maple Leafs (2) vs. Panthers (WC2)",
        "matchupShortName" : "TOR v FLA",
        "teamAbbreviationA" : "TOR",
        "teamAbbreviationB" : "FLA",
        "seriesSlug" : "maple-leafs-vs-panthers-series-i"
      },
      "currentGame" : {
        "seriesSummary" : {
          "gamePk" : 2022030215,
          "gameNumber" : 5,
          "gameLabel" : "Game 5",
          "necessary" : true,
          "gameCode" : 215,
          "gameTime" : "2023-05-12T23:00:00Z",
          "seriesStatus" : "Panthers lead 3-1",
          "seriesStatusShort" : "FLA leads 3-1"
        }
      },
      "conference" : {
        "id" : 6,
        "name" : "Eastern",
        "link" : "/api/v1/conferences/6"
      },
      "round" : {
        "number" : 2
      },
      "matchupTeams" : [ {
        "team" : {
          "id" : 10,
          "name" : "Toronto Maple Leafs",
          "link" : "/api/v1/teams/10"
        },
        "seed" : {
          "type" : "2",
          "rank" : 2,
          "isTop" : true
        },
        "seriesRecord" : {
          "wins" : 1,
          "losses" : 3
        }
      }, {
        "team" : {
          "id" : 13,
          "name" : "Florida Panthers",
          "link" : "/api/v1/teams/13"
        },
        "seed" : {
          "type" : "WC2",
          "rank" : 4,
          "isTop" : false
        },
        "seriesRecord" : {
          "wins" : 3,
          "losses" : 1
        }
      } ]
    }, {
      "seriesNumber" : 2,
      "seriesCode" : "J",
      "names" : {
        "matchupName" : "Hurricanes (1) vs. Devils (2)",
        "matchupShortName" : "CAR v NJD",
        "teamAbbreviationA" : "CAR",
        "teamAbbreviationB" : "NJD",
        "seriesSlug" : "hurricanes-vs-devils-series-j"
      },
      "currentGame" : {
        "seriesSummary" : {
          "gamePk" : 2022030225,
          "gameNumber" : 5,
          "gameLabel" : "Game 5",
          "necessary" : true,
          "gameCode" : 225,
          "gameTime" : "2023-05-11T23:00:00Z",
          "seriesStatus" : "Hurricanes lead 3-1",
          "seriesStatusShort" : "CAR leads 3-1"
        }
      },
      "conference" : {
        "id" : 6,
        "name" : "Eastern",
        "link" : "/api/v1/conferences/6"
      },
      "round" : {
        "number" : 2
      },
      "matchupTeams" : [ {
        "team" : {
          "id" : 12,
          "name" : "Carolina Hurricanes",
          "link" : "/api/v1/teams/12"
        },
        "seed" : {
          "type" : "1",
          "rank" : 1,
          "isTop" : true
        },
        "seriesRecord" : {
          "wins" : 3,
          "losses" : 1
        }
      }, {
        "team" : {
          "id" : 1,
          "name" : "New Jersey Devils",
          "link" : "/api/v1/teams/1"
        },
        "seed" : {
          "type" : "2",
          "rank" : 2,
          "isTop" : false
        },
        "seriesRecord" : {
          "wins" : 1,
          "losses" : 3
        }
      } ]
    }, {
      "seriesNumber" : 3,
      "seriesCode" : "K",
      "names" : {
        "matchupName" : "Stars (2) vs. Kraken (WC1)",
        "matchupShortName" : "DAL v SEA",
        "teamAbbreviationA" : "DAL",
        "teamAbbreviationB" : "SEA",
        "seriesSlug" : "stars-vs-kraken-series-k"
      },
      "currentGame" : {
        "seriesSummary" : {
          "gamePk" : 2022030235,
          "gameNumber" : 5,
          "gameLabel" : "Game 5",
          "necessary" : true,
          "gameCode" : 235,
          "gameTime" : "2023-05-12T01:30:00Z",
          "seriesStatus" : "Series tied 2-2",
          "seriesStatusShort" : "Tied 2-2"
        }
      },
      "conference" : {
        "id" : 5,
        "name" : "Western",
        "link" : "/api/v1/conferences/5"
      },
      "round" : {
        "number" : 2
      },
      "matchupTeams" : [ {
        "team" : {
          "id" : 25,
          "name" : "Dallas Stars",
          "link" : "/api/v1/teams/25"
        },
        "seed" : {
          "type" : "2",
          "rank" : 2,
          "isTop" : true
        },
        "seriesRecord" : {
          "wins" : 2,
          "losses" : 2
        }
      }, {
        "team" : {
          "id" : 55,
          "name" : "Seattle Kraken",
          "link" : "/api/v1/teams/55"
        },
        "seed" : {
          "type" : "WC1",
          "rank" : 4,
          "isTop" : false
        },
        "seriesRecord" : {
          "wins" : 2,
          "losses" : 2
        }
      } ]
    }, {
      "seriesNumber" : 4,
      "seriesCode" : "L",
      "names" : {
        "matchupName" : "Golden Knights (1) vs. Oilers (2)",
        "matchupShortName" : "VGK v EDM",
        "teamAbbreviationA" : "VGK",
        "teamAbbreviationB" : "EDM",
        "seriesSlug" : "golden-knights-vs-oilers-series-l"
      },
      "currentGame" : {
        "seriesSummary" : {
          "gamePk" : 2022030245,
          "gameNumber" : 5,
          "gameLabel" : "Game 5",
          "necessary" : true,
          "gameCode" : 245,
          "gameTime" : "2023-05-13T02:00:00Z",
          "seriesStatus" : "Series tied 2-2",
          "seriesStatusShort" : "Tied 2-2"
        }
      },
      "conference" : {
        "id" : 5,
        "name" : "Western",
        "link" : "/api/v1/conferences/5"
      },
      "round" : {
        "number" : 2
      },
      "matchupTeams" : [ {
        "team" : {
          "id" : 54,
          "name" : "Vegas Golden Knights",
          "link" : "/api/v1/teams/54"
        },
        "seed" : {
          "type" : "1",
          "rank" : 1,
          "isTop" : true
        },
        "seriesRecord" : {
          "wins" : 2,
          "losses" : 2
        }
      }, {
        "team" : {
          "id" : 22,
          "name" : "Edmonton Oilers",
          "link" : "/api/v1/teams/22"
        },
        "seed" : {
          "type" : "2",
          "rank" : 2,
          "isTop" : false
        },
        "seriesRecord" : {
          "wins" : 2,
          "losses" : 2
        }
      } ]
    } ]
  }, {
    "number" : 3,
    "code" : 3,
    "names" : {
      "name" : "Conference Finals",
      "shortName" : "CF"
    },
    "format" : {
      "name" : "BO7",
      "description" : "Best of 7",
      "numberOfGames" : 7,
      "numberOfWins" : 4
    },
    "series" : [ {
      "seriesCode" : "M",
      "names" : {
        "matchupName" : "",
        "matchupShortName" : "",
        "teamAbbreviationA" : "",
        "teamAbbreviationB" : ""
      },
      "currentGame" : {
        "seriesSummary" : {
          "gameLabel" : ""
        }
      },
      "conference" : {
        "id" : 6,
        "name" : "Eastern",
        "link" : "/api/v1/conferences/6"
      },
      "round" : {
        "number" : 3
      }
    }, {
      "seriesCode" : "N",
      "names" : {
        "matchupName" : "",
        "matchupShortName" : "",
        "teamAbbreviationA" : "",
        "teamAbbreviationB" : ""
      },
      "currentGame" : {
        "seriesSummary" : {
          "gameLabel" : ""
        }
      },
      "conference" : {
        "id" : 5,
        "name" : "Western",
        "link" : "/api/v1/conferences/5"
      },
      "round" : {
        "number" : 3
      }
    } ]
  }, {
    "number" : 4,
    "code" : 4,
    "names" : {
      "name" : "Stanley Cup Final",
      "shortName" : "SCF"
    },
    "format" : {
      "name" : "BO7",
      "description" : "Best of 7",
      "numberOfGames" : 7,
      "numberOfWins" : 4
    },
    "series" : [ {
      "seriesCode" : "O",
      "names" : {
        "matchupName" : "",
        "matchupShortName" : "",
        "teamAbbreviationA" : "",
        "teamAbbreviationB" : ""
      },
      "currentGame" : {
        "seriesSummary" : {
          "gameLabel" : ""
        }
      },
      "conference" : {
        "link" : "/api/v1/conferences/null"
      },
      "round" : {
        "number" : 4
      }
    } ]
  } ]
}

interface IPlayoffNode {
  data: {
    teamName?: string
    logo: string
  }
}

interface ISeriesNode {
  data: IPlayoffSeries
}

function SeriesNode({ data }: ISeriesNode){
  const teams = data.matchupTeams

  if (!teams) return (
    <div>
      <div className="flex justify-center items-center">
        <div>
          <PlayoffNode data={{
            teamName: 'TBA',
            logo: '',
          }} />
          <PlayoffNode data={{
            teamName: 'TBA',
            logo: '',
          }} />
        </div>
      </div>
    </div>
  )
  return (
    <div>
      <div className="flex justify-center items-center">
        <div>
          {teams.map((team, i) => <PlayoffNode key={i} data={{
            teamName: team.team.name,
            logo: '',
          }} />)}
        </div>
      </div>
    </div>
  )
}

function FinalsNode({ data }: ISeriesNode){
  const teams = data.matchupTeams
  if (!teams) return (
    <div>
      <div className="flex justify-center items-center gap-x-2">
          <PlayoffNode data={{
            teamName: 'TBA',
            logo: '',
          }} />
          <PlayoffNode data={{
            teamName: 'TBA',
            logo: '',
          }} />
      </div>
    </div>
  )
  return (
    <div>
      <div className="flex justify-center items-center gap-x-2">
        {teams.map((team, i) => <PlayoffNode key={i} data={{
          teamName: team.team.name,
          logo: '',
        }} />
      )}
      </div>
    </div>
  )
}

function PlayoffNode({data}: IPlayoffNode){
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 w-[200px] my-2">
      <div className="flex">
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
          <Image src={''} alt="" width={50} height={50} />
        </div>
        <div className="ml-2">
          <div className="text-sm font-bold">{data.teamName}</div>
        </div>
      </div>
    </div>
  )
}

const nodeTypes = {
  seriesNode: SeriesNode,
  finalsNode: FinalsNode,
};

const initialNodes: Node[] = NHLSeriesNodes({
  data: playoffData as unknown as IPlayoff
})


export default function Home() {
  const [nodes] = useNodesState(initialNodes);

  return (
    <main className="flex justify-center h-screen">
      <div className='w-5/6 h-full'>
        <ReactFlow 
          nodes={nodes} 
          nodeTypes={nodeTypes}
          minZoom={0.1}
          zoomOnPinch={true}
          fitView
          fitViewOptions={{
            padding: 0.1
          }}
        >
          <Background />
        </ReactFlow>
      </div>
    </main>
  )
}
