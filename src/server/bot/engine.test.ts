import {botReply} from "./engine"; 
import { EventNames, UserMessage, BotMessage } from "../types";
import eventEmitter from "../events";

describe ("Bot engine", () => {
  let replyPromise: Promise<BotMessage>;
  let userMessage: UserMessage;

  beforeEach(() => {
    replyPromise = new Promise((resolve, reject) => eventEmitter.on(EventNames.MessageSendToUser, resolve));

    userMessage = {
      text: "hi",
      channel: "test",
    }
  })

  it("happy path", async () => {
    // when
    await botReply(userMessage);

    // then
    return expect(replyPromise).resolves.toHaveProperty("text");
  })

  it("happy path - rule", async () => {
    // given
    userMessage.text = "date";

    // when
    await botReply(userMessage);

    // then
    return expect(replyPromise).resolves.toHaveProperty("text");
  })

})