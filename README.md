# nfl-fantasy

This is a little library for querying information for your NFL Fantasy Football league.

## Usage

First, you **must** set your league to be public in your league settings page. This library does not work with private leagues.

Example Usage

``` typescript
import NFLFantasy from 'nfl-fantasy'

const LEAGUE_ID = 1234567;

const api = new NFLFantasy(LEAGUE_ID);

api.getMatchups()
    .then((result) => console.log(result));
```

## API

### `.getLeagueInfo()`

Use this function to obtain metadata information about a league.

Example response

``` javascript
    {
      commissioner: 'Ryan',
      leagueId: '1234567',
      draftType: 'Live Sunday, Aug 29, 2021 6:00pm EDT',
      draftFormat: 'Standard',
      timePerPick: '90 seconds',
      customUrl: 'http://fantasy.nfl.com/league/1234567',
      divisionsEnabled: false,
      weeksPerPlayoffMatchup: '1 Week',
      playoffSchedule: 'Weeks 15, 16 & 17 - 6 teams',
      teamCount: 12,
      isPublic: true,
      maxAddsPerSeason: 'No Maximum',
      maxAddsPerWeek: 'No Maximum',
      maxTradesPerSeason: 'No Maximum',
      tradeReviewType: 'Commissioner Veto',
      tradeRejectTime: '3 days',
      tradeDeadline: 2021-11-26T08:00:00.000Z,
      waiverPeriod: '1 day',
      seasonalBudget: 100,
      postDraftPlayers: 'Follow Waiver Rules',
      freeAgentLockType: 'Yes (player locks at game time)',
      rosterLockType: 'Game Time',
      startOfSeason: 'Week 1',
      winnersLeagueEnabled: false,
      keeperSettings: 'None',
      standingsTiebreaker: 'Points For',
      allowMatchupTies: true,
      undroppableList: 'NFL.com Fantasy',
      rosterCount: {
        quarterback: 1,
        runningBack: 2,
        wideReceiver: 2,
        tightEnd: 1,
        kicker: 1,
        defensiveTeam: 1,
        flex: 1,
        bench: 5,
        injuredReserve: 2
      },
      scoring: {
        passingYards: '1 point per 25 yards',
        passingTouchdowns: '4 points',
        interceptionsThrown: '-2 points',
        rushingYards: '1 point per 10 yards',
        rushingTouchdowns: '6 points',
        receptions: '0.5 points',
        receivingYards: '1 point per 10 yards',
        receivingTouchdowns: '6 points',
        kickoffAndPuntReturnTouchdowns: '6 points',
        fumbleRecoveredForTouchdown: '6 points',
        fumblesLost: '-2 points',
        twoPointConversions: '2 points',
        extraPointMade: '1 point',
        fieldGoalMade: {
          '0-19': '3 points',
          '20-29': '3 points',
          '30-39': '3 points',
          '40-49': '3 points',
          '50+': '5 points'
        },
        sacks: '1 point',
        interceptions: '2 points',
        fumblesRecovered: '2 points',
        safeties: '2 points',
        touchdowns: '6 points',
        pointsAllowed: {
          '0': '10 points',
          '1-6': '7 points',
          '7-13': '4 points',
          '14-20': '1 point',
          '21-27': '0 points',
          '28-34': '-1 point',
          '35+': '-4 points'
        },
        defTwoPointReturn: '2 points'
      },
      useFractionalPts: true,
      useNegativePts: true
    }
```

### `.getMatchups(week: number = 1)`

This function provides a summary of all matchups for a given week.

Example response

``` javascript
    [
      [
        { name: 'Daddy Staffy and The Upsiders', score: 120.84 },
        { name: 'Kyler Ren', score: 91.86 }
      ],
      [
        { name: 'The Last Dance', score: 94.22 },
        { name: 'Lambeaus Lapdance', score: 110.16 }
      ],
      [
        { name: 'Pointybahh', score: 123.26 },
        { name: 'Catalina Wine Mixon', score: 107.7 }
      ],
      [
        { name: "mom's spaghetti", score: 125.66 },
        { name: 'Shanizzle', score: 74.78 }
      ],
      [
        { name: 'cookiiieeesssss', score: 99.92 },
        { name: 'JuJu wanna build a snowman', score: 115.3 }
      ],
      [
        { name: 'Stars Take Selfies 2', score: 124.18 },
        { name: 'lambchop', score: 156.62 }
      ]
    ]
```

### `.getTeam(teamId: number)`

Get lineup and metadata information for a team.

Example Response (w/ truncated players list)

``` json
    {
        "name": "Kyler Ren",
        "owner": "Michael",
        "rank": 11,
        "record": "0-1-0",
        "streak": "L1",
        "waiver": 2,
        "players": [
            {
                "name": "Kyler Murray",
                "position": "QB",
                "team": "ARI",
                "score": {
                    "passing": {
                        "yards": 289,
                        "touchdowns": 4,
                        "interceptions": 1
                    },
                    "rushing": {
                        "yards": 20,
                        "touchdowns": 1
                    },
                    "receiving": {
                        "yards": 0,
                        "touchdowns": 0,
                        "receptions": 0
                    },
                    "return": {
                        "touchdowns": 0
                    },
                    "fumbleTouchdowns": 0,
                    "twoPointConversions": 0,
                    "fumblesLost": 0,
                    "total": 33.56
                }
            }
        ]
    }
```
