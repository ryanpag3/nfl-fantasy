import NFLFantasy from '.'

const VALID_LEAGUE_ID = 9666258;

it('should get league info for a valid league', async () => {
    const api = new NFLFantasy(VALID_LEAGUE_ID);
    expect(api.getLeagueInfo()).resolves;
});

it('should throw an error with an invalid league id', async () => {
    const api = new NFLFantasy(90909090);
    let err;
    try {
        await api.getLeagueInfo();
    } catch (e) {
        err = e;
    }
    expect(err).not.toBeUndefined();
});

it('should get matchups for week 1', async () => {
    const api = new NFLFantasy(VALID_LEAGUE_ID);
    const res = await api.getMatchups(1);
    expect(res.length).toBeGreaterThan(0);
});

it('should throw an error if requesting matchups with invalid id', async () => {
    const api = new NFLFantasy(90909090);
    let err;
    try {
        await api.getMatchups();
    } catch (e) {
        err = e;
    }
    expect(err).not.toBeUndefined();
});