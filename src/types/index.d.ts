declare module "nfl-fantasy" {
    export interface GetLeagueInfoResponse {
        commissioner: string;
        leagueId: string;
        draftType: string;
        draftFormat: string;
        timePerPick: string;
        customUrl: string;
        divisionsEnabled: boolean;
        weeksPerPlayoffMatchup: string;
        playoffSchedule: string;
        teamCount: number;
        isPublic: boolean;
        maxAddsPerSeason: string;
        maxAddsPerWeek: string;
        maxTradesPerSeason: string;
        tradeReviewType: string;
        tradeRejectTime: string;
        tradeDeadline: Date;
        waiverPeriod: string;
        seasonalBudget: number;
        postDraftPlayers: string;
        freeAgentLockType: string;
        rosterLockType: string;
        startOfSeason: string;
        winnersLeagueEnabled: boolean;
        keeperSettings: string;
        standingsTiebreaker: string;
        allowMatchupTies: boolean;
        undroppableList: string;
        rosterCount: {
            quarterback: number;
            runningBack: number;
            wideReceiver: number;
            tightEnd: number;
            kicker: number;
            defensiveTeam: number;
            flex: number;
            bench: number;
            injuredReserve: number;
        },
        scoring: {
            passingYards: string;
            passingTouchdowns: string;
            interceptionsThrown: string;
            rushingYards: string;
            rushingTouchdowns: string;
            receptions: string;
            receivingYards: string;
            receivingTouchdowns: string;
            kickoffAndPuntReturnTouchdowns: string;
            fumbleRecoveredForTouchdown: string;
            fumblesLost: string;
            twoPointConversions: string;
            extraPointMade: string;
            fieldGoalMade: {
                '0-19': string;
                '20-29': string;
                '30-39': string;
                '40-49': string;
                '50+': string;
            },
            sacks: string;
            interceptions: string;
            fumblesRecovered: string;
            safeties: string;
            touchdowns: string;
            pointsAllowed: {
                '0': string;
                '1-6': string;
                '7-13': string;
                '14-20': string;
                '21-27': string;
                '28-34': string;
                '35+': string;
            };
            defTwoPointReturn: string;
        }
        useFractionalPts: boolean;
        useNegativePts: boolean;
    }
    
    export interface GetMatchupsResponse {
        name: string;
        score: number;
    };
    
    export interface GetTeamResponse {
        name: string;
        owner: string;
        rank: number;
        record: string;
        streak: string;
        waiver: number;
        players: {
            name: string;
            position: string;
            team: string;
            score: {
                passing: {
                    yards: number;
                    touchdowns: number;
                    interceptions: number;
                },
                rushing: {
                    yards: number;
                    touchdowns: number;
                },
                receiving: {
                    receptions: number;
                    yards: number;
                    touchdowns: number;
                },
                return: {
                    touchdowns: number;
                },
                fumbleTouchdowns: number;
                twoPointConversions: number;
                fumblesLost: number;
                total: number;
            }
        }[];
    }

    export class NFLFantasy {
        constructor(leagueId: number);

        getLeagueInfo(): Promise<GetLeagueInfoResponse>;
        
        getMatchups(week?: number): Promise<GetMatchupsResponse[][]>;
        
        getTeam(teamId: number): any;  
    }

    export default NFLFantasy;
}
