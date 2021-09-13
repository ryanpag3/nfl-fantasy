import NFLFantasy from '.'

const VALID_LEAGUE_ID = 9666258;

it('should get league info for a valid league', async () => {
    const api = new NFLFantasy(VALID_LEAGUE_ID);
    expect(api.getLeagueInfo()).resolves;
});

it('should throw an error with an invalid league id', async () => {
    const api = new NFLFantasy(90909090);
    expect(api.getLeagueInfo()).rejects;
});