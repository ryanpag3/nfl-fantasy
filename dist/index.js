"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var surgeon_1 = __importStar(require("surgeon"));
var x = surgeon_1.default({
    evaluator: surgeon_1.cheerioEvaluator(),
    subroutines: __assign({}, surgeon_1.subroutineAliasPreset)
});
var NFLFantasy = /** @class */ (function () {
    function NFLFantasy(leagueId) {
        this.leagueId = leagueId;
    }
    /**
     * Retrieve the metadata of a league.
     */
    NFLFantasy.prototype.getLeagueInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, scraped, mapped, _i, _a, elements, _b, keyElem, valElem, temporaryKey, value;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("https://fantasy.nfl.com/league/" + this.leagueId + "/settings")];
                    case 1:
                        data = (_c.sent()).data;
                        scraped = x({
                            primary: 'sm .nameValue'
                        }, data);
                        mapped = {};
                        for (_i = 0, _a = scraped.primary; _i < _a.length; _i++) {
                            elements = _a[_i];
                            _b = elements.children(), keyElem = _b[0], valElem = _b[1];
                            temporaryKey = keyElem.children[0].data;
                            value = valElem.children[0].data;
                            mapped[temporaryKey] = value;
                        }
                        return [2 /*return*/, {
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
                            }];
                }
            });
        });
    };
    NFLFantasy.prototype.getMappedValue = function (mapped, key) {
        var val = mapped[key];
        return val;
    };
    NFLFantasy.prototype.getMatchups = function (week) {
        if (week === void 0) { week = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var data, scraped, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("https://fantasy.nfl.com/league/" + this.leagueId + "/?scoreStripType=fantasy&week=" + week)];
                    case 1:
                        data = (_a.sent()).data;
                        scraped = x(['saf .ss-6 | sm li', {
                                firstTeamName: 'saf .first | select em {0,}[0] | read property textContent',
                                firstTeamScore: 'saf .first | select .teamTotal {0,}[0] | read property textContent',
                                secondTeamName: 'saf .last | select em {0,}[0] | read property textContent',
                                secondTeamScore: 'saf .last | select .teamTotal {0,}[0] | read property textContent',
                            }], data);
                        results = scraped.map(function (s) {
                            return [
                                {
                                    name: s.firstTeamName,
                                    score: Number.parseFloat(s.firstTeamScore)
                                },
                                {
                                    name: s.secondTeamName,
                                    score: Number.parseFloat(s.secondTeamScore)
                                }
                            ];
                        });
                        return [2 /*return*/, results];
                }
            });
        });
    };
    NFLFantasy.prototype.getTeam = function (teamId) {
        return __awaiter(this, void 0, void 0, function () {
            var data, teamInfoScraped, playersScraped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("https://fantasy.nfl.com/league/" + this.leagueId + "/team/" + teamId)];
                    case 1:
                        data = (_a.sent()).data;
                        teamInfoScraped = this.scrapeTeamInfo(data);
                        playersScraped = this.getScrapedPlayers(data);
                        return [2 /*return*/, __assign(__assign({}, teamInfoScraped), { players: playersScraped })];
                }
            });
        });
    };
    NFLFantasy.prototype.scrapeTeamInfo = function (data) {
        var teamInfo = x(['select .quickInfo', {
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
    };
    NFLFantasy.prototype.getScrapedPlayers = function (data) {
        var playersScraped = x(['saf tbody | remove .benchLabel | sm tr', {
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
        return playersScraped.map(function (p) {
            if (!p.name)
                return null;
            var mapped = {
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
            };
            return mapped;
        }).filter(function (r) { return r !== null; });
    };
    return NFLFantasy;
}());
exports.default = NFLFantasy;
