import axios from 'axios';
import { GetLeagueInfoResponse, GetMatchupsResponse } from 'nfl-fantasy';
import surgeon, { cheerioEvaluator, subroutineAliasPreset } from 'surgeon';

const x = surgeon({
    evaluator: cheerioEvaluator(),
    subroutines: {
        ...subroutineAliasPreset
    }
});

export default class NFLFantasy {
    private leagueId: number;

    constructor(leagueId: number) {
        this.leagueId = leagueId;
    }

    /**
     * Retrieve the metadata of a league.
     */
    async getLeagueInfo(): Promise<GetLeagueInfoResponse> {
        const { data } = await axios.get(`https://fantasy.nfl.com/league/${this.leagueId}/settings`);
        const scraped = x({
            primary: 'sm .nameValue'
        }, data);

        const mapped: any = {};
        for (const elements of scraped.primary) {
            const [keyElem, valElem] = elements.children();
            const temporaryKey = keyElem.children[0].data;
            const value = valElem.children[0].data;
            mapped[temporaryKey] = value;
        }

        return {
            commissioner: this.getMappedValue(mapped, 'Commissioner:'),
            leagueId: this.getMappedValue(mapped, 'League ID:'),
            draftType: this.getMappedValue(mapped, 'Draft Type:'),
            draftFormat: this.getMappedValue(mapped, 'Draft Format:'),
            timePerPick: this.getMappedValue(mapped, 'Time Per Pick:'),
            customUrl: this.getMappedValue(mapped, 'Custom Url:'),
            divisionsEnabled: this.getMappedValue(mapped, 'Divisions') === 'Yes',
            weeksPerPlayoffMatchup: this.getMappedValue(mapped, 'Weeks Per Playoff Matchup'),
            playoffSchedule: this.getMappedValue(mapped, 'Playoffs'),
            teamCount: Number.parseInt(this.getMappedValue(mapped, 'Teams')),
            isPublic: this.getMappedValue(mapped, 'Viewable to Public') === 'Yes',
            maxAddsPerSeason: this.getMappedValue(mapped, 'Max Adds per Season'),
            maxAddsPerWeek: this.getMappedValue(mapped, 'Max Adds per Week'),
            maxTradesPerSeason: this.getMappedValue(mapped, 'Max Trades per Season'),
            tradeReviewType: this.getMappedValue(mapped, 'Trade Review Type'),
            tradeRejectTime: this.getMappedValue(mapped, 'Trade Reject Time'),
            tradeDeadline: new Date(this.getMappedValue(mapped, 'Trade Deadline')),
            waiverPeriod: this.getMappedValue(mapped, 'Waiver Period'),
            seasonalBudget: Number.parseInt(this.getMappedValue(mapped, 'Seasonal Budget')),
            postDraftPlayers: this.getMappedValue(mapped, 'Post Draft Players'),
            freeAgentLockType: this.getMappedValue(mapped, 'Free Agent Lock Type'),
            rosterLockType: this.getMappedValue(mapped, 'Roster Lock Type'),
            startOfSeason: this.getMappedValue(mapped, 'Start of Season'),
            winnersLeagueEnabled: this.getMappedValue(mapped, 'Winners League') === 'Yes',
            keeperSettings: this.getMappedValue(mapped, 'Keeper Settings'),
            standingsTiebreaker: this.getMappedValue(mapped, 'Standings Tiebreaker'),
            allowMatchupTies: this.getMappedValue(mapped, 'Allow Matchup Ties') === 'Yes',
            undroppableList: this.getMappedValue(mapped, 'Undroppable List'),
            rosterCount: {
                quarterback: Number.parseInt(this.getMappedValue(mapped, 'Quarterback:')),
                runningBack: Number.parseInt(this.getMappedValue(mapped, 'Running Back:')),
                wideReceiver: Number.parseInt(this.getMappedValue(mapped, 'Wide Receiver:')),
                tightEnd: Number.parseInt(this.getMappedValue(mapped, 'Tight End:')),
                kicker: Number.parseInt(this.getMappedValue(mapped, 'Kicker:')),
                defensiveTeam: Number.parseInt(this.getMappedValue(mapped, 'Defensive Team:')),
                // TODO: this doesn't account for other FLEX types
                flex: Number.parseInt(this.getMappedValue(mapped, 'Running Back / Wide Receiver / Tight End:')),
                bench: Number.parseInt(this.getMappedValue(mapped, 'Bench:')),
                injuredReserve: Number.parseInt(this.getMappedValue(mapped, 'Reserve:')),
            },
            scoring: {
                passingYards: this.getMappedValue(mapped, 'Passing Yards:'),
                passingTouchdowns: this.getMappedValue(mapped, 'Passing Touchdowns:'),
                interceptionsThrown: this.getMappedValue(mapped, 'Interceptions Thrown:'),
                rushingYards: this.getMappedValue(mapped, 'Rushing Yards:'),
                rushingTouchdowns: this.getMappedValue(mapped, 'Rushing Touchdowns:'),
                receptions: this.getMappedValue(mapped, 'Receptions:'),
                receivingYards: this.getMappedValue(mapped, 'Receiving Yards:'),
                receivingTouchdowns: this.getMappedValue(mapped, 'Receiving Touchdowns:'),
                kickoffAndPuntReturnTouchdowns: this.getMappedValue(mapped, 'Kickoff and Punt Return Touchdowns:'),
                fumbleRecoveredForTouchdown: this.getMappedValue(mapped, 'Fumble Recovered for TD:'),
                fumblesLost: this.getMappedValue(mapped, 'Fumbles Lost:'),
                twoPointConversions: this.getMappedValue(mapped, '2-Point Conversions:'),
                extraPointMade: this.getMappedValue(mapped, 'PAT Made:'),
                fieldGoalMade: {
                    '0-19': this.getMappedValue(mapped, 'FG Made 0-19:'),
                    '20-29': this.getMappedValue(mapped, 'FG Made 20-29:'),
                    '30-39': this.getMappedValue(mapped, 'FG Made 30-39:'),
                    '40-49': this.getMappedValue(mapped, 'FG Made 40-49:'),
                    '50+': this.getMappedValue(mapped, 'FG Made 50+:'),
                },
                sacks: this.getMappedValue(mapped, 'Sacks:'),
                interceptions: this.getMappedValue(mapped, 'Interceptions:'),
                fumblesRecovered: this.getMappedValue(mapped, 'Fumbles Recovered:'),
                safeties: this.getMappedValue(mapped, 'Safeties:'),
                touchdowns: this.getMappedValue(mapped, 'Touchdowns:'),
                pointsAllowed: {
                    '0': this.getMappedValue(mapped, 'Points Allowed 0:'),
                    '1-6': this.getMappedValue(mapped, 'Points Allowed 1-6:'),
                    '7-13': this.getMappedValue(mapped, 'Points Allowed 7-13:'),
                    '14-20': this.getMappedValue(mapped, 'Points Allowed 14-20:'),
                    '21-27': this.getMappedValue(mapped, 'Points Allowed 21-27:'),
                    '28-34': this.getMappedValue(mapped, 'Points Allowed 28-34:'),
                    '35+': this.getMappedValue(mapped, 'Points Allowed 35+:'),
                },
                defTwoPointReturn: this.getMappedValue(mapped, 'Team Def 2-point Return:'),
            },
            useFractionalPts: this.getMappedValue(mapped, 'Use Fractional Pts') === 'Yes',
            useNegativePts: this.getMappedValue(mapped, 'Use Negative Pts') === 'Yes',
        }
    }

