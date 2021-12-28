import eventEmitter from "../events";
import { EventNames } from "../types";

export const replyTelegram = (update: any) => {
  const chatId = update.message.chat.id;
  const text = `Message received: ${update.message.text}`;

  eventEmitter.emit(EventNames.TelegramMessageSendToUser, {chatId, text});
}

eventEmitter.on(EventNames.TelegramMessageReceived, replyTelegram);

export default {} as any;
