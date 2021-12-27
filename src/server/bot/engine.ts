import eventEmitter from "../events";
import {Message, Metadata, ChatId} from 'node-telegram-bot-api';
import { EventNames } from "../types";

export const replyTelegram = ({message, metadata}: {message: Message, metadata: Metadata}) => {
  const chatId: ChatId = message.chat.id;
  const text: string = `Message received: ${message.text}`;

  eventEmitter.emit(EventNames.TelegramMessageSendToUser, {chatId, text});
}

eventEmitter.on(EventNames.TelegramMessageReceived, replyTelegram);

export default {} as any;