    getMappedValue(mapped: any, key: string) {
        const val = mapped[key];
        return val;
    }

    async getMatchups(week: number = 1): Promise<GetMatchupsResponse[][]> {
        const { data } = await axios.get(`https://fantasy.nfl.com/league/${this.leagueId}/?scoreStripType=fantasy&week=${week}`);
        
        const scraped = x(['saf .ss-6 | sm li', {
            firstTeamName: 'saf .first | select em {0,}[0] | read property textContent',
            firstTeamScore: 'saf .first | select .teamTotal {0,}[0] | read property textContent',
            secondTeamName: 'saf .last | select em {0,}[0] | read property textContent',
            secondTeamScore: 'saf .last | select .teamTotal {0,}[0] | read property textContent',
        }], data);

        const results: GetMatchupsResponse[][] = scraped.map((s: any) => {
            return [
                {
                    name: s.firstTeamName,
                    score: Number.parseFloat(s.firstTeamScore)
                },
                {
                    name: s.secondTeamName,
                    score: Number.parseFloat(s.secondTeamScore)
                }
            ]
        });

        return results;
    }

    async getTeam(teamId: number) {
        const { data } = await axios.get(`https://fantasy.nfl.com/league/${this.leagueId}/team/${teamId}`);

        const teamInfoScraped = this.scrapeTeamInfo(data);
        const playersScraped = this.getScrapedPlayers(data);

        return {
            ...teamInfoScraped,
            players: playersScraped
        };
    }

