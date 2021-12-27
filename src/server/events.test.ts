import eventEmitter from "./events";

describe("Events", () => {
  it("happy path", async ()=> {
    const promise = new Promise((resolve, reject) => {
      eventEmitter.on("fakeEvent", resolve);
    })

    const fakeEvent = {name: "fake"};
    eventEmitter.emit("fakeEvent", fakeEvent);

    return expect(promise).resolves.toBe(fakeEvent);
  })
})