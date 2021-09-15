import NFLFantasy from '.'

const VALID_LEAGUE_ID = 9666258;

it('should get league info for a valid league', async () => {
    const api = new NFLFantasy(VALID_LEAGUE_ID);

    console.log(JSON.stringify(await api.getTeam(2), null, 4));

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

it('should get team information without error', async () => {
    const api = new NFLFantasy(VALID_LEAGUE_ID);
    await api.getTeam(1);
});

it('should throw an error if requesting team information with invalid league ID', async () => {
    const api = new NFLFantasy(90909090);
    let err;
    try {
        await api.getTeam(1);
    } catch (e) {
        err = e;
    }
    expect(err).not.toBeUndefined();
});

it('should throw an error if requesting team information with invalid team ID', async () => {
    const api = new NFLFantasy(VALID_LEAGUE_ID);
    let err;
    try {
        await api.getTeam(0);
    } catch (e) {
        err = e;
    }
    expect(err).not.toBeUndefined();
});