    private scrapeTeamInfo(data: string) {
        const teamInfo = x(['select .quickInfo',{
            name: 'saf .label | read property textContent',
            owner: 'saf .userName | read property textContent',
            rank: 'saf .teamStats | saf strong | read property textContent',
            record: 'saf .teamStats | saf .teamRecord | read property textContent',
            streak: 'saf .teamStats | saf .teamStreak | read property textContent',
            waiver: 'saf .teamStats | saf .last | saf strong | read property textContent'
        }], data);

        teamInfo.rank = Number.parseInt(teamInfo.rank);
        teamInfo.waiver = Number.parseInt(teamInfo.waiver);
        return teamInfo;
    }

    private getScrapedPlayers(data: string) {
        const playersScraped = x(['saf tbody | remove .benchLabel | sm tr', {
            name: 'saf .playerName | read property textContent',
            positionAndTeam: 'saf .c | saf em | read property textContent',
            score: {
                passing: {
                    yards: 'saf .stat_5 | saf span | read property textContent',
                    touchdowns: 'saf .stat_6 | saf span | read property textContent',
                    interceptions: 'saf .stat_7 | saf span | read property textContent'
                },
                rushing: {
                    yards: 'saf .stat_14 | saf span | read property textContent',
                    touchdowns: 'saf .stat_15 | saf span | read property textContent'
                },
                receiving: {
                    receptions: 'saf .stat_20 | saf span | read property textContent',
                    yards: 'saf .stat_21 | saf span | read property textContent',
                    touchdowns: 'saf .stat_22 | saf span | read property textContent',
                },
                return: {
                    touchdowns: 'saf .stat_28 | saf span | read property textContent'
                },
                fumbleTouchdowns: 'saf .stat_29 | saf span | read property textContent',
                twoPointConversions: 'saf .stat_32 | saf span | read property textContent',
                fumblesLost: 'saf .stat_30 | saf span | read property textContent',
                total: 'saf .statTotal | saf span | read property textContent'
            }
        }], data);

        return playersScraped.map((p: any) => {

            if (!p.name)
                return null;
            
            const mapped = {
                name: p.name,
                position: p.positionAndTeam.replaceAll(' ', '').split('-')[0],
                team: p.positionAndTeam.replaceAll(' ', '').split('-')[1],
                score: {
                    passing: {
                        yards: Number.parseFloat(p.score.passing.yards) || 0,
                        touchdowns: Number.parseInt(p.score.passing.touchdowns) || 0,
                        interceptions: Number.parseInt(p.score.passing.interceptions) || 0
                    },
                    rushing: {
                        yards: Number.parseFloat(p.score.rushing.yards) || 0,
                        touchdowns: Number.parseInt(p.score.rushing.touchdowns) || 0
                    },
                    receiving: {
                        yards: Number.parseFloat(p.score.receiving.yards) || 0,
                        touchdowns: Number.parseInt(p.score.receiving.touchdowns) || 0,
                        receptions: Number.parseInt(p.score.receiving.receptions) || 0
                    },
                    return: {
                        touchdowns: Number.parseInt(p.score.receiving.touchdowns) || 0
                    },
                    fumbleTouchdowns: Number.parseInt(p.score.fumbleTouchdowns) || 0,
                    twoPointConversions: Number.parseInt(p.score.twoPointConversions) || 0,
                    fumblesLost: Number.parseInt(p.score.fumblesLost) || 0,
                    total: Number.parseFloat(p.score.total) || 0
                }
            }

            return mapped;
        }).filter((r: any) => r !== null);
    }
}

