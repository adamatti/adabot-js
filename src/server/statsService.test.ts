import {saveStats, getStats} from './statsService'

describe("statsService", () => {
  let telegramUpdate:any;

  beforeEach(() => {
    telegramUpdate = {
      message: {
        from: {
          id: 1
        }
      },
      update_id: 2
    }
  })

  it("test get stats", async () => {
    await saveStats(telegramUpdate);

    const response = await getStats();
    expect(response.last24hrsCalls).toBeGreaterThanOrEqual(1);
    expect(response.last30daysCalls).toBeGreaterThanOrEqual(1);
    expect(response.totalCalls).toBeGreaterThanOrEqual(1);
  })
})