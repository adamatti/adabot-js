import {prisma} from './index'

describe("database", ()=> {
  it("add stat and fetch", async ()=> {
    const response = await prisma.messageStats.create({
      data: {
        userId: 123
      }
    })
    expect(response).toBeTruthy()

    const countResponse = await prisma.messageStats.count()
    expect(countResponse).toBeGreaterThanOrEqual(1)
  })
})