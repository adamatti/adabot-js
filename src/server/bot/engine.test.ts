import {replyTelegram} from "./engine"; 
import { EventNames } from "../types";
import eventEmitter from "../events";

describe ("Bot engine", () => {
  it("happy path", async () => {
    // given
    const replyPromise = new Promise((resolve, reject) => eventEmitter.on(EventNames.TelegramMessageSendToUser, resolve));

    const input = {
      message: {
        message_id: 1,
        date: 2,
        text: 'hello',
        chat: {
          id: 3,
          type: "group",
        }
      },
    };

    // when
    await replyTelegram(input);

    // then
    return expect(replyPromise).resolves.toEqual({chatId: 3, text: 'Message received: hello'});
  })
})